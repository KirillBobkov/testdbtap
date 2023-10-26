import { DrawingModel } from '@dx-private/dxchart5-modules/dist/drawings/model/drawing.model';
import { ControlProps } from '../../../../../../chart-kit/Control/Control';
import { DrawingsDictionary } from '../../../../../../config/localization/drawings';
type FibLabelsGroupConsumers = 'fibonacci_channel' | 'fibonacci_projection' | 'fibonacci_retracements' | 'fibonacci_time_zones' | 'fibonacci_time_extension' | 'fibonacci_time_ratios';
export interface FibLabelsGroupProps<T extends FibLabelsGroupConsumers> extends ControlProps<DrawingModel<T>> {
    readonly drawingsDict: DrawingsDictionary;
}
declare function FibLabelsGroupSettings<T extends FibLabelsGroupConsumers>(props: FibLabelsGroupProps<T>): JSX.Element;
export declare const FibLabelsGroup: typeof FibLabelsGroupSettings;
export {};
