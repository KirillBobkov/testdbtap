import { mapFullChartConfig2ChartCoreConfig, } from './chart.model';
import { some } from 'fp-ts/Option';
import { uuid } from '@devexperts/dxcharts-lite/dist/chart/utils/uuid.utils';
import { pipe } from 'fp-ts/function';
import { array, option } from 'fp-ts';
import { CHART_VERSION } from '../../version';
export const INITIAL_INSTRUMENT = 'AAPL';
export const DEFAULT_LAYOUT_NAME = 'Default Layout';
export const RETRY_SAVE_LAYOUT = 5;
export const mapTStudySettings2ChartStudiesLayout = (studies) => {
    const defaultStudyLineType = 'LINEAR';
    return studies.map(study => ({
        lines: study.lines.map(line => ({
            title: option.getOrElse(() => '')(line.title),
            studyLineType: option.getOrElse(() => defaultStudyLineType)(line.studyLineType),
            thickness: option.getOrElse(() => 0)(line.thickness),
            colors: option.getOrElse(() => [''])(line.colors),
            visible: option.getOrElse(() => false)(line.visible),
        })),
        overlaying: study.overlaying,
        parameters: study.parameters.map(param => ({
            id: param.id,
            studyParamType: param.studyParamType,
            value: option.getOrElse(() => '')(param.value),
        })),
        id: study.id,
        uuid: study.uuid,
    }));
};
export const mapChartStudiesLayouts2TStudySetting = (studies, defaultStudies) => {
    const mergedStudies = [];
    studies.forEach(study => {
        const defaultStudy = defaultStudies.find(st => st.id === study.id);
        if (defaultStudy) {
            mergedStudies.push({
                ...defaultStudy,
                lines: study.lines?.map((line) => ({
                    title: some(line.title),
                    studyLineType: some(line.studyLineType),
                    thickness: some(line.thickness),
                    colors: some(line.colors),
                    visible: some(line.visible),
                })) ?? defaultStudy.lines,
                parameters: study.parameters?.map((param) => ({
                    id: param.id,
                    value: some(param.value),
                    visible: some(true),
                    studyParamType: param.studyParamType,
                    validation: pipe(defaultStudy.parameters, array.findFirst(defaultParameter => defaultParameter.id === param.id), option.chain(p => p.validation)),
                })) ?? defaultStudy.parameters,
                overlaying: study.overlaying ?? defaultStudy.overlaying,
                uuid: study.uuid ?? study.id,
            });
        }
        else {
            console.warn(`Couldn't find a study with id ${study.id}`);
        }
    });
    return mergedStudies;
};
export const createMockLayoutData = (config, chartReactConfig, initialChartReactSettings, instrument) => {
    return {
        selectedLayoutId: '0',
        layouts: [
            {
                id: '0',
                name: 'EmptyLayout',
                lastUpdateTimeStamp: new Date().getTime(),
                ...createDefaultLayout(instrument, { duration: 1, durationType: 'h' }, undefined, config, chartReactConfig, initialChartReactSettings),
            },
        ],
    };
};
export const createDefaultLayout = (instrument, aggregation, timeframePreset, config, chartReactConfig, initialChartReactSettings, initialStudies = [], initialChartType = 'candle') => {
    return {
        version: CHART_VERSION,
        global: {
            drawingMode: false,
            magnetMode: false,
            drawingSyncMode: false,
            theme: 'dark',
        },
        multiChart: {
            layout: '1x1',
            selectedChartIndex: '0',
            sync: {
                crossTool: false,
                instrument: false,
                chartType: false,
                aggregation: false,
                appearance: false,
                studies: false,
            },
        },
        charts: chartReactConfig.multiChart.enabled
            ? [
                createDefaultChartLayout(0, instrument, aggregation, timeframePreset, config, initialStudies, initialChartType, initialChartReactSettings),
                createDefaultChartLayout(1, instrument, aggregation, timeframePreset, config, initialStudies, initialChartType, initialChartReactSettings),
                createDefaultChartLayout(2, instrument, aggregation, timeframePreset, config, initialStudies, initialChartType, initialChartReactSettings),
                createDefaultChartLayout(3, instrument, aggregation, timeframePreset, config, initialStudies, initialChartType, initialChartReactSettings),
            ]
            : [
                createDefaultChartLayout(0, instrument, aggregation, timeframePreset, config, initialStudies, initialChartType, initialChartReactSettings),
            ],
    };
};
export const createDefaultChartLayout = (index, instrument, aggregation, timeframePreset, config, initialStudies, initialChartType, initialChartReactSettings) => {
    return {
        index,
        symbol: instrument,
        aggregation,
        timeframePreset,
        chartType: initialChartType,
        studies: initialStudies.map(id => ({ id, uuid: uuid() })),
        chartCoreConfig: mapFullChartConfig2ChartCoreConfig(config),
        chartReactConfig: {
            legend: {
                opened: initialChartReactSettings.legend.opened,
                showOHLC: initialChartReactSettings.legend.showOHLC,
                showVolume: initialChartReactSettings.legend.showVolume,
                showPeriod: initialChartReactSettings.legend.showPeriod,
                showInstrument: initialChartReactSettings.legend.showInstrument,
                mode: initialChartReactSettings.legend.mode,
            },
            timeframeChangeStrategy: {
                aggregations: initialChartReactSettings.timeframeChangeStrategy.aggregations,
                instrument: initialChartReactSettings.timeframeChangeStrategy.instrument,
            },
            aggregationPeriod: {
                applyUponCreation: initialChartReactSettings.aggregationPeriod.applyUponCreation,
            },
            sessionBreaks: {
                visible: initialChartReactSettings.sessionBreaks.visible,
            },
            extendedHours: {
                visible: initialChartReactSettings.extendedHours.visible,
            },
            trading: {
                visible: initialChartReactSettings.trading.visible,
                showOrders: initialChartReactSettings.trading.showOrders,
                showPositions: initialChartReactSettings.trading.showPositions,
                executedOrders: {
                    enabled: initialChartReactSettings.trading.executedOrders.enabled,
                    displayMode: initialChartReactSettings.trading.executedOrders.displayMode,
                },
                bounds: {
                    min: initialChartReactSettings.trading.bounds.min,
                    max: initialChartReactSettings.trading.bounds.max,
                },
                rightOffset: initialChartReactSettings.trading.rightOffset,
            },
            candlesData: {
                price: initialChartReactSettings.candlesData.price,
                candleAlignment: initialChartReactSettings.candlesData.candleAlignment,
            },
            scale: {
                fit: {
                    studies: initialChartReactSettings.scale.fit.studies,
                    orders: initialChartReactSettings.scale.fit.orders,
                    positions: initialChartReactSettings.scale.fit.positions,
                },
            },
        },
        secondarySeries: [],
        drawings: {},
        layers: {
            layerItems: {},
        },
        panes: {
            order: [],
            heightRatio: {},
        },
        xScaleViewport: {
            startTimestamp: 0,
            endTimestamp: 0,
        },
    };
};
export const compareInstrumentsToSecondarySeries = (compareInstruments) => pipe(compareInstruments, array.map(ci => ({
    symbol: ci.symbol,
    chartType: ci.chartType,
    color: ci.color,
})));
export const secondarySeriesToCompareInstruments = (secondarySeries) => pipe(secondarySeries, array.map(ss => ({
    chartType: ss.chartType,
    color: ss.color,
    symbol: ss.symbol,
})));
