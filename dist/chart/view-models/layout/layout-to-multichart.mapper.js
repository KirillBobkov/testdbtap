import { cloneUnsafe } from '@devexperts/dxcharts-lite/dist/chart/utils/object.utils';
import { array, option } from 'fp-ts';
import { none } from 'fp-ts/Option';
import { constVoid, pipe } from 'fp-ts/function';
import { EMPTY, of } from 'rxjs';
import { context } from '../../../context/context2';
import { getQueryParam } from '../../../utils/url.utils';
import { stringToAggregationPeriodSafe } from '../../model/aggregation.model';
import { mapChartStudiesLayouts2TStudySetting, secondarySeriesToCompareInstruments, } from '../../model/layout.model';
import { DEFAULT_OFFSETS } from '../multi-chart.view-model';
export const chartLayout2MultiChartState = context.combine(context.key()('dxStudiesProvider'), context.key()('chartReactConfig'), context.key()('timezones'), (dxStudiesProvider, chartReactConfig, timezones) => layout => {
    const currentTimezone = timezones.currentTimezone;
    const defaultStudies = dxStudiesProvider.getStudies();
    // @ts-ignore
    const initialChartsInfo = pipe(layout.charts, array.map(chartLayout => {
        const symbol = option.toUndefined(getQueryParam('symbol')) ?? chartLayout.symbol;
        const aggregation = pipe(getQueryParam('period'), option.chain(period => stringToAggregationPeriodSafe(period)), option.getOrElse(() => chartLayout.aggregation));
        return chartLayout2ChartInfo(chartLayout, symbol, defaultStudies, aggregation);
    }));
    return {
        layout: chartReactConfig.multiChart.enabled ? layout.multiChart.layout : '1x1',
        lastChartType: initialChartsInfo[0].chartType,
        lastInstrument: initialChartsInfo[0].instrument,
        lastAggregationPeriodType: initialChartsInfo[0].period,
        lastGeneralSettings: initialChartsInfo[0].chartSettings,
        lastStudies: initialChartsInfo[0].studies,
        lastCompareInstruments: [],
        isInstrumentSyncEnabled: layout.multiChart.sync.instrument,
        isChartTypeSyncEnabled: layout.multiChart.sync.chartType,
        isAggregationPeriodTypeSyncEnabled: layout.multiChart.sync.aggregation,
        isCrosshairSyncEnabled: layout.multiChart.sync.crossTool,
        isGeneralSettingsSyncEnabled: layout.multiChart.sync.appearance,
        isStudiesSyncEnabled: layout.multiChart.sync.studies,
        isTimezoneSyncEnabled: true,
        lastTimezone: currentTimezone,
        highlightedChartId: none,
        charts: initialChartsInfo,
        maximizedChartId: none,
        offsets: DEFAULT_OFFSETS,
        drawingMode: layout.global.drawingMode,
        magnetMode: layout.global.magnetMode,
        theme: layout.global.theme,
    };
});
export const chartLayout2ChartInfo = (layout, instrument, defaultStudies, aggregation) => {
    return {
        id: layout.index + '',
        chartType: layout.chartType,
        instrument: option.fromNullable(instrument),
        period: aggregation,
        timeframePreset: layout.timeframePreset,
        extendedHours: layout.chartReactConfig.extendedHours.visible,
        chartSettings: {
            chartCore: cloneUnsafe(layout.chartCoreConfig),
            chartReact: cloneUnsafe(layout.chartReactConfig),
        },
        compareInstruments: cloneUnsafe(secondarySeriesToCompareInstruments(layout.secondarySeries)),
        studies: mapChartStudiesLayouts2TStudySetting(layout.studies, defaultStudies),
        drawings: layout.drawings,
        layers: layout.layers,
        panes: layout.panes,
        xScaleViewport: layout.xScaleViewport,
    };
};
/**
 * Creates mock instance of ChartBootstrap.
 * This is required for initial load of chart, when we don't have chart-core chunk yet.
 * @doc-tags tricky
 */
export const createMockchart = () => {
    const objHandler = {
        get: (target, prop) => {
            if (prop === 'bind') {
                return () => constVoid;
            }
            return new Proxy(() => EMPTY, objHandler);
        },
    };
    // @ts-ignore
    // eslint-disable-next-line no-restricted-syntax
    return new Proxy(() => of(), objHandler);
};
