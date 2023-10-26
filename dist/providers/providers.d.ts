import { DxScriptProvider, DxScriptRunner } from './dx-script-provider';
import { DxStudiesProvider } from './studies/dx-studies-provider';
import { ChartDataProvider } from './chart-data-provider';
import { SymbolSuggestProvider } from './symbol-suggest-provider';
import { EventsDataProvider } from './events-data-provider';
import { OrderProvider } from './trading/order.provider';
import { PositionProvider } from './trading/position.provider';
import { ChartSharingProvider } from './chart-sharing-provider';
import { IndicatorsTemplateProvider } from './indicator-templates-provider';
import { UserDataProvider } from './user-data-provider';
import { LayoutProvider } from './layout-provider';
import { TradingSessionsProvider } from './sessions/trading-sessions-provider';
/**
 * This context aggregates all external chart providers.
 * Use it to reduce the amount of context.key's injections.
 * @arch-tangle-ignore
 */
export declare const Providers: import("../context/context2").Context<Record<"chartDataProvider", ChartDataProvider> & Record<"symbolSuggestProvider", SymbolSuggestProvider> & Record<"eventsDataProvider", EventsDataProvider> & Record<"dxScriptRunner", DxScriptRunner> & Record<"dxScriptProvider", DxScriptProvider> & Record<"dxStudiesProvider", DxStudiesProvider> & Record<"tradingSessionsProvider", TradingSessionsProvider> & Record<"orderProvider", OrderProvider> & Record<"positionProvider", PositionProvider> & Record<"chartSharingProvider", ChartSharingProvider> & Record<"indicatorsTemplateProvider", IndicatorsTemplateProvider> & Record<"userDataProvider", UserDataProvider> & Record<"layoutProvider", LayoutProvider>, {
    chartDataProvider: ChartDataProvider;
    symbolSuggestProvider: SymbolSuggestProvider;
    eventsDataProvider: EventsDataProvider;
    dxScriptRunner: DxScriptRunner;
    dxScriptProvider: DxScriptProvider;
    dxStudiesProvider: DxStudiesProvider;
    tradingSessionsProvider: TradingSessionsProvider;
    orderProvider: OrderProvider;
    positionProvider: PositionProvider;
    chartSharingProvider: ChartSharingProvider;
    indicatorsTemplateProvider: IndicatorsTemplateProvider;
    userDataProvider: UserDataProvider;
    layoutProvider: LayoutProvider;
}>;
