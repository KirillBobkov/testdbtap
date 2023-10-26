import { LineStyleGroupProps } from './line-style-group.component';
import { DrawingsDictionary } from '../../../../../../config/localization/drawings';
type ElliotLineStyleGroupConsumers = 'elliott_correction_wave' | 'elliott_wave';
export interface ElliotLineStyleGroupProps<T extends ElliotLineStyleGroupConsumers> extends LineStyleGroupProps<T> {
    readonly drawingsDict: DrawingsDictionary;
}
declare function ElliotLineStyleGroupSettings<T extends ElliotLineStyleGroupConsumers>(props: ElliotLineStyleGroupProps<T>): JSX.Element;
export declare const ElliotLineStyleGroup: typeof ElliotLineStyleGroupSettings;
export {};
