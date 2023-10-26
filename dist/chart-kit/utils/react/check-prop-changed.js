/**
 * Checks if property was changed during re-render.
 * Use in any component and read console.
 *
 * Example:
 * checkPropChanged(isOpened, 'isOpened')
 *
 * @param prop - prop to check
 * @param name - duplicate prop name
 * @doc-tags debug
 */
export function checkPropChanged(prop, name) {
    if (window[name] !== undefined) {
        console.log(`CHART_TOOLS_CPC_${name}: ${prop !== window[name]}`);
    }
    window[name] = prop;
}
