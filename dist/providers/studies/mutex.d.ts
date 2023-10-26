export interface Mutex {
    lock: () => void;
    unlock: () => void;
    current: Promise<void>;
    locked: boolean;
}
export declare const createMutex: () => Mutex;
