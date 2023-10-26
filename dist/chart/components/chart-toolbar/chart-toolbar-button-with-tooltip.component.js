import React, { forwardRef, useMemo, useContext, memo } from 'react';
import { WithTooltip } from '../../../chart-kit/Tooltip/WithTooltip';
import { ChartReactAppContext } from '../../defaults';
import { ToolbarButtonStyled } from './chart-toolbar-button-with-tooltip.styled';
export const ChartToolbarButtonWithTooltip = memo(forwardRef((props, forwardedRef) => {
    const { onClick, onKeyDown, className, testId, hasMenu, isActive, disableTooltip = false, disabled = false, align = 'center', position = 'bottom', label, icon, children, ariaLabel, ariaExpanded, ariaHaspopup, ariaControls, } = props;
    const { showButtonsTooltip, isMobile } = useContext(ChartReactAppContext);
    const showTooltip = useMemo(() => showButtonsTooltip && !disableTooltip && !isMobile, [showButtonsTooltip, disableTooltip, isMobile]);
    return (React.createElement(WithTooltip, { disabled: !showTooltip, label: label, align: align, position: position },
        React.createElement(ToolbarButtonStyled, { ref: forwardedRef, testId: testId, className: className, "aria-label": ariaLabel, "aria-expanded": ariaExpanded, "aria-haspopup": ariaHaspopup, "aria-controls": ariaControls, isActive: isActive, disabled: disabled, hasMenu: hasMenu, icon: icon, onClick: onClick, onKeyDown: onKeyDown }, children)));
}));
