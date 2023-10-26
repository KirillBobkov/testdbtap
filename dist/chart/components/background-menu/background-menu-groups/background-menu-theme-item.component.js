import React, { memo, useCallback, useContext, useRef, useState } from 'react';
import { ChartReactAppContext } from '../../../defaults';
import { MultiChartComponentContext } from '../../multi-chart/multi-chart-context';
import { IconsOverridingContext } from '../../../../utils/icons-overriding-context';
import { RightClickMenuPopoverItemWrapper, RightClickPopoverMenuItemStyled, } from '../../right-click-menu/right-click-menu.styled';
import { BackgroundMenuPopoverAnchor } from '../background-menu-popovers/background-menu-popovers.styled';
import { renderSettingsItem } from '../../yAxis-settings/yaxis-main-popover.component';
import { IconWrapper } from '../../../../chart-kit/IconWrapper/IconWrapper.component';
import { constVoid } from 'fp-ts/function';
import { BackgroundMenuThemePopover } from '../background-menu-popovers/background-menu-theme-popover.component';
export const BackgroundMenuThemeItem = memo(props => {
    const { activeTheme, onChangeTheme, onPopoverClose } = props;
    const [isOpened, setIsOpened] = useState(false);
    const { localization } = useContext(MultiChartComponentContext);
    const iconsConfig = useContext(IconsOverridingContext);
    const themeAnchorRef = useRef(null);
    const { isMobile } = useContext(ChartReactAppContext);
    const onMouseEnterHandler = useCallback(() => setIsOpened(true), [setIsOpened]);
    const onMouseLeaveHandler = useCallback(() => setIsOpened(false), [setIsOpened]);
    return (React.createElement(RightClickMenuPopoverItemWrapper, { onMouseLeave: onMouseLeaveHandler },
        React.createElement(BackgroundMenuPopoverAnchor, { ref: themeAnchorRef }),
        React.createElement(RightClickPopoverMenuItemStyled, { value: 'Theme', onMouseEnter: isMobile ? constVoid : onMouseEnterHandler }, renderSettingsItem(localization.themes.title, true, React.createElement(React.Fragment, null), false, React.createElement(IconWrapper, null, iconsConfig.yAxisMainPopover.arrow))),
        React.createElement(BackgroundMenuThemePopover, { onClose: onPopoverClose, isOpened: isOpened, anchorRef: themeAnchorRef, activeTheme: activeTheme, onChangeTheme: onChangeTheme })));
});
