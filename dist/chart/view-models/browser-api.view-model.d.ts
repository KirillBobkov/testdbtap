import { Property } from '../../utils/property.utils';
import { Sink } from '../../utils/sink';
export interface BrowserApiViewModel {
    isOnline: Property<boolean>;
}
/**
 * Controls that browser has internet.
 */
export declare const createBrowserApiViewModel: () => Sink<BrowserApiViewModel>;
