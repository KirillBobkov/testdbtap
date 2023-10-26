import { mergeWithDefaultConfigCopy } from '@devexperts/dxcharts-lite/dist/chart/chart.config';
import { merge } from '@devexperts/dxcharts-lite/dist/chart/utils/merge.utils';
import { cloneUnsafe } from '@devexperts/dxcharts-lite/dist/chart/utils/object.utils';
import { option } from 'fp-ts';
import { none, some } from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { ChartReactApp } from '../chart/chart-react-app';
import { DEFAULT_ICONS_RENDER_CONTEXT, IconsRenderContext } from '../chart/components/multi-chart/icons-render-context';
import { DEFAULT_PALETTE, DEFAULT_THEME } from '../chart/defaults';
import { stringToAggregationPeriodSafe } from '../chart/model/aggregation.model';
import { config } from '../config/chart-config';
import { DEFAULT_INIT_CHART_REACT_CONFIG } from '../config/chart-react-config';
import { createChartSharingProvider } from '../providers/chart-sharing-provider';
import { createLocalStorageLayoutProvider } from '../providers/mocks/localstorage-layout-provider';
import { createMockChartRealDataProvider } from '../providers/mocks/server-side-mocks/mock-chart-real-data-provider';
import { parseBoolean } from '../utils/boolean.utils';
import { iteratorForEach } from '../utils/iterator.utils';
import { DEFAULT_TIMEZONES_CONFIG } from '../utils/timezones/timezones';
import { getQueryParam } from '../utils/url.utils';
import { SCRIPTS_URL, SNAPSHOT_URL, } from './standalone.config';
import { DEFAULT_SETTINGS_TABS_WITH_ICON, removeSettingsTab } from '../chart/ui-overrides/settings';
let root;
let chartReactApi;
const chartReactAPICB = (cb) => {
    return (api) => {
        chartReactApi = api;
        cb && cb(api);
    };
};
const createWidget = async (container, props) => {
    root = createRoot(container);
    const queryParams = getQueryParams();
    const { dependencies, svgShapeRendering = 'auto' } = props;
    const defaultChartReactConfig = cloneUnsafe(DEFAULT_WIDGET_CHART_REACT_CONFIG);
    defaultChartReactConfig.drawings.drawingGroups.enabled = true;
    defaultChartReactConfig.trading.enabled = false;
    defaultChartReactConfig.customPeriodInput.enabled = false;
    const chartReactConfig = dependencies?.chartReactConfig ?? defaultChartReactConfig;
    const palette = merge(props.dependencies?.palette ?? {}, DEFAULT_PALETTE);
    const chartCoreConfig = dependencies?.initialChartConfig ??
        mergeWithDefaultConfigCopy(config(palette['dark'].object, palette['light'].object));
    const initialChartReactConfig = mergeChartReactConfigWithWidgetProperties(props, chartReactConfig);
    const initialChartConfig = mergeChartCoreConfigWithWidgetProperties(props, chartCoreConfig);
    const eventsEnabled = parseBoolean(queryParams.eventsEnabled ?? props.eventsEnabled);
    const ChartSettingsTabs = eventsEnabled
        ? DEFAULT_SETTINGS_TABS_WITH_ICON
        : removeSettingsTab(DEFAULT_SETTINGS_TABS_WITH_ICON, 'ChartEventsTab');
    const chartDataProvider = dependencies?.chartDataProvider ?? createMockChartRealDataProvider();
    const chartSharingProvider = dependencies?.chartSharingProvider ??
        createChartSharingProvider({
            endpointUrl: SNAPSHOT_URL,
        });
    const onApiCreated = chartReactAPICB(props.onAPICreated ?? props.dependencies?.onApiCreated);
    const timezones = { ...DEFAULT_TIMEZONES_CONFIG };
    props.timezone && (timezones.currentTimezone = props.timezone);
    const ChartReactWidget = createElement(ChartReactApp, {
        dependencies: {
            ...dependencies,
            ...getInstrumentAndAggregation(props),
            ...getLayoutProvider(props, dependencies),
            timezones,
            chartDataProvider,
            chartSharingProvider,
            ...(await mergeDependenciesWithQueryParams(props, initialChartReactConfig, initialChartConfig, queryParams)),
            palette,
            onApiCreated,
        },
        uiOverrides: {
            ChartSettingsTabs,
        },
    });
    const ChartReactComponent = createElement(IconsRenderContext.Provider, {
        value: {
            ...DEFAULT_ICONS_RENDER_CONTEXT,
            svgShapeRendering,
        },
    }, ChartReactWidget);
    root.render(ChartReactComponent);
};
const destroy = () => {
    chartReactApi?.internal?.destroy();
    root?.unmount();
};
/**
 * @doc-tags chart-widget,api
 */
