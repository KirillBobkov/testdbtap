import { merge } from '@devexperts/dxcharts-lite/dist/chart/utils/merge.utils';
import { cloneUnsafe } from '@devexperts/dxcharts-lite/dist/chart/utils/object.utils';
import { option } from 'fp-ts';
import { some } from 'fp-ts/Option';
import { constVoid } from 'fp-ts/function';
import React, { memo } from 'react';
import { useA11yDescriptions } from '../chart-kit/accessibility/use-a11y-descriptions';
import { useHandleBrowserHotkeysEvents } from '../chart-kit/accessibility/use-handle-browser-hotkeys-events';
import { getDefaultChartConfig } from '../config/chart-config';
import { DEFAULT_INIT_CHART_REACT_CONFIG, mergeChartReactConfig, } from '../config/chart-react-config';
import { DEFAULT_COLOR_PALETTE } from '../config/color-palette';
import { getDefaultDrawingsConfig } from '../config/drawings-config';
import { DEFAULT_ICONS_POOL } from '../config/icons-pool';
import { DEFAULT_LOCALIZATION } from '../config/localization/localization';
import { DEFAULT_STUDIES_LIST } from '../config/studies-list';
import { context } from '../context/context2';
import { createChartSharingProvider } from '../providers/chart-sharing-provider';
import { createMockChartDataProvider } from '../providers/mocks/mock-chart-data-provider';
import { createMockDxScriptProvider } from '../providers/mocks/mock-dx-script-provider';
import { createMockDxScriptRunner } from '../providers/mocks/mock-dx-script-runner';
import { createMockDxStudiesProvider } from '../providers/mocks/mock-dx-studies-provider';
import { createMockLayoutProvider } from '../providers/mocks/mock-layout-provider';
import { createMockEventDataProvider } from '../providers/mocks/mock-events-data-provider';
import { createMockIndicatorsTemplateProvider } from '../providers/mocks/mock-indicator-template-provider';
import { createMockNewsDataProvider } from '../providers/mocks/mock-news-data-provider';
import { createMockOrderProvider } from '../providers/mocks/mock-order-provider';
import { createMockPositionProvider } from '../providers/mocks/mock-position-provider';
import { createMockSymbolSuggestProvider } from '../providers/mocks/mock-symbol-suggest-provider';
import { createMockUserDataProvider } from '../providers/mocks/mock-user-data-provider';
import { callTracerProxy } from '../utils/debug/call-tracer';
import { DEFAULT_TIMEZONES_CONFIG } from '../utils/timezones/timezones';
import { useCVHCssProperty } from '../utils/use-cvh-css-property';
import useMobile from '../utils/use-mobile';
import { useSink } from '../utils/use-sink';
import { CHART_REACT_WRAPPER_ID, ChartReactAppStyled, OfflineAlert } from './chart-react-app.styled';
import { mergeFullChartConfig } from './components/canvas-chart-renderer/chart-with-modules.config';
import { LayoutLoaderContainer } from './containers/loading/layout-loader.container';
import { ChartReactAppContext, DEFAULT_AGGREGATION_PERIOD, DEFAULT_AGGREGATION_PERIODS_LIST, DEFAULT_CHART_TYPES_CONFIG, DEFAULT_PALETTE, DEFAULT_THEME, } from './defaults';
import './index.css';
import { aggregationPeriodToString } from './model/aggregation.model';
import { DEFAULT_CHART_REACT_SETTINGS } from './model/chart.model';
import { fromRawStudiesSettings } from './model/studies.model';
import { DEFAULT_TIMEFRAME_PRESETS } from './model/timeframe-presets.model';
import { createLocalInstrumentStore } from './stores/instrument.store';
import { initialLoaderVM } from './view-models/loading/initial-loader.vm';
import { INITIAL_USER_DATA } from './view-models/user-data.view-model';
import { createDefaultTradingSessionsProvider } from '../providers/sessions/default-trading-sessions-provider';
import './index.css';
import { UIOverridesContext } from './ui-overrides';
const ChartReactAppComponent = context.combine(context.defer(LayoutLoaderContainer, 'initialLoaderVM'), initialLoaderVM, context.key()('chartReactConfig'), context.key()('localization'), (LayoutLoaderContainerDefer, initialLoaderVMSink, chartReactConfig, localization) => {
    return memo(props => {
        // remember root element
        const ref = React.createRef();
        const [rootRef, setRootRef] = React.useState(null);
        // useLayoutEffect instead useEffect to avoid blinking after initial render
        React.useLayoutEffect(() => {
            if (ref.current) {
                setRootRef(ref.current);
            }
        }, [ref]);
        // workaround to fix css 'vh' property on a mobile
        useCVHCssProperty();
        useA11yDescriptions(ref, localization);
        // create VM for layout loading and migration
        const initialLoaderVM = useSink(() => initialLoaderVMSink, []);
        const LayoutLoaderContainer = useSink(() => LayoutLoaderContainerDefer({ initialLoaderVM }), [initialLoaderVM]);
        useHandleBrowserHotkeysEvents(document.body);
        // TODO: Research how keyboard mode should handle shift button
        // useA11yIgnoreFocusKeydown(document.body);
        const isMobile = useMobile();
        return (React.createElement(ChartReactAppStyled, { id: CHART_REACT_WRAPPER_ID, className: `${CHART_REACT_WRAPPER_ID} ${props.className ?? ''}`, width: chartReactConfig.fixedSize?.width, height: chartReactConfig.fixedSize?.height, ref: ref, showPopupsOutside: chartReactConfig.popups.showOutside }, rootRef !== null ? (React.createElement(ChartReactAppContext.Provider, { value: {
                rootElement: rootRef,
                showPopupsOutside: chartReactConfig.popups.showOutside,
                showButtonsTooltip: chartReactConfig.toolbar.showButtonsTooltip,
                isMobile,
                config: chartReactConfig,
            } },
            React.createElement(LayoutLoaderContainer, null),
            props.isOffline && React.createElement(OfflineAlert, null, "OFFLINE MOCK MODE"))) : null));
    });
});
/**
 * Default instrument when rendering ChartReactApp if not provided with props.
 * @doc-tags chart-react,default-config
 */
