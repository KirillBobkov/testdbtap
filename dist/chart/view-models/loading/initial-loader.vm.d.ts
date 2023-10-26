import { option } from 'fp-ts';
import { Observable } from 'rxjs';
import { ChartReactConfig } from '../../../config/chart-react-config';
import { ModuleKeywords, TDxScriptWithoutCode } from '../../../providers/dx-script-provider';
import { ChartLayoutData, ChartLayoutWithId } from '../../../providers/layout-provider';
import { UserData } from '../../../providers/user-data-provider';
import { Property } from '../../../utils/property.utils';
import { Sink } from '../../../utils/sink';
import { ChartLoadingState, LoadingState } from '../../components/loading/loading.component';
import { AggregationPeriod } from '../../model/aggregation.model';
import { ChartReactSettings, ChartTypesConfig } from '../../model/chart.model';
import { FullChartCoreConfig } from '../../../config/chart-config';
export interface InitialLoadingItem {
    itemName: string;
    item: Promise<unknown>;
    itemWeight?: number;
}
export interface InitialLoaderVM {
    /**
     * If chart initial data is completely loaded. (doesn't include chart data)
     */
    isLoaded: Property<boolean>;
    /**
     * Shows the loading status of the chart as a percentage [0..100].
     */
    loadedPercentage: Property<number>;
    /**
     * Loaded chart layout from the provider or the default one.
     */
    layoutLoaded: Observable<ChartLayoutData>;
    /**
     * Loaded user data from provider or the default one.
     */
    userDataLoaded: Observable<UserData>;
    /**
     * Loaded dxScript from the provider or the default one.
     */
    dxScriptLoaded: Observable<TDxScriptWithoutCode[]>;
    /**
     * Loaded dxScript keywords from the runner or the default one.
     */
    dxScriptKeywordsLoaded: Observable<ModuleKeywords[]>;
    updateLoadingState: (key: string, state: LoadingState) => void;
    processUserLayout: (layout: ChartLayoutWithId) => ChartLayoutWithId;
}
export declare const SPY_TRIAL_URL = "https://webdev.prosp.devexperts.com:8095/api/lib-alive";
/**
 * Controls the initial loading of required chart parts: layout, user data.
 * Anything we need to load before chart is ready to work.
 * @doc-tags chart-react,loading,layout
 */
export declare const initialLoaderVM: import("../../../context/context2").Context<Record<"initialInstrument", option.Option<string>> & Record<"chartConfig", FullChartCoreConfig> & Record<"chartReactConfig", ChartReactConfig> & Record<"initialChartReactSettings", ChartReactSettings> & Record<"initialStudies", string[]> & Record<"initialAggregation", AggregationPeriod> & Record<"chartTypesConfig", ChartTypesConfig> & Record<"initialUserData", UserData> & Record<"initialLoading", InitialLoadingItem[]> & Record<"chartDataProvider", import("../../../providers/chart-data-provider").ChartDataProvider> & Record<"symbolSuggestProvider", import("../../../providers/symbol-suggest-provider").SymbolSuggestProvider> & Record<"eventsDataProvider", import("../../../providers/events-data-provider").EventsDataProvider> & Record<"dxScriptRunner", import("../../../providers/dx-script-provider").DxScriptRunner> & Record<"dxScriptProvider", import("../../../providers/dx-script-provider").DxScriptProvider> & Record<"dxStudiesProvider", import("../../../providers/studies/dx-studies-provider").DxStudiesProvider> & Record<"tradingSessionsProvider", import("../../../providers/sessions/trading-sessions-provider").TradingSessionsProvider> & Record<"orderProvider", import("../../../providers/trading/order.provider").OrderProvider> & Record<"positionProvider", import("../../../providers/trading/position.provider").PositionProvider> & Record<"chartSharingProvider", import("../../../providers/chart-sharing-provider").ChartSharingProvider> & Record<"indicatorsTemplateProvider", import("../../../providers/indicator-templates-provider").IndicatorsTemplateProvider> & Record<"userDataProvider", import("../../../providers/user-data-provider").UserDataProvider> & Record<"layoutProvider", import("../../../providers/layout-provider").LayoutProvider>, Sink<InitialLoaderVM>>;
export declare const chartDataID: (key: string) => string;
export declare const checkAllLoaded: (loadingState: ChartLoadingState) => boolean;
export declare const calculateLoadedStatus: (loadingState: ChartLoadingState, weights: Record<string, number>) => number;
