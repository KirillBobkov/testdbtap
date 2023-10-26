import React, { forwardRef, memo, useContext } from 'react';
import { ChartReactAppContext } from '../../../defaults';
import { DrawingsSidebarButtonWithTooltipStyled, DrawingsSidebarBWTIconContainerStyled, DrawingsSidebarBWTLabelStyled, } from './chart-drawings-sidebar-button-with-tooltip.styled';
export const DrawingsSidebarButtonWithTooltip = memo(forwardRef((props, forwardedRef) => {
    const { icon, label, children, position = 'right', align = 'center', disableTooltip, ...rest } = props;
    const { isMobile } = useContext(ChartReactAppContext);
    return (React.createElement(DrawingsSidebarButtonWithTooltipStyled, { ...rest, disableTooltip: disableTooltip || isMobile, ref: forwardedRef, label: label, isFlat: true, position: position, align: align },
        icon && React.createElement(DrawingsSidebarBWTIconContainerStyled, null, icon),
        React.createElement(DrawingsSidebarBWTLabelStyled, null, label),
        children));
}));
