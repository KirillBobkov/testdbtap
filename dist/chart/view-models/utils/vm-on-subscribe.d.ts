/**
 * Executes a callback on subscription to this observable
 * Can be used in vm's effect to specify logic which should be executed on vm subscription
 * @param onSubscribe
 * @returns
 */
export declare const onSubscribe: (onSubscribe: () => void) => import("rxjs").Observable<never[]>;
