import React, { memo, useContext, useRef } from 'react';
import { IconsOverridingContext } from '../../../utils/icons-overriding-context';
import { IconWrapper } from '../../../chart-kit/IconWrapper/IconWrapper.component';
import { ChartToolbarButtonWithTooltip } from '../chart-toolbar/chart-toolbar-button-with-tooltip.component';
export const MaximizeChartButton = memo((props) => {
    const { onClick, isMaximized, className, localization } = props;
    const iconsConfig = useContext(IconsOverridingContext);
    const ariaLabel = isMaximized
        ? localization.a11y_buttons.a11y_minimize_button
        : localization.a11y_buttons.a11y_maximize_button;
    const anchorRef = useRef(null);
    const icon = isMaximized ? (React.createElement(IconWrapper, null, iconsConfig.toolbar.multichart.settings.minimize)) : (React.createElement(IconWrapper, null, iconsConfig.toolbar.multichart.settings.maximize));
    return (React.createElement(ChartToolbarButtonWithTooltip, { ariaLabel: ariaLabel, className: className, icon: icon, ref: anchorRef, onClick: onClick, label: isMaximized ? localization.tooltip.minimize_button : localization.tooltip.maximize_button }));
});
