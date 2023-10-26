import { ReactNode } from 'react';
import { DrawingModel } from '@dx-private/dxchart5-modules/dist/drawings/model/drawing.model';
import { ControlProps } from '../../../../../../chart-kit/Control/Control';
import { DrawingsDictionary } from '../../../../../../config/localization/drawings';
type LabelsGroupConsumers = 'line' | 'arrow' | 'extended_line' | 'info_line' | 'ray';
export interface LabelsGroupProps<T extends LabelsGroupConsumers> extends ControlProps<DrawingModel<T>> {
    readonly drawingsDict: DrawingsDictionary;
    readonly children?: ReactNode;
}
declare function LabelsGroupSettings<T extends LabelsGroupConsumers>(props: LabelsGroupProps<T>): JSX.Element;
export declare const LabelsGroup: typeof LabelsGroupSettings;
export {};
