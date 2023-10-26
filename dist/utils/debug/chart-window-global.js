import { CHART_REACT_PRODUCTION_MODE } from '../../config/build-config';
const __DEBUG_MODE__ = 'FORCED_DEBUG';
const isDebugModeEnabled = () => !!window.sessionStorage.getItem(__DEBUG_MODE__);
/**
 * Exposes important chart objects to global scope.
 * Only for development mode.
 * @doc-tags debug
 */
export const windowGlobal = {
    multiChartVM: (obj) => {
        if (isDebugModeEnabled() || !CHART_REACT_PRODUCTION_MODE) {
            window[`__CHART_MULTICHART_VM`] = obj;
        }
    },
    chartVMS: (chartId, obj) => {
        if (isDebugModeEnabled() || !CHART_REACT_PRODUCTION_MODE) {
            window[`__CHART_VIEW_MODELS_${chartId}`] = obj;
        }
    },
    actionsHistoryVM: (obj) => {
        if (isDebugModeEnabled() || !CHART_REACT_PRODUCTION_MODE) {
            if (!window[`__CHART_VMS`]) {
                window[`__CHART_VMS`] = {};
            }
            window[`__CHART_VMS`]['actionsHistory'] = obj;
        }
    },
    chartReactAPI: (obj) => {
        window[`__CHART_REACT_API`] = obj;
    },
    chart: (chartId, obj) => {
        if (isDebugModeEnabled() || !CHART_REACT_PRODUCTION_MODE) {
            window[`__CHART_INSTANCE_${chartId}`] = obj;
        }
    },
    callTracer: (obj) => {
        if (isDebugModeEnabled() || !CHART_REACT_PRODUCTION_MODE) {
            if (!window['__CHART_DEBUG']) {
                window['__CHART_DEBUG'] = {};
            }
            window['__CHART_DEBUG']['callTracer'] = obj;
        }
    },
    quotesGenerator: (obj) => {
        if (isDebugModeEnabled() || !CHART_REACT_PRODUCTION_MODE) {
            if (!window['__CHART_DEBUG']) {
                window['__CHART_DEBUG'] = {};
            }
            window['__CHART_DEBUG']['quotesGenerator'] = obj;
        }
    },
};
