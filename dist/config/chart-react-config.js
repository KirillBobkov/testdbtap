import { DEFAULT_MERGE_OPTIONS, merge } from '@devexperts/dxcharts-lite/dist/chart/utils/merge.utils';
import { DEFAULT_DRAWING_GROUPS } from '../chart/model/drawing.model';
/**
 * Default config for ChartReactApp. Used when the app is being initialized. This config is static and can't be changed after initialization
 * @doc-tags chart-react,default-config
 */
export const DEFAULT_INIT_CHART_REACT_CONFIG = {
    toolbarMode: 'single',
    disableWorkers: false,
    themeControls: { enabled: true },
    layout: {
        saveDelay: 150,
        enabled: true,
    },
    studyTemplates: {
        enabled: true,
    },
    dataExport: {
        enabled: true,
    },
    multiChart: {
        enabled: true,
    },
    trading: {
        enabled: true,
        addNewOrderEnabled: true,
        showPriceAsLabels: false,
        rightOffset: 40,
        takeProfitStopLossEnabled: true,
        defaultOrderQuantity: 100,
        maxOrderQuantity: 1000,
        currency: '$',
        orderTypes: {
            market: true,
            limit: true,
            stop: true,
        },
    },
    studies: {
        maxSelectedStudiesCount: 10,
        dxScriptEnabled: true,
        addStudyButtonEnabled: false,
    },
    drawings: {
        drawingsList: DEFAULT_DRAWING_GROUPS,
        toolbar: {
            enabled: false,
        },
        sidebar: {
            enabled: true,
        },
        drawingGroups: {
            enabled: false,
        },
        limitOfDrawings: Number.MAX_SAFE_INTEGER,
    },
    toolbar: {
        enabled: true,
        showButtonsTooltip: true,
    },
    yAxisControls: {
        enabled: true,
    },
    instrumentSuggest: {
        visible: true,
        enabled: true,
    },
    actionsHistory: {
        undoKeyCode: 'KeyZ',
        redoKeyCode: 'KeyZ',
    },
    popups: {
        showOutside: true,
    },
    layers: {
        enabled: true,
    },
    timeframePresets: {
        mode: 'full',
    },
    customPeriodInput: {
        enabled: true,
    },
    chartDataOptionsSettings: {
        sessionBreaks: {
            enabled: true,
        },
        extendedHours: {
            enabled: true,
        },
        priceType: {
            enabled: true,
        },
        candlesAlignment: {
            enabled: true,
        },
        maxCandlesCount: Number.MAX_SAFE_INTEGER,
    },
    dataTimeout: 12000,
    priceTypes: ['last', 'mark', 'bid', 'ask'],
    shouldInitLayoutXScale: true,
    timezoneControls: {
        enabled: true,
    },
};
export function mergeChartReactConfig(config, defaultConfig = DEFAULT_INIT_CHART_REACT_CONFIG) {
    merge(config, defaultConfig, DEFAULT_MERGE_OPTIONS);
    // eslint-disable-next-line no-restricted-syntax
    return config;
}
