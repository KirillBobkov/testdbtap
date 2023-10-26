import { context } from '../context/context2';
/**
 * This context aggregates all external chart providers.
 * Use it to reduce the amount of context.key's injections.
 * @arch-tangle-ignore
 */
export const Providers = context.combine(context.key()('chartDataProvider'), context.key()('symbolSuggestProvider'), context.key()('eventsDataProvider'), context.key()('dxScriptRunner'), context.key()('dxScriptProvider'), context.key()('dxStudiesProvider'), context.key()('tradingSessionsProvider'), context.key()('orderProvider'), context.key()('positionProvider'), context.key()('chartSharingProvider'), context.key()('indicatorsTemplateProvider'), context.key()('userDataProvider'), context.key()('layoutProvider'), (chartDataProvider, symbolSuggestProvider, eventsDataProvider, dxScriptRunner, dxScriptProvider, dxStudiesProvider, tradingSessionsProvider, orderProvider, positionProvider, chartSharingProvider, indicatorsTemplateProvider, userDataProvider, layoutProvider) => ({
    chartDataProvider,
    symbolSuggestProvider,
    eventsDataProvider,
    dxScriptRunner,
    dxScriptProvider,
    dxStudiesProvider,
    tradingSessionsProvider,
    orderProvider,
    positionProvider,
    chartSharingProvider,
    indicatorsTemplateProvider,
    userDataProvider,
    layoutProvider,
}));
