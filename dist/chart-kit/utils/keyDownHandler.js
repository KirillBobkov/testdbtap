/**
 * TODO describe
 * @param handlers
 * @doc-tags utility,hotkeys
 */
export function createKeyDownHandler(...handlers) {
    const handlerObj = {};
    handlers.forEach(h => (handlerObj[h[0]] = h));
    return (e) => {
        const handler = handlerObj[e.code];
        if (handler) {
            const [, callback, opts] = handler;
            const ctrlKey = opts?.ctrlKey ?? false;
            const shiftKey = opts?.shiftKey ?? false;
            // metaKey is for Cmd MacOS compatibility
            (ctrlKey === e.ctrlKey || ctrlKey === e.metaKey) && e.shiftKey === shiftKey && callback(e);
        }
    };
}
