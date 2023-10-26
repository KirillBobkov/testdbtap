import { DrawingModel } from '@dx-private/dxchart5-modules/dist/drawings/model/drawing.model';
import { ControlProps } from '../../../../../../chart-kit/Control/Control';
type ElliotDegreeGroupConsumers = 'elliott_correction_wave' | 'elliott_wave';
export interface ElliotDegreeGroupProps<T extends ElliotDegreeGroupConsumers> extends ControlProps<DrawingModel<T>> {
}
declare function ElliotDegreeGroupSettings<T extends ElliotDegreeGroupConsumers>(props: ElliotDegreeGroupProps<T>): JSX.Element;
export declare const ElliotDegreeGroup: typeof ElliotDegreeGroupSettings;
export {};
