import { shallowEqual } from './object.utils';
import { deepEqual } from '@devexperts/dxcharts-lite/dist/chart/utils/object.utils';
/**
 * Pure render checker
 * @param {object} props
 * @param {object} state
 * @param {object} newProps
 * @param {object} newState
 * @returns {boolean}
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function shouldComponentUpdate(props, state, newProps, newState) {
    return !shallowEqual(props, newProps) || !shallowEqual(state, newState);
}
/**
 * Pure render recorator
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function PURE(target) {
    //noinspection JSUnresolvedVariable
    const oldShouldComponentUpdate = target.prototype.shouldComponentUpdate;
    /**
     * @param {*} newProps
     * @param {*} newState
     * @returns {boolean}
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    target.prototype.shouldComponentUpdate = function (newProps, newState) {
        //check original shoulComponentUpdate
        const shouldUpdateByOriginal = !oldShouldComponentUpdate || oldShouldComponentUpdate.call(this, newProps, newState);
        //check props.theme
        const shouldCheckTheme = !!newProps['theme'];
        //check shallow equality
        //will be set further basing on shouldCheckCss
        let shouldUpdateByEquality;
        if (shouldCheckTheme) {
            //now we need to remove theme object from original props to avoid checking by shouldComponentUpdate
            const thisPropsCopy = Object.assign({}, this.props);
            const newPropsCopy = Object.assign({}, newProps);
            delete thisPropsCopy['theme'];
            delete newPropsCopy['theme'];
            //check
            shouldUpdateByEquality =
                //either props has changed (ignoring css)
                shouldComponentUpdate(thisPropsCopy, this.state, newPropsCopy, newState) ||
                    //or theme has changed
                    !deepEqual(this.props.theme, newProps['theme']);
        }
        else {
            //we don't need to do anything with the props so just call shouldComponentUpdate
            shouldUpdateByEquality = shouldComponentUpdate(this.props, this.state, newProps, newState);
        }
        return shouldUpdateByOriginal && shouldUpdateByEquality;
    };
    return target;
}