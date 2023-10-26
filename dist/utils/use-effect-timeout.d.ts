/**
 * Fixes the async useEffect problem.
 * https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component
 * @param callbackFn
 * @param timeout
 */
export declare const useEffectTimeout: (callbackFn: () => void, timeout: number) => void;
