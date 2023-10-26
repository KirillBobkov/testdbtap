/**
 * Returns a function, that, as long as it continues to be invoked, will not be triggered.
 * The function will be called after it stops being called for N milliseconds.
 * If immediate is passed, trigger the function on the leading edge, instead of the trailing.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export default function debounce(func, wait = 0, immediate = false) {
    let timeout;
    let args;
    let context;
    let timestamp;
    let result;
    const later = () => {
        const last = Date.now() - timestamp;
        if (last < wait && last >= 0) {
            timeout = setTimeout(later, wait - last);
        }
        else {
            timeout = null;
            if (!immediate) {
                result = func.apply(context, args);
                if (!timeout) {
                    context = args = null;
                }
            }
        }
    };
    // eslint-disable-next-line no-restricted-syntax
    return function () {
        context = this;
        args = arguments;
        timestamp = Date.now();
        const callNow = immediate && !timeout;
        if (!timeout) {
            timeout = setTimeout(later, wait);
        }
        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }
        return result;
    };
}
