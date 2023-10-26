import React, { useContext, useEffect, useRef } from 'react';
import { forwardRef } from 'react';
import { stringToPeriod } from '../../model/aggregation.model';
import { SelectboxAnchorCaretStyled, SelectboxAnchorContentStyled, SelectboxAnchorPrefixStyled, SelectboxAnchorTextStyled, } from '../../../chart-kit/Selectbox/SelectboxAnchor.styled';
import { ChartToolbarButtonWithTooltip } from '../chart-toolbar/chart-toolbar-button-with-tooltip.component';
import { MENU_ID } from '../../../chart-kit/Menu/Menu.component';
import { MultiChartComponentContext } from '../multi-chart/multi-chart-context';
export const PeriodAnchor = forwardRef((props, forwardedRef) => {
    const { value, isOpened, hasMenu, caretIcon, onClick, onKeyDown, children, className, prefixIcon, testId, tabIndex, ariaLabel, ariaDescription, } = props;
    const ref = useRef(null);
    const { localization } = useContext(MultiChartComponentContext);
    // TODO remove when migrate to React 18 - https://github.com/facebook/react/issues/21035
    // TODO replace with useSyncedRef, get rid of forwardRef if possible
    useEffect(() => {
        if (forwardedRef !== null) {
            if (typeof forwardedRef === 'function') {
                forwardedRef(ref.current);
            }
            else {
                // @ts-ignore
                forwardedRef['current'] = ref.current;
            }
        }
        if (ref.current && ariaDescription !== undefined) {
            // @ts-ignore
            ref.current.ariaDescription = ariaDescription;
        }
    });
    if (typeof value !== 'string') {
        return React.createElement("div", null);
    }
    const period = stringToPeriod(value);
    const valueText = getAnchorString(period);
    return (React.createElement(ChartToolbarButtonWithTooltip, { hasMenu: hasMenu, tabIndex: tabIndex ?? 0, ref: ref, onClick: onClick, onKeyDown: onKeyDown, className: className, testId: testId, ariaLabel: ariaLabel, ariaExpanded: isOpened, ariaHaspopup: true, ariaControls: MENU_ID, disableTooltip: isOpened, label: localization.toolbar.tooltip.period },
        React.createElement(SelectboxAnchorContentStyled, null,
            React.createElement(SelectboxAnchorPrefixStyled, null, prefixIcon),
            React.createElement(SelectboxAnchorTextStyled, null, valueText),
            React.createElement(SelectboxAnchorCaretStyled, null, caretIcon)),
        children));
});
export const getAnchorString = (period) => {
    const type = period.durationType === 'mo' ? 'M' : period.durationType;
    return `${period.duration}${type}`;
};
