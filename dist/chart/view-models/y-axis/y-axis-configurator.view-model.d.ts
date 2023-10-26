import { FitType } from '@devexperts/dxcharts-lite/dist/chart/bootstrap';
import { YAxisAlign, YAxisLabels } from '@devexperts/dxcharts-lite/dist/chart/chart.config';
import { PriceAxisType } from '@devexperts/dxcharts-lite/dist/chart/components/labels_generator/numeric-axis-labels.generator';
import { Observable } from 'rxjs';
import { Sink } from '../../../context/sink2';
import { Property } from '../../../utils/property.utils';
import { PartialExcept } from '../../../utils/types';
import { ChartWithModules } from '../../components/canvas-chart-renderer/chart-with-modules';
import { AllYAxisLabelType, ChartSettings } from '../../model/chart.model';
import { ActionsHistoryVM } from '../actions/actions-history.vm';
import { ChartConfiguratorViewModel } from '../chart-configurator.view-model';
import { ChartDataViewModel } from '../data/chart-data.view-model';
import { MultiChartViewModel } from '../multi-chart.view-model';
import { FullChartCoreConfig } from '../../../config/chart-config';
type YAxisLabelList = PartialExcept<Record<AllYAxisLabelType, LabelMode>, 'lastPrice'>;
export interface YAxisLabelConfig {
    labels: YAxisLabelList;
    descriptions: boolean;
    countDownToBarClose: boolean;
}
export type LabelMode = 'none' | 'line' | 'label' | 'line-label';
export type LabelType = keyof YAxisLabelConfig['labels'];
export interface YAxisConfiguratorViewModel {
    config$: Observable<ChartSettings>;
    readonly yAxisWidth: Property<number>;
    readonly chartWidth: Property<number>;
    readonly yAxisAlign: Property<YAxisAlign>;
    defaultConfig: ChartSettings;
    onRestoreDefaultConfig: () => void;
    setAxisType: (type: PriceAxisType, undoable?: boolean) => void;
    labelsConfig: Property<YAxisLabelConfig>;
    setYAxisAlign: (align: YAxisAlign) => void;
    changeLabelMode: (type: LabelType, mode: LabelMode) => void;
    setDescription: (active: boolean) => void;
    setCountDownBarClose: (active: boolean) => void;
    togglePriceScaleInverse: () => void;
    toggleLockPriceToBarRatio: () => void;
    setLockPriceToBarRatio: (isLocked: boolean, undoable?: boolean) => void;
    setAutoScale: (active: boolean) => void;
    setPriceAxisFitType: (type: FitType, active: boolean) => void;
    togglePercentAxis: () => void;
    toggleLogAxis: () => void;
    setYAxisLabelsSettings: (oldLabelsConfig: YAxisLabelConfig, newLabelsConfig: YAxisLabelConfig) => void;
}
export declare const createYAxisConfiguratorViewModel: import("../../../context/context2").Context<Record<"chartConfiguratorViewModel", ChartConfiguratorViewModel> & Record<"actionsHistoryVM", ActionsHistoryVM> & Record<"chart", ChartWithModules> & Record<"multiChartViewModel", MultiChartViewModel> & Record<"chartDataViewModel", ChartDataViewModel> & Record<"initialGeneralSettings", ChartSettings> & Record<"chartId", string> & Record<"chartConfig", FullChartCoreConfig>, Sink<YAxisConfiguratorViewModel>>;
export declare function fromCoreChartSettingsToLocalLabelsConfig(chartSettings: ChartSettings, chartCoreYAxisLabelsConfig: YAxisLabels): YAxisLabelConfig;
export {};