const INITIAL_INSTRUMENT = {
    symbol: 'AAPL',
    description: 'Apple Inc',
    type: 'STOCK',
    priceIncrements: [0.0001, 1, 0.01],
};
/**
 * Entry point for chart-react library.
 * @doc-tags chart-react
 * @doc-tags-ref ChartReactApp#l
 */
export const ChartReactApp = memo(props => {
    const timezones = props.dependencies?.timezones ?? DEFAULT_TIMEZONES_CONFIG;
    const chartTypesConfig = merge(props.dependencies?.chartTypesConfig ?? {}, DEFAULT_CHART_TYPES_CONFIG);
    const palette = merge(props.dependencies?.palette ?? {}, DEFAULT_PALETTE);
    const localization = merge(props.dependencies?.localization ?? {}, DEFAULT_LOCALIZATION);
    const initialTimeframePresets = props.dependencies?.initialTimeframePresets || DEFAULT_TIMEFRAME_PRESETS;
    const initialChartConfig = getDefaultChartConfig(palette['dark'].object, palette['light'].object);
    const initialChartReactSettings = merge(props.dependencies?.initialChartReactSettings ?? {}, DEFAULT_CHART_REACT_SETTINGS);
    const defaultDependencies = {
        initialLoading: [],
        localInstrumentStore: createLocalInstrumentStore(),
        dxScriptRunner: createMockDxScriptRunner(),
        chartDataProvider: createMockChartDataProvider(),
        symbolSuggestProvider: createMockSymbolSuggestProvider,
        eventsDataProvider: createMockEventDataProvider(),
        initialStudies: [],
        chartTypesConfig,
        initialChartTheme: DEFAULT_THEME,
        localization,
        dxScriptProvider: createMockDxScriptProvider(),
        dxStudiesProvider: createMockDxStudiesProvider(DEFAULT_STUDIES_LIST(localization.studies).map(fromRawStudiesSettings)),
        chartSharingProvider: createChartSharingProvider(),
        colorPalette: DEFAULT_COLOR_PALETTE,
        iconsPool: DEFAULT_ICONS_POOL,
        drawingsConfig: getDefaultDrawingsConfig(palette.dark.object),
        tradingSessionsProvider: createDefaultTradingSessionsProvider(),
        orderProvider: createMockOrderProvider(),
        positionProvider: createMockPositionProvider(),
        layoutProvider: createMockLayoutProvider(),
        indicatorsTemplateProvider: createMockIndicatorsTemplateProvider(),
        userDataProvider: createMockUserDataProvider(),
        initialInstrument: some(INITIAL_INSTRUMENT.symbol),
        initialAggregation: DEFAULT_AGGREGATION_PERIOD,
        initialChartConfig,
        chartReactConfig: DEFAULT_INIT_CHART_REACT_CONFIG,
        initialChartReactSettings,
        initialAggregationPeriods: DEFAULT_AGGREGATION_PERIODS_LIST,
        onApiCreated: props.onApiCreated ?? constVoid,
        palette,
        timezones,
        initialTimeframePresets,
        newsDataProvider: createMockNewsDataProvider(),
    };
    const deps = overrideDependencies(defaultDependencies, props.dependencies);
    // merged with default full chart config
    const chartConfig = mergeFullChartConfig(cloneUnsafe(deps.initialChartConfig), initialChartConfig);
    const chartReactConfig = mergeChartReactConfig(cloneUnsafe(deps.chartReactConfig));
    // TODO: this is a hack, because cloneUnsafe does not clone props as functions
    // we need to fix it, or create API with callback instead
    chartReactConfig.dateFormatters = { ...deps.chartReactConfig.dateFormatters };
    // add default periods
    const initialUserData = {
        ...INITIAL_USER_DATA,
        customPeriods: deps.initialAggregationPeriods.map(period => aggregationPeriodToString(period)),
    };
    // dependencies which are adapted for internal context
    // for example on this level we use "chartConfig" instead of "initialChartConfig"
    const adaptedDependencies = {
        ...deps,
        chartConfig,
        chartReactConfig,
        initialUserData,
    };
    const AppComponent = useSink(() => ChartReactAppComponent(adaptedDependencies), [adaptedDependencies.palette]);
    return (React.createElement(UIOverridesContext.Provider, { value: props.uiOverrides ?? {} },
        React.createElement(AppComponent, { ...props.data, className: props.className })));
});
const overrideDependencies = (defaultDependencies, override) => {
    if (override) {
        for (const [key, value] of Object.entries(override)) {
            if (value !== undefined && value !== null) {
                let proxyContainerName;
                if (key.indexOf('Provider') !== -1) {
                    proxyContainerName = key;
                }
                if (proxyContainerName) {
                    defaultDependencies[key] = callTracerProxy(proxyContainerName, value);
                }
                else {
                    defaultDependencies[key] = value;
                }
            }
        }
        // custom override logic
        if (override.initialInstrument !== undefined) {
            defaultDependencies.initialInstrument = option.fromNullable(override.initialInstrument);
        }
    }
    return defaultDependencies;
};
