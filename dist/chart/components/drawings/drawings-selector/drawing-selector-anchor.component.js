import * as React from 'react';
import { forwardRef, useContext, useMemo } from 'react';
import { isDrawingType } from './drawings-selector.model';
import { getIconByDrawingType } from './getIconByDrawingType';
import { ChartToolbarButtonWithTooltip } from '../../chart-toolbar/chart-toolbar-button-with-tooltip.component';
import { IconsOverridingContext } from '../../../../utils/icons-overriding-context';
import { MENU_ID } from '../../../../chart-kit/Menu/Menu.component';
import { SelectboxAnchorContentStyled, SelectboxAnchorPrefixStyled, SelectboxAnchorTextStyled, SelectboxAnchorCaretStyled, } from '../../../../chart-kit/Selectbox/SelectboxAnchor.styled';
import { MultiChartComponentContext } from '../../multi-chart/multi-chart-context';
export const DrawingTypeAnchor = React.memo(forwardRef((props, forwardedRef) => {
    const { isOpened, hasMenu, valueText, onClick, onKeyDown, children, className, prefixIcon, testId, tabIndex, ariaLabel, ariaDescription, } = props;
    const iconsConfig = useContext(IconsOverridingContext);
    const { localization } = useContext(MultiChartComponentContext);
    const caretIcon = useMemo(() => {
        if (isDrawingType(props.value)) {
            return getIconByDrawingType(props.value, iconsConfig);
        }
        return null;
    }, [props.value, iconsConfig]);
    const ref = React.useRef(null);
    // TODO remove when migrate to React 18 - https://github.com/facebook/react/issues/21035
    // TODO replace with useSyncedRef, get rid of forwardRef if possible
    React.useEffect(() => {
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
    return (React.createElement(ChartToolbarButtonWithTooltip, { hasMenu: hasMenu, tabIndex: tabIndex ?? 0, ref: ref, onClick: onClick, onKeyDown: onKeyDown, className: className, testId: testId, ariaLabel: ariaLabel, ariaExpanded: isOpened, ariaHaspopup: true, ariaControls: MENU_ID, disableTooltip: isOpened, label: localization.toolbar.tooltip.drawings },
        React.createElement(SelectboxAnchorContentStyled, null,
            React.createElement(SelectboxAnchorPrefixStyled, null, prefixIcon),
            React.createElement(SelectboxAnchorTextStyled, null, valueText),
            React.createElement(SelectboxAnchorCaretStyled, null, caretIcon)),
        children));
}));
