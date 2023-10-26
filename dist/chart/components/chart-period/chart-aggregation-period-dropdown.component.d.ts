import { either } from 'fp-ts';
import { AggregationPeriod } from '../../model/aggregation.model';
import { ValidationError } from '../../view-models/utils/validators';
export interface ChartPeriodProps {
    readonly allPeriods: AggregationPeriod[];
    readonly addPeriod: (period: string) => either.Either<ValidationError, void>;
    readonly removePeriod: (period: AggregationPeriod) => void;
    readonly selectedPeriod: AggregationPeriod;
    readonly onPeriodSelect: (type: AggregationPeriod) => void;
}
export declare const ChartAggregationPeriodDropdown: (props: ChartPeriodProps) => JSX.Element;