window['DXChart'] = {
    ...window['DXChart'],
    createWidget,
    destroy,
};
const getQueryParams = () => {
    const url = new URL(window.location.href);
    // configurable props
    const result = {};
    const iterator = url.searchParams.keys();
    iteratorForEach(iterator, key => (result[key] = url.searchParams.get(key)));
    return result;
};
const DEFAULT_WIDGET_CHART_REACT_CONFIG = {
    ...DEFAULT_INIT_CHART_REACT_CONFIG,
    layout: {
        ...DEFAULT_INIT_CHART_REACT_CONFIG.layout,
        enabled: false,
    },
    dataExport: {
        ...DEFAULT_INIT_CHART_REACT_CONFIG.dataExport,
        enabled: false,
    },
    multiChart: {
        enabled: false,
    },
    studyTemplates: {
        ...DEFAULT_INIT_CHART_REACT_CONFIG.studyTemplates,
        enabled: false,
    },
};
const mergeChartReactConfigWithWidgetProperties = (settings, config) => {
    const { toolbarEnabled, sidebarEnabled, yAxisEnabled, instrumentSuggestEnabled, instrumentSuggestVisible, studyTemplatesEnabled, dataExportEnabled, tradingEnabled, layoutEnabled, customPeriodInputEnabled, timeframePresetsMode, extendedHoursEnabled, sessionBreaksEnabled, priceTypeEnabled, candlesAlignmentEnabled, } = settings;
    let fixedSize = undefined;
    if (settings.width !== undefined && settings.height !== undefined) {
        fixedSize = {
            width: settings.width,
            height: settings.height,
        };
    }
    return {
        ...config,
        studies: {
            ...config.studies,
            dxScriptEnabled: false,
        },
        toolbar: {
            ...config.toolbar,
            enabled: toolbarEnabled ?? config?.toolbar?.enabled,
        },
        drawings: {
            ...config.drawings,
            sidebar: {
                enabled: sidebarEnabled ?? config?.drawings?.sidebar?.enabled,
            },
        },
        yAxisControls: {
            ...config.yAxisControls,
            enabled: yAxisEnabled ?? config?.yAxisControls?.enabled,
        },
        instrumentSuggest: {
            ...config.instrumentSuggest,
            visible: instrumentSuggestVisible ?? config?.instrumentSuggest?.visible,
            enabled: instrumentSuggestEnabled ?? config?.instrumentSuggest?.enabled,
        },
        studyTemplates: {
            ...config.studyTemplates,
            enabled: studyTemplatesEnabled ?? config?.studyTemplates?.enabled,
        },
        multiChart: {
            ...config.multiChart,
        },
        dataExport: {
            ...config.dataExport,
            enabled: dataExportEnabled ?? config?.dataExport?.enabled,
        },
        trading: {
            ...config.trading,
            enabled: tradingEnabled ?? config?.trading?.enabled,
        },
        customPeriodInput: {
            ...config.customPeriodInput,
            enabled: customPeriodInputEnabled ?? config?.customPeriodInput?.enabled ?? false,
        },
        timeframePresets: {
            ...config.timeframePresets,
            mode: timeframePresetsMode ?? config?.timeframePresets?.mode,
        },
        fixedSize,
        layout: {
            ...config.layout,
            enabled: layoutEnabled ?? config?.layout?.enabled,
        },
        chartDataOptionsSettings: {
            ...config.chartDataOptionsSettings,
            sessionBreaks: {
                ...config.chartDataOptionsSettings?.sessionBreaks,
                enabled: sessionBreaksEnabled ?? config?.chartDataOptionsSettings?.sessionBreaks?.enabled,
            },
            extendedHours: {
                ...config.chartDataOptionsSettings?.extendedHours,
                enabled: extendedHoursEnabled ?? config?.chartDataOptionsSettings?.extendedHours?.enabled,
            },
            priceType: {
                ...config.chartDataOptionsSettings?.priceType,
                enabled: priceTypeEnabled ?? config?.chartDataOptionsSettings?.priceType?.enabled,
            },
            candlesAlignment: {
                ...config.chartDataOptionsSettings?.candlesAlignment,
                enabled: candlesAlignmentEnabled ?? config?.chartDataOptionsSettings?.candlesAlignment?.enabled,
            },
            maxCandlesCount: config.chartDataOptionsSettings?.maxCandlesCount
        },
    };
};
const mergeChartCoreConfigWithWidgetProperties = (settings, config) => {
    const { navigationMapEnabled, xAxisEnabled, yAxisEnabled } = settings;
    return {
        ...config,
        components: {
            ...config.components,
            yAxis: {
                ...config.components?.yAxis,
                visible: yAxisEnabled ?? config.components?.yAxis?.visible,
            },
            xAxis: {
                ...config.components?.xAxis,
                visible: xAxisEnabled ?? config.components?.xAxis?.visible,
            },
            navigationMap: {
                ...config.components?.navigationMap,
                visible: navigationMapEnabled ?? config.components?.navigationMap?.visible,
            },
        },
    };
};
const getInstrumentAndAggregation = (options) => {
    const initialInstrument = options.symbol;
    const initialAggregation = pipe(option.fromNullable(options.period), option.chain(stringToAggregationPeriodSafe), option.toUndefined);
    return { initialInstrument, initialAggregation };
};
const fetchScript = (url) => new Promise(resolve => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    document.head.appendChild(script);
    script.onload = () => resolve(undefined);
});
const processDxFeedProvidersOptions = async (options) => {
    const providers = {};
    const IPF_URL = 'https://webdev.prosp.devexperts.com:8095/widget/symbol-suggest/en.txt';
    const IPF_USERNAME = 'test';
    const IPF_PASSWORD = 'test';
    const NEWS_URL = '/news-demo';
    const NEWS_USERNAME = 'demo';
    const NEWS_PASSWORD = 'demo';
    await fetchScript(`${SCRIPTS_URL}/symbolSuggest.provider.js`);
    const ipfConfig = {
        username: options.ipfUsername || IPF_USERNAME,
        password: options.ipfPassword || IPF_PASSWORD,
        ipfURL: options.ipfURL || IPF_URL,
    };
    //@ts-ignore
    providers.symbolSuggestProvider = Providers.symbolSuggest.createDxFeedIpfSymbolSuggestProvider(ipfConfig);
    if (options.dxFeedURL) {
        await fetchScript(`${SCRIPTS_URL}/chartData.provider.js`);
        const config = {
            endpointUrl: options.dxFeedURL,
            authToken: options.dxFeedToken,
        };
        //@ts-ignore
        providers.chartDataProvider = Providers.chartData.createDxFeedProviderWithAdapter(config);
    }
    // TODO fix, widget is broken with news
    await fetchScript(`${SCRIPTS_URL}/newsData.provider.js`);
    const newsConfig = {
        newsURL: options.newsURL ?? NEWS_URL,
        username: options.newsUsername ?? NEWS_USERNAME,
        password: options.newsPassword ?? NEWS_PASSWORD,
    };
    //@ts-ignore
    providers.newsDataProvider = await Providers.newsData.createDxFeedNewsDataProvider(newsConfig);
    return providers;
};
const mergeDependenciesWithQueryParams = async (props, chartReactConfig, chartConfig, queryParams) => {
    // props
    // @ts-ignore
    const initialChartType = queryParams.chartType ?? props.chartType ?? 'candle';
    const initialChartTheme = (queryParams.chartTheme ?? props.chartTheme) === 'light' ? 'light' : DEFAULT_THEME;
    const initialStudies = option.toUndefined(getQueryParam('studies'))?.split(',') ?? props.studies;
    const parseNumber = (value) => pipe(option.fromNullable(queryParams[`${value}`] ?? props[`${value}`]), option.map(parseInt), option.chain(n => (isNaN(n) ? none : some(n))), option.toUndefined);
    const height = parseNumber('height');
    const width = parseNumber('width');
    let fixedSize = undefined;
    if (width !== undefined && height !== undefined) {
        fixedSize = {
            width,
            height,
        };
    }
    // chart react
    const toolbarEnabled = parseBoolean(queryParams.toolbarEnabled ?? chartReactConfig.toolbar?.enabled);
    const sidebarEnabled = parseBoolean(queryParams.sidebarEnabled ?? chartReactConfig.drawings?.sidebar?.enabled);
    const instrumentSuggestEnabled = parseBoolean(queryParams.instrumentSuggestEnabled ?? chartReactConfig.instrumentSuggest?.enabled);
    const instrumentSuggestVisible = parseBoolean(queryParams.instrumentSuggestVisible ?? chartReactConfig.instrumentSuggest?.visible);
    // chart core
    const xAxisEnabled = parseBoolean(queryParams.xAxisEnabled ?? chartConfig.components?.xAxis?.visible);
    const yAxisEnabled = parseBoolean(queryParams.yAxisEnabled ?? chartConfig.components?.yAxis?.visible);
    const navigationMapEnabled = parseBoolean(queryParams.navigationMapEnabled ?? chartConfig.components?.navigationMap?.visible);
    // dxFeed providers
    const providers = await processDxFeedProvidersOptions(merge(props, queryParams, { addIfMissing: true, overrideExisting: true }));
    return {
        initialStudies,
        initialChartTheme,
        chartReactConfig: {
            ...chartReactConfig,
            toolbar: { ...chartReactConfig.toolbar, enabled: toolbarEnabled },
            drawings: {
                ...chartReactConfig.drawings,
                sidebar: { ...chartReactConfig.drawings?.sidebar, enabled: sidebarEnabled },
            },
            instrumentSuggest: {
                ...chartReactConfig.instrumentSuggest,
                enabled: instrumentSuggestEnabled,
                visible: instrumentSuggestVisible,
            },
            fixedSize,
        },
        initialChartConfig: {
            ...chartConfig,
            components: {
                ...chartConfig.components,
                xAxis: { ...chartConfig.components?.xAxis, visible: xAxisEnabled },
                yAxis: { ...chartConfig.components?.yAxis, visible: yAxisEnabled },
                navigationMap: { ...chartConfig.components?.navigationMap, visible: navigationMapEnabled },
            },
        },
        ...providers,
        chartTypesConfig: { initialChartType },
    };
};
const getLayoutProvider = (options, dependencies) => {
    const layoutProvider = options.useLocalStorageForLayout
        ? createLocalStorageLayoutProvider()
        : dependencies?.layoutProvider;
    return { layoutProvider };
};
