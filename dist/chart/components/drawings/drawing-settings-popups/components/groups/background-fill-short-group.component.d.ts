import { DrawingModel } from '@dx-private/dxchart5-modules/dist/drawings/model/drawing.model';
import { ControlProps } from '../../../../../../chart-kit/Control/Control';
import { DrawingsDictionary } from '../../../../../../config/localization/drawings';
type BackgroundFillShortGroupConsumers = 'fibonacci_channel' | 'fibonacci_projection' | 'fibonacci_retracements' | 'fibonacci_rays' | 'fibonacci_ark' | 'fibonacci_circles' | 'fibonacci_time_zones' | 'fibonacci_time_extension' | 'fibonacci_time_ratios' | 'pitchfork' | 'gann_box' | 'gann_fan' | 'gann_square';
export interface BackgroundFillShortGroupProps<T extends BackgroundFillShortGroupConsumers> extends ControlProps<DrawingModel<T>> {
    readonly drawingsDict: DrawingsDictionary;
}
declare function BackgroundFillShortGroupSettings<T extends BackgroundFillShortGroupConsumers>(props: BackgroundFillShortGroupProps<T>): JSX.Element;
export declare const BackgroundFillShortGroup: typeof BackgroundFillShortGroupSettings;
export {};
