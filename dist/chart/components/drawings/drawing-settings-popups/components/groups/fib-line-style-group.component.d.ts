import { LineStyleGroupProps } from './line-style-group.component';
import { DrawingsDictionary } from '../../../../../../config/localization/drawings';
type FibLineStyleGroupConsumers = 'fibonacci_channel' | 'fibonacci_projection' | 'fibonacci_retracements' | 'fibonacci_rays' | 'fibonacci_ark' | 'fibonacci_circles' | 'fibonacci_time_zones' | 'fibonacci_time_extension' | 'fibonacci_time_ratios' | 'pitchfork' | 'gann_fan';
export interface FibLineStyleGroupProps<T extends FibLineStyleGroupConsumers> extends LineStyleGroupProps<T> {
    readonly drawingsDict: DrawingsDictionary;
    readonly applyToAll: () => void;
}
declare function FibLineStyleGroupSettings<T extends FibLineStyleGroupConsumers>(props: FibLineStyleGroupProps<T>): JSX.Element;
export declare const FibLineStyleGroup: typeof FibLineStyleGroupSettings;
export {};
