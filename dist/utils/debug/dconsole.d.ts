declare function errorLog(...args: any[]): void;
export declare const dconsole: {
    log: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    error: typeof errorLog;
};
export {};
