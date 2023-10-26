import { expose, proxy } from 'comlink';
import { DxStudiesDataProvider } from './webworker-studies-data-provider';
export class dxStudiesProvidersContainer {
    initProvider(chartModel, tradingSessionsProvider, tradingHoursProvider) {
        const provider = new DxStudiesDataProvider(chartModel, tradingSessionsProvider, tradingHoursProvider);
        return proxy(provider);
    }
}
expose(dxStudiesProvidersContainer);
