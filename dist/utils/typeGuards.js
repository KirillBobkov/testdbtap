export function notEmpty(value) {
    return value !== null && value !== undefined;
}
export function hasOwnProperty(obj, prop) {
    return obj.hasOwnProperty(prop);
}
export function isEventWithComposedPath(event) {
    return event.composedPath && typeof event.composedPath === 'function';
}
