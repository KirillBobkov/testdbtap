/**
 * Get relative to page coordinates of element
 * @param elem
 * @returns
 */
export function getCoords(elem) {
    const box = elem.getBoundingClientRect();
    return {
        top: box.top + window.scrollY,
        right: box.right + window.scrollX,
        bottom: box.bottom + window.scrollY,
        left: box.left + window.scrollX,
        height: box.height,
        width: box.width,
    };
}
