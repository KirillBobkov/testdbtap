export declare const waitIdle: () => Promise<unknown>;
export declare const isReqIdleSupported: boolean;
export declare function isSafari(): boolean;
export declare const isBrowser: boolean;
declare global {
    interface Window {
        safari?: {
            pushNotification?: object;
        };
    }
}
