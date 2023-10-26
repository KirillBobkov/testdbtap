import { DrawingModel } from '@dx-private/dxchart5-modules/dist/drawings/model/drawing.model';
import { ControlProps } from '../../../../../../chart-kit/Control/Control';
import { DrawingsDictionary } from '../../../../../../config/localization/drawings';
type RightBorderGroupConsumers = 'date_range';
export interface RightBorderGroupProps<T extends RightBorderGroupConsumers> extends ControlProps<DrawingModel<T>> {
    readonly drawingsDict: DrawingsDictionary;
    readonly palette: string[];
}
declare function RightBorderGroupSettings<T extends RightBorderGroupConsumers>(props: RightBorderGroupProps<T>): JSX.Element;
export declare const RightBorderGroup: typeof RightBorderGroupSettings;
export {};
