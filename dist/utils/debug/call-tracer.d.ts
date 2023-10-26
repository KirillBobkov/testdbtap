/**
 * Proxy for object that contains functions.
 * When function is called - proxy records the invocation to storage.
 * @param container - object's business meaning
 * @param obj - object to proxy
 * @doc-tags tricky,debug
 */
export declare function callTracerProxy<T extends object>(container: string, obj: T): T;
