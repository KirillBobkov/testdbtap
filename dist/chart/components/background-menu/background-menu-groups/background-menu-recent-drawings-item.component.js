import React, { memo, useCallback, useContext, useRef, useState } from 'react';
import { ChartReactAppContext } from '../../../defaults';
import { MultiChartComponentContext } from '../../multi-chart/multi-chart-context';
import { IconsOverridingContext } from '../../../../utils/icons-overriding-context';
import { RightClickMenuPopoverItemWrapper, RightClickPopoverMenuItemStyled, } from '../../right-click-menu/right-click-menu.styled';
import { BackgroundMenuPopoverAnchor } from '../background-menu-popovers/background-menu-popovers.styled';
import { renderSettingsItem } from '../../yAxis-settings/yaxis-main-popover.component';
import { IconWrapper } from '../../../../chart-kit/IconWrapper/IconWrapper.component';
import { constVoid } from 'fp-ts/function';
import { BackgroundMenuRecentDrawingsPopover } from '../background-menu-popovers/background-menu-recentdrawings-popover.component';
export const BackgroundMenuRecentDrawingsItem = memo(props => {
    const { recentDrawings, onRecentDrawingSelect, onPopoverClose } = props;
    const [isOpened, setIsOpened] = useState(false);
    const { localization } = useContext(MultiChartComponentContext);
    const iconsConfig = useContext(IconsOverridingContext);
    const recentDrawingsAnchorRef = useRef(null);
    const { isMobile } = useContext(ChartReactAppContext);
    const onMouseEnterHandler = useCallback(() => setIsOpened(true), [setIsOpened]);
    const onMouseLeaveHandler = useCallback(() => setIsOpened(false), [setIsOpened]);
    return (React.createElement(RightClickMenuPopoverItemWrapper, { onMouseLeave: onMouseLeaveHandler },
        React.createElement(BackgroundMenuPopoverAnchor, { ref: recentDrawingsAnchorRef }),
        React.createElement(RightClickPopoverMenuItemStyled, { value: 'Recent drawings', onMouseEnter: isMobile ? constVoid : onMouseEnterHandler }, renderSettingsItem(localization.drawings.recentDrawings, true, React.createElement(React.Fragment, null), false, React.createElement(IconWrapper, null, iconsConfig.yAxisMainPopover.arrow))),
        React.createElement(BackgroundMenuRecentDrawingsPopover, { onClose: onPopoverClose, isOpened: isOpened, anchorRef: recentDrawingsAnchorRef, recentDrawings: recentDrawings, onRecentDrawingSelect: onRecentDrawingSelect })));
});
