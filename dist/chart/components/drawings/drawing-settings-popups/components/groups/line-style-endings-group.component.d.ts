import { ControlProps } from '../../../../../../chart-kit/Control/Control';
import { DrawingModel } from '@dx-private/dxchart5-modules/dist/drawings/model/drawing.model';
import { DrawingsDictionary } from '../../../../../../config/localization/drawings';
import { ReactNode } from 'react';
type LineStyleGroupLineEndingsConsumers = 'line' | 'arrow' | 'extended_line' | 'info_line' | 'ray' | 'path' | 'brush';
export interface LineStyleGroupLineEndingsProps<T extends LineStyleGroupLineEndingsConsumers> extends ControlProps<DrawingModel<T>> {
    readonly drawingsDict: DrawingsDictionary;
    readonly palette: string[];
    readonly children?: ReactNode;
}
declare function LineStyleGroupLineEndingsSettings<T extends LineStyleGroupLineEndingsConsumers>(props: LineStyleGroupLineEndingsProps<T>): JSX.Element;
export declare const LineStyleLineEndingsGroup: typeof LineStyleGroupLineEndingsSettings;
export {};
