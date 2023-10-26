import { option } from 'fp-ts';
import React, { memo, useContext } from 'react';
import { TEST_IDS } from '../../../config/e2e/test-ids';
import { periodToString } from '../../model/aggregation.model';
import { MultiChartComponentContext } from '../multi-chart/multi-chart-context';
import { RedispatchToChart } from '../redispatch-to-chart/redispatch-to-chart.component';
import { ChartLegendContainerStyled, ChartLegendFlowContainerStyled, ChartLegendHorizontalContainerStyled, ChartLegendSeparateVolumeStyled, } from './chart-legend.styled';
import { ChartLegendItem } from './components/chart-legend-item.component';
import { ChartLegendSecondarySeriesItem } from './components/chart-legend-secondary-series.component';
import { ChartLegendSeparateStudies } from './components/chart-legend-separate-studies.component';
import { ChartLegendSeriesGroup } from './components/chart-legend-series-group.component';
import { ChartLegendSeriesStackedStudyGroup } from './components/chart-legend-series-stacked-study-group.component';
import { ChartLegendSeriesSingleStudyGroup } from './components/chart-legend-single-line-group.component';
import { ChartLegendStackedStudyItem } from './components/chart-legend-stacked-study-item.component';
import { ChartLegendSwitcher } from './components/chart-legend-switcher/chart-legend-switcher.component';
export const ChartLegend = memo(props => {
    const { selectedSeries, popupPosition, period, onCloseSeries, onDeleteSeries, onDeleteStudySeries, onOpenSeries, onOpenedChange, onContextMenu, showStudies, isOpened, showMainLegendVolumes, showSeparateLegendVolumes, domMutationProps, id, chart, config, mainInstrumentSymbol, studiesSettingsProps, Header, 
    // data menu props
    selectedSeriesDataMenu, onChangeSeriesColor, onChangeSeriesChartType, onSeriesReorder, } = props;
    const { localization } = useContext(MultiChartComponentContext);
    const selectedSeriesId = option.toUndefined(selectedSeries);
    const isEmpty = !config.showOHLC &&
        !showMainLegendVolumes &&
        domMutationProps.secondarySeries.length === 0 &&
        (!showStudies || domMutationProps.stackedStudySeries.length === 0);
    const instrumentString = config.showMainInstrument ? mainInstrumentSymbol : undefined;
    const periodString = config.showPeriod ? periodToString(period) : undefined;
    const checkAloneOHLCValue = (key) => Object.entries(config.configOHLC).filter(([configKey, value]) => value && key !== configKey).length === 0;
    return (React.createElement(React.Fragment, null,
        React.createElement(ChartLegendSwitcher, { id: id, instrument: instrumentString, period: periodString, isEmpty: isEmpty, isOpened: isOpened, setFitsContentRef: domMutationProps.container.setLegendFitsContent, setHeightRef: domMutationProps.container.setHeight, timeRef: domMutationProps.time, switcherRef: domMutationProps.container.switcherPositionRef, Header: Header, ariaLabel: localization.legend.a11y_legendSwitcher, onContextMenu: onContextMenu, onOpenedChange: onOpenedChange },
            React.createElement(RedispatchToChart, { blacklistOfEvents: ['onWheel', 'onMouseDown'], chart: chart },
                React.createElement(ChartLegendContainerStyled, { ref: domMutationProps.container.containerRef },
                    config.showOHLC && (React.createElement(React.Fragment, null,
                        React.createElement(ChartLegendHorizontalContainerStyled, null,
                            config.configOHLC.O && (React.createElement(ChartLegendItem, { name: checkAloneOHLCValue('O')
                                    ? localization.legend.fullOHLCNames.open
                                    : localization.legend.open, ChartLegendItemRef: domMutationProps.open })),
                            config.configOHLC.H && (React.createElement(ChartLegendItem, { name: checkAloneOHLCValue('H')
                                    ? localization.legend.fullOHLCNames.high
                                    : localization.legend.high, ChartLegendItemRef: domMutationProps.high }))),
                        React.createElement(ChartLegendHorizontalContainerStyled, null,
                            config.configOHLC.L && (React.createElement(ChartLegendItem, { name: checkAloneOHLCValue('L')
                                    ? localization.legend.fullOHLCNames.low
                                    : localization.legend.low, ChartLegendItemRef: domMutationProps.low })),
                            config.configOHLC.C && (React.createElement(ChartLegendItem, { name: checkAloneOHLCValue('C')
                                    ? localization.legend.fullOHLCNames.close
                                    : localization.legend.close, ChartLegendItemRef: domMutationProps.close }))))),
                    showMainLegendVolumes && (React.createElement(ChartLegendItem, { name: localization.legend.volume, ChartLegendItemRef: domMutationProps.mainVolume, valueColor: 'var(--main_chart_candle_bear_body_bg)' })),
                    showStudies &&
                        domMutationProps.stackedStudySeries.map(({ title, lines, uuid }) => {
                            if (lines.length === 1) {
                                return (React.createElement(ChartLegendSeriesSingleStudyGroup, { key: uuid, uuid: uuid, line: lines[0], onDeleteStudySeries: onDeleteStudySeries, studiesSettingsProps: studiesSettingsProps }));
                            }
                            return (React.createElement(ChartLegendSeriesStackedStudyGroup, { title: title, key: uuid, uuid: uuid, onDeleteStudySeries: onDeleteStudySeries, studiesSettingsProps: studiesSettingsProps }, lines.map(line => (React.createElement(ChartLegendStackedStudyItem, { key: `${uuid}-${line.title}-key`, line: line })))));
                        }),
                    React.createElement(ChartLegendSeriesGroup, { title: localization.legend.compare }, domMutationProps.secondarySeries.map(series => {
                        return (React.createElement(ChartLegendSecondarySeriesItem, { popupPosition: popupPosition, onOpenSeries: onOpenSeries, isOpened: series.model.id === selectedSeriesId, onCloseSeries: onCloseSeries, key: series.model.symbol, series: series, onDeleteSeries: onDeleteSeries, palette: studiesSettingsProps.palette, testId: TEST_IDS.chart_legend_secondary_series_item, 
                            // data menu props
                            selectedSeries: selectedSeriesDataMenu, onChangeSeriesColor: onChangeSeriesColor, onChangeSeriesChartType: onChangeSeriesChartType, onSeriesReorder: onSeriesReorder }));
                    }))))),
        showStudies ? (React.createElement(React.Fragment, null, domMutationProps.separatedStudySeries.map(({ uuid, title, lines, ref }) => (React.createElement(ChartLegendFlowContainerStyled, { key: uuid, ref: ref },
            React.createElement(ChartLegendSeparateStudies, { uuid: uuid, title: title, lines: lines, onDeleteStudySeries: onDeleteStudySeries, studiesSettingsProps: studiesSettingsProps })))))) : null,
        showSeparateLegendVolumes ? (React.createElement(ChartLegendFlowContainerStyled, { ref: domMutationProps.separateVolume.containerRef },
            React.createElement(ChartLegendSeparateVolumeStyled, null,
                React.createElement(ChartLegendItem, { name: localization.legend.volume, ChartLegendItemRef: domMutationProps.separateVolume.valueRef, valueColor: 'var(--main_chart_candle_bear_body_bg)' })))) : null));
});
