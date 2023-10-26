import { LayoutProvider } from '../layout-provider';
interface LocalStorageLayoutProvider {
    expirationPeriod: number;
}
export declare const LAYOUTS_KEY = "layouts";
export declare const DEFAULT_EXPIRATION_PERIOD: number;
export declare const createLocalStorageLayoutProvider: (storageKey?: string, options?: LocalStorageLayoutProvider) => LayoutProvider;
export {};
