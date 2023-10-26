// eslint-disable-next-line @typescript-eslint/ban-types
export const raf = (cb) => {
    let id;
    const invoke = (ctx, args) => () => {
        id = undefined;
        cb.apply(ctx, args);
    };
    //use function to save original context
    function synced(...args) {
        if (typeof id === 'undefined') {
            id = requestAnimationFrame(invoke(this, args));
        }
    }
    synced['cancel'] = () => {
        if (id) {
            cancelAnimationFrame(id);
        }
    };
    // eslint-disable-next-line no-restricted-syntax
    return synced;
};
