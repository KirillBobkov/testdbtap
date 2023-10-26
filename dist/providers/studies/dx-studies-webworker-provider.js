import { proxy, wrap } from 'comlink';
import { merge } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';
import { DxStudiesDataProvider } from './dx-studies-studies-data-provider';
import { createMutex } from './mutex';
export const createDxStudiesWebWorkerProvider = (chart, tradingSessionsProvider, tradingHoursProvider, workersDisabled) => {
    try {
        if (workersDisabled) {
            // we need to throw it explicitly, bcs if code reaches line with creating worker, then
            // catch won't work in vite/rollup
            throw new Error('Workers disabled');
        }
        let providersContainer;
        if (window.__CHART_REACT__?.dxStudiesProvidersContainer) {
            providersContainer = window.__CHART_REACT__.dxStudiesProvidersContainer;
        }
        else {
            const dxStudiesProvidersContainer = wrap(new Worker(new URL('./webworker-dx-studies-providers-container.js', import.meta.url)));
            providersContainer = new dxStudiesProvidersContainer();
            window.__CHART_REACT__ = {
                dxStudiesProvidersContainer: providersContainer,
            };
        }
        const mutex = createMutex();
        mutex.lock();
        const provider = (async () => {
            const container = await providersContainer;
            const provider = await container.initProvider(proxy(chart.chartModel), proxy(tradingSessionsProvider), proxy(tradingHoursProvider));
            const areStudiesAdded = () => Object.keys(chart.studies.model.allStudies).length !== 0;
            merge(chart.chartModel.candlesSetSubject.pipe(mergeMap(async () => {
                mutex.lock();
                await provider.initStudiesCalculators();
                mutex.unlock();
            })), chart.chartModel.candlesUpdatedSubject.pipe(filter(areStudiesAdded), mergeMap(async () => {
                mutex.lock();
                await provider.updateCalculators();
                mutex.unlock();
            }))).subscribe();
            // it's possible that subscribe had happend after candles set subject, so we need to check
            // if candles are already set and init calculators
            if (chart.chartModel.mainCandleSeries.dataPoints.length !== 0) {
                mutex.lock();
                await provider.initStudiesCalculators();
                mutex.unlock();
            }
            return provider;
        })();
        return {
            calculateStudy: async (config) => {
                await mutex.current;
                return provider.then(p => p.calculateStudy(config));
            },
        };
    }
    catch (e) {
        console.warn('Failed to create studies webworker', e);
        return new DxStudiesDataProvider(chart.chartModel, tradingSessionsProvider, tradingHoursProvider);
    }
};
