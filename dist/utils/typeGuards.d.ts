export declare function notEmpty<T>(value: T | null | undefined): value is T;
export declare function hasOwnProperty<X extends Record<string, any>, Y extends PropertyKey>(obj: X, prop: Y): obj is X & Record<Y, unknown>;
export declare function isEventWithComposedPath(event: Event): event is PointerEvent;
