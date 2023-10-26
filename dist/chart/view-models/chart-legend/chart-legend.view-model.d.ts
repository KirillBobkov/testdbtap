/// <reference types="react" />
import { Point } from '@devexperts/dxcharts-lite/dist/chart/inputlisteners/canvas-input-listener.component';
import { CandleSeriesModel, PriceMovement } from '@devexperts/dxcharts-lite/dist/chart/model/candle-series.model';
import { DataSeriesType } from '@devexperts/dxcharts-lite/dist/chart/model/data-series.config';
import { HoverStudySeries } from '@dx-private/dxchart5-modules/dist/studies/model/studies-hover';
import { Option } from 'fp-ts/Option';
import { Observable, Subject } from 'rxjs';
import { ChartReactConfig } from '../../../config/chart-react-config';
import { Sink } from '../../../context/sink2';
import { Property } from '../../../utils/property.utils';
import { ChartWithModules } from '../../components/canvas-chart-renderer/chart-with-modules';
import { Instrument } from '../../model/instrument.model';
import { AggregationPeriodViewModel } from '../aggregation-period.view-model';
import { ChartConfiguratorViewModel } from '../chart-configurator.view-model';
import { ChartDataViewModel } from '../data/chart-data.view-model';
import { ChartTypeViewModel } from '../chart-type.view-model';
import { CompareChartViewModel, CompareInstrumentConfig } from '../data/compare-chart.view-model';
import { StudiesSettingsViewModel } from '../studies/studies-settings.view-model';
export interface ChartLegendSecondarySeriesModel {
    readonly id: string;
    readonly symbol: Instrument['symbol'];
    readonly price: string;
    readonly chartType: DataSeriesType;
    readonly color: string;
}
export interface ChartLegendMainSeriesModel {
    readonly open: string;
    readonly close: string;
    readonly high: string;
    readonly low: string;
    readonly time: string;
    readonly timestamp: string;
    readonly direction: PriceMovement;
    readonly volume: Option<string>;
}
export interface ChartLegendSeriesState {
    readonly mainSeries: ChartLegendMainSeriesModel;
    readonly secondarySeries: ChartLegendSecondarySeriesModel[];
    readonly stackedStudiesSeries: HoverStudySeries[];
    readonly separateStudiesSeries: HoverStudySeries[];
    readonly volume: Option<string>;
}
export interface ChartLegendViewModelState {
    readonly series: ChartLegendSeriesState;
}
export interface ConfigOHLC {
    O: boolean;
    H: boolean;
    L: boolean;
    C: boolean;
}
export interface ChartLegendViewModel {
    readonly state: Property<ChartLegendViewModelState>;
    readonly selectedSeries: Property<Option<string>>;
    readonly popupPosition: Observable<Point>;
    readonly legendPosition: Observable<Point>;
    readonly showStudies: Property<boolean>;
    readonly showMainLegendVolumes: Property<boolean>;
    readonly showSeparateLegendVolumes: Property<boolean>;
    readonly uuidFromRightClick: Observable<string>;
    readonly configOHLC: Property<ConfigOHLC>;
    readonly onCloseSeriesPopup: () => void;
    readonly onUpdateSeries: (series: ChartLegendSecondarySeriesModel) => void;
    readonly onDeleteSeries: (series: ChartLegendSecondarySeriesModel) => void;
    readonly onOpenSeries: (id: string) => void;
    readonly onDeleteStudySeries: (uuid: string) => void;
    readonly setShowStudies: (show: boolean) => void;
    readonly setShowSecondarySeries: (show: boolean) => void;
    readonly setShowStudiesSeparately: (show: boolean) => void;
    readonly setOpenedValue: (opened: boolean) => void;
    readonly contextMenuSubject: Subject<React.MouseEvent<HTMLDivElement, MouseEvent>>;
}
export interface CreateChartLegendViewModelInputType {
    readonly showVolumes?: boolean;
    readonly showStudies?: boolean;
    readonly showSecondarySeries?: boolean;
    readonly showStudiesSeparately?: boolean;
}
export interface CreateChartLegendViewModel {
    (chartId: string, initial?: CreateChartLegendViewModelInputType): Sink<ChartLegendViewModel>;
}
export declare const initialMainSeriesModel: ChartLegendMainSeriesModel;
export declare const DEFAULT_OHLC: {
    O: boolean;
    H: boolean;
    L: boolean;
    C: boolean;
};
export declare const createChartLegendViewModel: import("../../../context/context2").Context<Record<"chartDataViewModel", ChartDataViewModel> & Record<"compareChartViewModel", CompareChartViewModel> & Record<"chartConfiguratorViewModel", ChartConfiguratorViewModel> & Record<"studiesSettingsViewModel", StudiesSettingsViewModel> & Record<"chartTypeViewModel", ChartTypeViewModel> & Record<"chart", ChartWithModules> & Record<"aggregationPeriodViewModel", AggregationPeriodViewModel> & Record<"chartReactConfig", ChartReactConfig>, Sink<ChartLegendViewModel>>;
export declare const fromCompareInstrumentToChartLegendSeriesModel: (compareInstrument: CompareInstrumentConfig, series?: CandleSeriesModel) => ChartLegendSecondarySeriesModel;
