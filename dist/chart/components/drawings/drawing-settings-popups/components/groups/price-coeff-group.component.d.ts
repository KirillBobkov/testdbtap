import { DrawingModel } from '@dx-private/dxchart5-modules/dist/drawings/model/drawing.model';
import { ControlProps } from '../../../../../../chart-kit/Control/Control';
import { DrawingsDictionary } from '../../../../../../config/localization/drawings';
type PriceCoeffGroupConsumers = 'fibonacci_channel' | 'fibonacci_projection' | 'fibonacci_retracements' | 'fibonacci_time_extension' | 'fibonacci_time_ratios';
export interface PriceCoeffGroupProps<T extends PriceCoeffGroupConsumers> extends ControlProps<DrawingModel<T>> {
    readonly className?: string;
    readonly drawingsDict: DrawingsDictionary;
}
declare function PriceCoeffGroupSettings<T extends PriceCoeffGroupConsumers>(props: PriceCoeffGroupProps<T>): JSX.Element;
export declare const PriceCoeffGroup: typeof PriceCoeffGroupSettings;
export {};
