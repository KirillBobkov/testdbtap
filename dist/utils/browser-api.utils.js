export const waitIdle = () => new Promise(resolve => {
    // requestIdleCallback is not available in webworkers
    // @ts-ignore
    self.requestIdleCallback ? requestIdleCallback(resolve) : resolve(void 0);
});
export const isReqIdleSupported = typeof window !== 'undefined' && window.requestIdleCallback !== undefined;
export function isSafari() {
    return (typeof window !== 'undefined' &&
        (/constructor/i.test(window?.HTMLElement.toString()) ||
            window?.safari?.pushNotification?.toString() === '[object SafariRemoteNotification]'));
}
// currently, isReqIdleSupported is the best way which just works in shadow merges (nodeJS) and the browser, but it's not supported by Safari
export const isBrowser = isReqIdleSupported || isSafari();
