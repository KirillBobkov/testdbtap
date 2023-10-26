/**
 * Production mode switch.
 * Is replaced by build-lib script in chart-react.
 * @doc-tags ci
 */
const CHART_REACT_PRODUCTION_MODE_DEFAULT = false;
export const CHART_REACT_PRODUCTION_MODE = typeof __CHART_REACT_PRODUCTION_MODE__ === 'undefined'
    ? CHART_REACT_PRODUCTION_MODE_DEFAULT
    : __CHART_REACT_PRODUCTION_MODE__;
console.log(`Chart production mode: ${CHART_REACT_PRODUCTION_MODE}`);
/**
 * Trial mode switch.
 * Is replaced by build-lib script in chart-react.
 * @doc-tags ci
 */
const CHART_REACT_TRIAL_ID_DEFAULT = undefined;
export const CHART_REACT_TRIAL_ID = typeof __CHART_REACT_TRIAL_ID__ === 'undefined' ? CHART_REACT_TRIAL_ID_DEFAULT : __CHART_REACT_TRIAL_ID__;
