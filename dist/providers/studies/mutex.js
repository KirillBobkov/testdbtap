import { constVoid } from '@devexperts/dxcharts-lite/dist/chart/utils/function.utils';
export const createMutex = () => {
    const mutex = {
        locked: false,
        unlock: constVoid,
        current: Promise.resolve(),
        lock: () => {
            if (mutex.locked) {
                return;
            }
            mutex.current = new Promise(resolve => {
                mutex.unlock = () => {
                    mutex.locked = false;
                    resolve();
                };
            });
            mutex.locked = true;
        },
    };
    return mutex;
};
