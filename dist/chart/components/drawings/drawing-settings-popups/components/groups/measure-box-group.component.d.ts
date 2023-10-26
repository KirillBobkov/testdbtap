import { DrawingsDictionary } from '../../../../../../config/localization/drawings';
import { ControlProps } from '../../../../../../chart-kit/Control/Control';
import { DrawingModel } from '@dx-private/dxchart5-modules/dist/drawings/model/drawing.model';
type MeasureBoxConsumers = 'line' | 'arrow' | 'extended_line' | 'info_line' | 'ray';
export interface MeasureBoxGroupProperties<T extends MeasureBoxConsumers> extends Pick<ControlProps<DrawingModel<T>>, 'value' | 'onValueChange'> {
    drawingsDict: DrawingsDictionary;
    className?: string;
}
declare function MeasureBoxSettings<T extends MeasureBoxConsumers>(props: MeasureBoxGroupProperties<T>): JSX.Element;
export declare const MeasureBoxGroup: typeof MeasureBoxSettings;
export {};
