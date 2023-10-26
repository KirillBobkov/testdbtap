import React, { memo, useCallback, useContext } from 'react';
import { ButtonIcon } from '../../../chart-kit/Button/ButtonIcon.component';
import { IconsOverridingContext } from '../../../utils/icons-overriding-context';
import { IconWrapper } from '../../../chart-kit/IconWrapper/IconWrapper.component';
import { ChartReactAppContext } from '../../defaults';
export const ChartScalingTool = memo((props) => {
    const { zoomIn, zoomOut, isZoomBtnEnabled, localization } = props;
    const iconsConfig = useContext(IconsOverridingContext);
    const { isMobile } = useContext(ChartReactAppContext);
    const handleZoomIn = useCallback(() => zoomIn(), [zoomIn]);
    const handleZoomOut = useCallback(() => zoomOut(), [zoomOut]);
    return !isMobile ? (React.createElement(React.Fragment, null,
        React.createElement(ButtonIcon, { icon: React.createElement(IconWrapper, null, iconsConfig.scalingTool.minus), onClick: handleZoomOut, disabled: !isZoomBtnEnabled, "aria-label": localization.a11y_buttons.a11y_magnifying_tool_zoom_out_button }),
        React.createElement(ButtonIcon, { icon: React.createElement(IconWrapper, null, iconsConfig.scalingTool.plus), onClick: handleZoomIn, "aria-label": localization.a11y_buttons.a11y_magnifying_tool_zoom_in_button }))) : null;
});
