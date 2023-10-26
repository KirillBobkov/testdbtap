import React, { memo, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { ChartReactAppContext } from '../../../defaults';
import { MultiChartComponentContext } from '../../multi-chart/multi-chart-context';
import { IconsOverridingContext } from '../../../../utils/icons-overriding-context';
import { RightClickMenuPopoverItemWrapper, RightClickPopoverMenuItemStyled, } from '../../right-click-menu/right-click-menu.styled';
import { BackgroundMenuPopoverAnchor } from '../background-menu-popovers/background-menu-popovers.styled';
import { renderSettingsItem } from '../../yAxis-settings/yaxis-main-popover.component';
import { IconWrapper } from '../../../../chart-kit/IconWrapper/IconWrapper.component';
import { constVoid } from 'fp-ts/function';
import { BackgroundMenuGridPopover } from '../background-menu-popovers/background-menu-grid-popover.component';
import { chartSettingsLens } from '../../../view-models/chart-configurator.view-model';
export const BackgroundMenuGridItem = memo(props => {
    const { settings, onSettingsChange, onPopoverClose } = props;
    const [isOpened, setIsOpened] = useState(false);
    const { localization } = useContext(MultiChartComponentContext);
    const iconsConfig = useContext(IconsOverridingContext);
    const gridAnchorRef = useRef(null);
    const { isMobile } = useContext(ChartReactAppContext);
    const gridCheckBoxIcon = useMemo(() => settings.chartCore.components.grid.horizontal && settings.chartCore.components.grid.vertical ? (React.createElement(IconWrapper, null, iconsConfig.checkbox.checkboxTick)) : (React.createElement(React.Fragment, null)), [settings]);
    const onMouseEnterHandler = useCallback(() => setIsOpened(true), [setIsOpened]);
    const onMouseLeaveHandler = useCallback(() => setIsOpened(false), [setIsOpened]);
    const showGridHandler = useCallback((_) => {
        const horizontal = settings.chartCore.components.grid.horizontal;
        const vertical = settings.chartCore.components.grid.vertical;
        const gridValue = horizontal && vertical;
        onSettingsChange(chartSettingsLens(['chartCore', 'components', 'grid', 'horizontal']), !gridValue);
        onSettingsChange(chartSettingsLens(['chartCore', 'components', 'grid', 'vertical']), !gridValue);
    }, [settings, onSettingsChange]);
    return (React.createElement(RightClickMenuPopoverItemWrapper, { onMouseLeave: onMouseLeaveHandler },
        React.createElement(BackgroundMenuPopoverAnchor, { ref: gridAnchorRef }),
        React.createElement(RightClickPopoverMenuItemStyled, { value: 'Grid', onMouseEnter: isMobile ? constVoid : onMouseEnterHandler, onSelect: showGridHandler }, renderSettingsItem(localization.settingsPopup.appearance.colorSettings.common.grid, true, gridCheckBoxIcon, false, React.createElement(IconWrapper, null, iconsConfig.yAxisMainPopover.arrow))),
        React.createElement(BackgroundMenuGridPopover, { onClose: onPopoverClose, isOpened: isOpened, anchorRef: gridAnchorRef, settings: settings, onSettingsChange: onSettingsChange })));
});
