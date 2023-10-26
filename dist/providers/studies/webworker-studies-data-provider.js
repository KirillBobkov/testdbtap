import { firstOf, lastOf } from '@devexperts/dxcharts-lite/dist/chart/utils/array.utils';
import { deepEqual } from '@devexperts/dxcharts-lite/dist/chart/utils/object.utils';
import { generateSessionsStrict } from '../../utils/session.utils';
import { createStudiesCalculator, dxStudiesMock, toStudiesCandle, toStudiesSession, } from './dx-studies-studies-data-provider';
export class DxStudiesDataProvider {
    constructor(chartModel, tradingSessionsProvider, tradingHoursProvider) {
        // studies calculator only with real candles
        this.studiesCalculator = dxStudiesMock;
        // studies calculator with fake candles, we can't use fake candles for all studies
        this.fullStudiesCalculator = dxStudiesMock;
        this.dxStudyConfigs = {};
        this.dxStudyCache = {};
        this.dxStudyDataCache = {};
        this.firstCandleTimeStamp = 0;
        // on tick aggregation timestamp can be the same for the two candles, so use index
        this.lastCandleIdx = 0;
        this.seriesLengthWithFake = 0;
        this.chartModel = null;
        this.tradingSessionsProvider = null;
        this.tradingHoursProvider = null;
        this.chartModel = chartModel;
        this.tradingSessionsProvider = tradingSessionsProvider;
        this.tradingHoursProvider = tradingHoursProvider;
    }
    async initStudiesCalculators() {
        this.dxStudyCache = {};
        this.dxStudyDataCache = {};
        const candles = await this.chartModel.getCandles();
        const candlesWithFake = await this.chartModel.getCandlesWithFake();
        this.seriesLengthWithFake = candlesWithFake.length;
        const firstCandle = firstOf(candles);
        const lastCandle = lastOf(candles);
        this.firstCandleTimeStamp = firstCandle?.timestamp ?? 0;
        this.lastCandleIdx = lastCandle?.idx ?? 0;
        // overlay studies like Ichimoku can have data in future
        const studyCandles = candles.map(toStudiesCandle);
        const studyCandlesWithFake = candlesWithFake.map(toStudiesCandle);
        this.studiesCalculator = (await createStudiesCalculator)(Number.MAX_SAFE_INTEGER, studyCandles);
        this.fullStudiesCalculator = (await createStudiesCalculator)(Number.MAX_SAFE_INTEGER, studyCandlesWithFake);
        const th = await this.tradingHoursProvider();
        if (th !== undefined) {
            await this.applySessions(th, candles, candlesWithFake);
        }
    }
    /**
     * Tricky logic which is intended to optimize studies calculations in case we have only last candle update
     * (or a new candle came)
     * @doc-tags tricky
     */
    async updateCalculators() {
        const candles = await this.chartModel.getCandles();
        const firstCandle = firstOf(candles);
        if (firstCandle?.timestamp !== this.firstCandleTimeStamp
        // or if two last candle has timestamp difference which doesn't match current period
        // we have to reset calculators
        // actually, I don't understand why do we need to reset calculators in this case
        // preLastCandle?.timestamp + this.chartModel.getPeriod() !== lastCandle?.timestamp
        ) {
            await this.initStudiesCalculators();
            return;
        }
        this.addFakeCandleIfNeeded();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const startIdx = this.lastCandleIdx;
        let currentCandle = candles[startIdx];
        let idx = startIdx;
        while (currentCandle !== undefined) {
            const studyCandles = [currentCandle].map(toStudiesCandle);
            this.studiesCalculator.addCandleItems(studyCandles);
            this.fullStudiesCalculator.addCandleItems(studyCandles);
            this.lastCandleIdx = currentCandle.idx ?? 0;
            idx++;
            currentCandle = candles[idx];
        }
        this.calculateOnlyLastValues(startIdx, idx);
    }
    calculateOnlyLastValues(startIdx, lastCandleIdx) {
        for (const [uuid, study] of Object.entries(this.dxStudyCache)) {
            const data = this.dxStudyDataCache[uuid];
            const endIdx = this.dxStudyConfigs[uuid]?.calculateFutureData ? this.seriesLengthWithFake : lastCandleIdx;
            for (let i = startIdx; i < endIdx; i++) {
                if (data[i] !== undefined) {
                    data[i] = study.calculateAt(i);
                }
                else {
                    data.push(study.calculateAt(i));
                }
            }
        }
    }
    addFakeCandleIfNeeded() {
        const candles = this.chartModel.getCandles();
        const lastCandle = lastOf(candles);
        if (lastCandle?.idx !== this.lastCandleIdx) {
            // if we have a new real candle - we need to add a new fake candle to calculator
            // so studies like Ichimoku can calculate their future values
            const candleWithFake = this.chartModel.getCandlesWithFake();
            this.seriesLengthWithFake = candleWithFake.length;
            const lastFakeCandle = lastOf(candleWithFake);
            if (lastFakeCandle !== undefined) {
                const studyCandles = [lastFakeCandle].map(toStudiesCandle);
                this.fullStudiesCalculator.addCandleItems(studyCandles);
            }
        }
    }
    calculateWithDxStudies(config) {
        const paramsChanged = !deepEqual(config.parameters, this.dxStudyConfigs[config.uuid]?.parameters);
        if (this.dxStudyDataCache[config.uuid] === undefined || paramsChanged) {
            this.dxStudyConfigs[config.uuid] = config;
            const params = config.parameters.map(parameter => ({
                key: parameter.id,
                value: parameter.value,
            }));
            let study = this.dxStudyCache[config.uuid];
            if (study === undefined || paramsChanged) {
                if (config.calculateFutureData) {
                    study = this.fullStudiesCalculator.createStudy(config.id, params);
                }
                else {
                    study = this.studiesCalculator.createStudy(config.id, params);
                }
                this.dxStudyCache[config.uuid] = study;
            }
            this.dxStudyDataCache[config.uuid] = study.calculateAll() ?? [[]];
        }
        return this.dxStudyDataCache[config.uuid];
    }
    calculateStudy(config) {
        return this.calculateWithDxStudies(config);
    }
    async applySessions(th, candles, candlesWithFake) {
        const to = lastOf(candlesWithFake)?.timestamp;
        const from = firstOf(candlesWithFake)?.timestamp;
        if (to === undefined || from === undefined) {
            return;
        }
        const filter = ['REGULAR', 'PRE_MARKET', 'AFTER_MARKET'];
        const DAY = 60 * 60 * 24;
        const chartSessions = [];
        const period = await this.chartModel.getPeriod();
        if (period < DAY) {
            const symbol = await this.chartModel.mainCandleSeries.instrument.symbol;
            chartSessions.push(...(await generateSessionsStrict(await this.tradingSessionsProvider, from, to, {
                filter,
                candles,
                tradingHours: th,
                period,
                symbol,
            })));
        }
        else {
            candles.forEach((candle, idx) => {
                const nextCandle = candles[idx + 1];
                if (candle && nextCandle) {
                    chartSessions.push({
                        from: candle.timestamp,
                        to: nextCandle.timestamp,
                        type: 'REGULAR',
                    });
                }
            });
        }
        const sessions = chartSessions.map(toStudiesSession);
        this.studiesCalculator.setTradingSessions(sessions);
        this.fullStudiesCalculator.setTradingSessions(sessions);
    }
}
