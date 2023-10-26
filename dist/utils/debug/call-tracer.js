import { CHART_REACT_PRODUCTION_MODE } from '../../config/build-config';
// list of actions for report
import { windowGlobal } from './chart-window-global';
let actionSequence = [];
const isTrackedAction = (action) => action.hasOwnProperty('name');
// time in ms which is considered as idle
const IDLE_TIME = 100;
/**
 * Proxy for object that contains functions.
 * When function is called - proxy records the invocation to storage.
 * @param container - object's business meaning
 * @param obj - object to proxy
 * @doc-tags tricky,debug
 */
export function callTracerProxy(container, obj) {
    if (CHART_REACT_PRODUCTION_MODE) {
        return obj;
    }
    return new Proxy(obj, {
        get(target, prop) {
            if (typeof target[prop] === 'function') {
                return new Proxy(target[prop], {
                    apply: (target, thisArg, argumentsList) => {
                        traceAction(container, target.name);
                        return Reflect.apply(target, thisArg, argumentsList);
                    },
                });
            }
            else {
                return Reflect.get(target, prop);
            }
        },
    });
}
const traceAction = (container, name) => {
    const now = Date.now();
    if (actionSequence.length > 0) {
        const last = actionSequence[actionSequence.length - 1];
        if (isTrackedAction(last)) {
            const diff = now - last.timestamp;
            const idleCount = Math.floor(diff / IDLE_TIME);
            if (idleCount > 0) {
                actionSequence.push({
                    type: 'i',
                    time: diff,
                });
            }
        }
    }
    actionSequence.push({
        type: 'ta',
        container,
        name,
        timestamp: now,
    });
};
if (!CHART_REACT_PRODUCTION_MODE) {
    document.addEventListener('click', () => traceAction('UserAction', 'click'), { capture: true });
    document.addEventListener('keydown', () => traceAction('UserAction', 'keydown'), { capture: true });
}
const callSequenceReport = () => {
    let report = '';
    for (const a of actionSequence) {
        if (isTrackedAction(a)) {
            report = `${report}${a.container}-->${a.container}: ${a.name}\n`;
        }
        else {
            report = `${report}Idle-->Idle: ${a.time}ms\n`;
        }
    }
    console.log(report);
};
windowGlobal.callTracer({
    report: () => {
        console.log(`Test here: https://www.websequencediagrams.com/`);
        callSequenceReport();
    },
    clear: () => {
        actionSequence = [];
    },
});
