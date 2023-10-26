import { option } from 'fp-ts';
import { Option } from 'fp-ts/Option';
import { Observable } from 'rxjs';
import { ChartReactConfig } from '../../../config/chart-react-config';
import { Localization } from '../../../config/localization/localization';
import { CandleAlignment, ChartCandleData, PriceType, ServiceData } from '../../../providers/chart-data-provider';
import { Property } from '../../../utils/property.utils';
import { Sink } from '../../../utils/sink';
import { ChartWithModules } from '../../components/canvas-chart-renderer/chart-with-modules';
import { PartialInstrument } from '../../model/chart.model';
import { Instrument } from '../../model/instrument.model';
import { ChartServiceData, MultiChartDataService } from '../../services/multichart-data.service';
import { UtilityDataService } from '../../services/utility-data.service';
import { ActionsHistoryVM } from '../actions/actions-history.vm';
import { AggregationPeriodViewModel } from '../aggregation-period.view-model';
import { InstrumentSelectorViewModel } from '../instrument-selector.view-model';
import { DataLoaderVM } from '../loading/data-loader.vm';
import { InitialLoaderVM } from '../loading/initial-loader.vm';
import { MultiChartViewModel } from '../multi-chart.view-model';
import { NotificationViewModel } from '../notification.view-model';
export type CompareInstrumentsRecord = Record<Instrument['symbol'], PartialInstrument>;
export interface ChartDataViewModel {
    changeInstrument(instrument: Option<Instrument['symbol']>): void;
    /**
     * Loaded from IPF Instrument with filled fields
     */
    instrument: Property<Option<Instrument>>;
    /**
     * Selected instrument name, is available even if *instrument* is not loaded from IPF
     */
    selectedInstrument: Property<Option<Instrument['symbol']>>;
    addCompareInstrument(instrument: Instrument): void;
    addCompareInstrumentFromApi(instrument: string): void;
    removeCompareInstrument(instrument: Instrument['symbol']): void;
    setCompareInstruments(compareInstruments: CompareInstrumentsRecord): void;
    setCompareInstrumentsFromApi(compareInstruments: string[]): void;
    setExtendedHours(extendedHours: boolean): void;
    changePriceType(priceType: PriceType): void;
    changeCandlesAlignment(a: CandleAlignment): void;
    clearChartDataFromApi(): void;
    compareInstruments: Property<CompareInstrumentsRecord>;
    extendedHours: Property<boolean>;
    priceType: Property<PriceType>;
    candlesAlign: Property<CandleAlignment>;
    historicalCandlesUpdated: Observable<ChartCandleData[]>;
    lastCandleUpdated: Observable<ChartCandleData | undefined>;
    lazyHistoryData: Observable<ChartServiceData[]>;
    initialHistoryData: Observable<ChartServiceData[]>;
    serviceData: Property<ServiceData>;
}
export declare const createChartDataViewModel: import("../../../context/context2").Context<Record<"multiChartDataService", MultiChartDataService> & Record<"utilityDataService", UtilityDataService> & Record<"chart", ChartWithModules> & Record<"multiChartViewModel", MultiChartViewModel> & Record<"actionsHistoryVM", ActionsHistoryVM> & Record<"aggregationPeriodViewModel", AggregationPeriodViewModel> & Record<"chartReactConfig", ChartReactConfig> & Record<"instrumentSelectorViewModel", InstrumentSelectorViewModel> & Record<"dataLoaderVM", DataLoaderVM> & Record<"initialLoaderVM", InitialLoaderVM> & Record<"initialInstrument", option.Option<string>> & Record<"initialExtendedHours", boolean> & Record<"initialPriceType", "mark" | "last" | "bid" | "ask"> & Record<"chartId", string> & Record<"notificationVM", NotificationViewModel> & Record<"localization", Localization>, Sink<ChartDataViewModel>>;
export declare const instrumentNameOption: (instrument: Option<Instrument>) => Option<Instrument['symbol']>;
export declare const takeFirstAvailablePriceType: (priceTypes: ChartReactConfig['priceTypes']) => PriceType;
