export declare const raf: <F extends Function>(cb: F) => F & {
    cancel: () => void;
};
