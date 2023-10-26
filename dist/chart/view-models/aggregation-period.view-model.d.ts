import { either } from 'fp-ts';
import { Subject } from 'rxjs';
import { Property } from '../../utils/property.utils';
import { AggregationPeriod } from '../model/aggregation.model';
import { ActionsHistoryVM } from './actions/actions-history.vm';
import { UnsubscribeCallback } from './api/chart-react-api.view-model';
import { MultiChartViewModel } from './multi-chart.view-model';
import { UserDataViewModel } from './user-data.view-model';
import { ValidationError } from './utils/validators';
import { Localization } from '../../config/localization/localization';
import { Sink } from '../../utils/sink';
export interface AggregationPeriodViewModel {
    allPeriods: Property<AggregationPeriod[]>;
    selectedPeriod: Property<AggregationPeriod>;
    onPeriodChanged: (callback: (chartId: string, period: AggregationPeriod) => void) => UnsubscribeCallback;
    /**
     * TODO HACK, think how we can manage order of two effects in separate VMs
     * Sometimes we need to react if period was changed explicitly by user (not programmatically)
     */
    selectedByUserPeriod: Subject<AggregationPeriod>;
    setAllPeriods: (aggregationPeriods: AggregationPeriod[]) => void;
    addRawPeriod: (period: string) => either.Either<ValidationError, void>;
    addPeriod: (period: AggregationPeriod) => either.Either<ValidationError, void>;
    removePeriod: (period: AggregationPeriod) => void;
    changeAggregationPeriod: (type: AggregationPeriod) => void;
    setAggregationRestrictionRule: (rule: (aggregation: AggregationPeriod) => boolean) => void;
}
export declare const createAggregationPeriodViewModel: import("../../context/context2").Context<Record<"userDataViewModel", UserDataViewModel> & Record<"multiChartViewModel", MultiChartViewModel> & Record<"actionsHistoryVM", ActionsHistoryVM> & Record<"initialAggregationPeriod", AggregationPeriod> & Record<"localization", Localization> & Record<"chartId", string>, Sink<AggregationPeriodViewModel>>;
