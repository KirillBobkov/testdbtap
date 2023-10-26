import { DrawingModel } from '@dx-private/dxchart5-modules/dist/drawings/model/drawing.model';
import { ControlProps } from '../../../../../../chart-kit/Control/Control';
import { DrawingsDictionary } from '../../../../../../config/localization/drawings';
type AllBordersGroupConsumers = 'date_price_range';
export interface AllBordersGroupProps<T extends AllBordersGroupConsumers> extends ControlProps<DrawingModel<T>> {
    readonly drawingsDict: DrawingsDictionary;
    readonly palette: string[];
}
declare function AllBordersGroupSettings<T extends AllBordersGroupConsumers>(props: AllBordersGroupProps<T>): JSX.Element;
export declare const AllBordersGroup: typeof AllBordersGroupSettings;
export {};
