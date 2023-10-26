import { DrawingModel } from '@dx-private/dxchart5-modules/dist/drawings/model/drawing.model';
import { ControlProps } from '../../../../../../chart-kit/Control/Control';
import { DrawingsDictionary } from '../../../../../../config/localization/drawings';
type TopBorderGroupConsumers = 'price_range';
export interface TopBorderGroupProps<T extends TopBorderGroupConsumers> extends ControlProps<DrawingModel<T>> {
    readonly drawingsDict: DrawingsDictionary;
    readonly palette: string[];
}
declare function TopBorderGroupSettings<T extends TopBorderGroupConsumers>(props: TopBorderGroupProps<T>): JSX.Element;
export declare const TopBorderGroup: typeof TopBorderGroupSettings;
export {};
