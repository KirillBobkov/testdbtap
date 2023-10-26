import { DEFAULT_LABEL_COLOR } from '@devexperts/dxcharts-lite/dist/chart/components/y_axis/label-color.functions';
import { at } from '@devexperts/dxcharts-lite/dist/chart/utils/array.utils';
import { getLabelTextColorByBackgroundColor } from '@devexperts/dxcharts-lite/dist/chart/utils/canvas/canvas-text-functions.utils';
import { addDays, addSeconds, format } from 'date-fns';
import { isSome } from 'fp-ts/Option';
import { context } from '../../../../context/context2';
import { periodToMinutes } from '../../../model/aggregation.model';
export const createCountdownToBarCloseProvider = context.combine(context.key()('yAxisConfiguratorViewModel'), context.key()('chartDataViewModel'), context.key()('chart'), context.key()('aggregationPeriodViewModel'), context.key()('chartSessionsViewModel'), (yAxisVM, chartDataVM, chart, aggregationsPeriodViewModel, chartSessionsViewModel) => (nextCandleTimestampsCache) => {
    let sessions = [];
    const getYAxisVisualCountdownLabel = (series) => {
        const lastCandle = series?.dataPoints?.length && at(-1, series.dataPoints);
        if (lastCandle) {
            const y = chart.chartModel.toY(lastCandle.close);
            if (isFinite(y)) {
                const colors = series.colors;
                const labelColorResolver = chart.yAxis.getLabelsColorResolver(series.config.type);
                const bgColor = colors
                    ? labelColorResolver(series.lastPriceMovement, colors)
                    : DEFAULT_LABEL_COLOR;
                const { rectLabelTextColor, rectLabelInvertedTextColor } = chart.chartModel.config.colors.yAxis;
                const paddings = chart.config.components.yAxis.typeConfig[chart.config.components.yAxis.labels.settings.countdownToBarClose.type]?.paddings;
                const drawConfig = {
                    bgColor,
                    textColor: getLabelTextColorByBackgroundColor(bgColor, rectLabelTextColor, rectLabelInvertedTextColor),
                    rounded: true,
                    paddingStart: paddings?.start,
                    paddingBottom: paddings?.bottom,
                    paddingEnd: paddings?.end,
                    paddingTop: paddings?.top,
                };
                const diff = getNextCandleTimeStamp(lastCandle.timestamp) +
                    chartSessionsViewModel.nextCandleTimestampOffset.getValue() -
                    Date.now();
                return {
                    ...drawConfig,
                    y,
                    labelWeight: 1,
                    labelText: countdownDateTimeFormatter(diff),
                    mode: 'label',
                    labelType: chart.config.components.yAxis.labels.settings.countdownToBarClose.type,
                };
            }
        }
        return null;
    };
    const getPeriodInMs = () => periodToMinutes(aggregationsPeriodViewModel.selectedPeriod.getValue()) * 60 * 1000;
    const recalculateSessions = (from) => {
        const instrument = chartDataVM.instrument.getValue();
        if (isSome(instrument)) {
            const th = instrument.value.tradingHours;
            const candles = chart.chartModel.mainCandleSeries.dataPoints;
            const filter = chartDataVM.extendedHours.getValue()
                ? ['REGULAR', 'PRE_MARKET', 'AFTER_MARKET']
                : ['REGULAR'];
            if (candles && th !== undefined) {
                // I think 15 days should be enough for any holidays
                const to = from + 15 * 24 * 60 * 60 * 1000;
                chartSessionsViewModel.generateSessions(filter, from, to).then(_sessions => {
                    sessions = [];
                    Object.values(_sessions).forEach(s => {
                        s &&
                            s.forEach(item => {
                                if (filter.includes(item.type)) {
                                    sessions.push(item);
                                }
                            });
                    });
                });
            }
        }
    };
    /**
     * Calculates the next candle timestamp to shown in countdown label.
     * Respects agg.period and trading sessions.
     * @doc-tags tricky,countdown
     * @param current
     */
    const getNextCandleTimeStamp = (current) => {
        if (nextCandleTimestampsCache.get(current)) {
            const isCacheTimestampInSession = sessions.some(s => isTimestampInSession(nextCandleTimestampsCache.get(current) ?? 0, s));
            if (isCacheTimestampInSession) {
                return nextCandleTimestampsCache.get(current) ?? 0;
            }
        }
        let nextCandleTimestamp = current + getPeriodInMs();
        // -1 because timestamp could be in the end of session and in that case generator will pick the next session
        recalculateSessions(nextCandleTimestamp - 1);
        for (const session of sessions) {
            if (nextCandleTimestamp < session.from) {
                nextCandleTimestamp = session.from;
            }
            if (isTimestampInSession(nextCandleTimestamp, session)) {
                break;
            }
        }
        nextCandleTimestampsCache.clear();
        nextCandleTimestampsCache.set(current, nextCandleTimestamp);
        return nextCandleTimestamp;
    };
    const isTimestampInSession = (timestamp, session) => session.from <= timestamp && timestamp < session.to;
    const getUnorderedLabels = () => {
        const collectedLabels = [];
        const countdownEnabled = yAxisVM.labelsConfig.getValue().countDownToBarClose;
        const mainSeriesLabelVisible = chart.config.components.yAxis.labels.settings.lastPrice.mode !== 'none';
        if (mainSeriesLabelVisible && countdownEnabled && chart.config.components.yAxis.visible) {
            const mainCandleSeriesCountdownToBarClose = getYAxisVisualCountdownLabel(chart.chartModel.mainCandleSeries);
            if (mainCandleSeriesCountdownToBarClose) {
                const mainCandleSeriesLabels = { labels: [mainCandleSeriesCountdownToBarClose] };
                collectedLabels.push(mainCandleSeriesLabels);
            }
        }
        return collectedLabels;
    };
    return {
        getUnorderedLabels,
    };
});
/**
 * Countdown label date formatter function
 * Returns different date format depends on the difference between current time and next candle time of appearance
 * Link to the requirements:
 * https://confluence.in.devexperts.com/display/DR/Price+Scale#req-scale-17
 */
export function countdownDateTimeFormatter(diff) {
    if (diff < 0) {
        return '00:00';
    }
    else {
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        // Why new Date(0) ? The thing is timezone offset depends on current time.
        // For example, GMT has +1 offset at 1970
        const helperDate = addDays(addSeconds(new Date(new Date(0).getTimezoneOffset() * 60 * 1000), seconds), -1);
        if (days >= 1) {
            return format(helperDate, "D'd' H'h'", {
                useAdditionalDayOfYearTokens: true,
            });
        }
        else if (hours >= 1 && days < 1) {
            return format(helperDate, 'HH:mm:ss');
        }
        else if (minutes >= 1 && hours < 1) {
            return format(helperDate, 'mm:ss');
        }
        return format(helperDate, '0:ss');
    }
}
