import { NonEmptyArray } from 'fp-ts/NonEmptyArray';
import { Observable } from 'rxjs';
import { ChartCandleData, ChartDataOptions, ChartDataProvider } from '../../providers/chart-data-provider';
import { AggregationPeriod } from '../model/aggregation.model';
import { InitialLoaderVM } from '../view-models/loading/initial-loader.vm';
import { ChartReactConfig } from '../../config/chart-react-config';
export type CandleDataType = 'HISTORICAL' | 'LAZY' | 'LAST_CANDLE';
export interface ChartServiceData {
    data: ChartCandleData[];
    instrument: string;
    type: CandleDataType;
}
export interface RequestMoreDataOptions {
    fromTime?: number;
    toTime?: number;
}
/**
 * @name MultiChartDataService
 * @description
 * The Service controls the flow of a data subscriptions.
 * @see
 * The main feature is kinda *memoization* of an observable for a symbol with a given parameters,
 * ie. If you request to subscribe for a data of a symbol that already exists in a multichart, the service'll
 * return the existing subsciption instead of creating duplicates.
 * @see
 * You can check the sequence diagram of the flow of the service here {@link https://miro.com/app/board/o9J_kiK_OEU=/?moveToWidget=3458764525471337286&cot=14}
 * for a better understanding of the service.
 * @doc-tags chart-react, service
 */
export interface MultiChartDataService {
    /**
     * @name subscribeSymbolsHistoryData
     * @description
     * Subscribes to a history data.
     * @see
     * The returned Observable can receive
     * data *multiple times*, including *lazy loaded* data via {@link requestMoreHistoryData}.
     */
    readonly subscribeSymbolsHistoryData: (chartId: string, symbols: NonEmptyArray<string>, aggregation: AggregationPeriod, options: RequestMoreDataOptions & ChartDataOptions) => Observable<ChartServiceData[]>;
    /**
     * @name requestMoreHistoryData
     * @description
     * Loads a lazy loadable history data if present.
     * @see
     * The result is pushed to a {@link subscribeSymbolsHistoryData}.
     */
    readonly requestMoreHistoryData: (chartId: string, options?: RequestMoreDataOptions) => void;
    /**
     * @name unsubscribeSymbolData
     * @description
     * Unsubscribes from data updates on selected chart
     * @see
     * *Unubscribes* from the *last candle data* updates.
     */
    readonly unsubscribeSymbolData: (chartId: string) => void;
    /**
     * @name subscribeLastCandleUpdates
     * @description
     * Subscribes to a last candle data updates of a symbol with a given parameters.
     * @see
     * Last candle data won't be provided if a history data subscription (via {@link subscribeSymbolsHistoryData}) is not existing.
     */
    readonly subscribeLastCandleUpdates: (symbols: NonEmptyArray<string>, aggregation: AggregationPeriod, options: ChartDataOptions) => Observable<{
        candleData: ChartCandleData;
        symbol: string;
    }>;
}
/**
 * @name createMultiChartDataService
 * @description
 * Factory of a {@link MultiChartDataService}
 */
export declare const createMultiChartDataService: import("../../context/context2").Context<Record<"chartDataProvider", ChartDataProvider> & Record<"initialLoaderVM", InitialLoaderVM> & Record<"chartReactConfig", ChartReactConfig>, MultiChartDataService>;
