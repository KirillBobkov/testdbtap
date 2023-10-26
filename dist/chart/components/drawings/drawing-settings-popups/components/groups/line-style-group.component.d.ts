import { ReactNode } from 'react';
import { DrawingModel } from '@dx-private/dxchart5-modules/dist/drawings/model/drawing.model';
import { ControlProps } from '../../../../../../chart-kit/Control/Control';
type LineStyleGroupConsumers = 'fibonacci_channel' | 'fibonacci_projection' | 'fibonacci_retracements' | 'fibonacci_rays' | 'fibonacci_ark' | 'fibonacci_circles' | 'fibonacci_time_zones' | 'fibonacci_time_extension' | 'fibonacci_time_ratios' | 'elliott_correction_wave' | 'elliott_wave' | 'pitchfork' | 'price_range' | 'date_range' | 'date_price_range' | 'line' | 'arrow' | 'extended_line' | 'info_line' | 'ray' | 'rectangle' | 'ellipse' | 'curve' | 'brush' | 'arc' | 'vertical_arrow_up' | 'trend_channel' | 'vertical_line' | 'horizontal_line' | 'path' | 'horizontal_ray' | 'vertical_arrow_down' | 'gann_fan' | 'fibonacci_spiral' | 'cycle_brackets';
export interface LineStyleGroupProps<T extends LineStyleGroupConsumers> extends ControlProps<DrawingModel<T>> {
    readonly palette: string[];
    readonly leadingLabel?: string;
    readonly className?: string;
    readonly children?: ReactNode;
}
declare function LineStyleGroupSettings<T extends LineStyleGroupConsumers>(props: LineStyleGroupProps<T>): JSX.Element;
export declare const LineStyleGroup: typeof LineStyleGroupSettings;
export {};
