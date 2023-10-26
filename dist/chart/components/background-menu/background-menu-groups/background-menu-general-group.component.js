import React, { memo, useCallback, useContext } from 'react';
import { RightClickPopoverMenuItemLabelStyled, RightClickPopoverMenuItemStyled, RightClickPopoverMenuStyled, } from '../../right-click-menu/right-click-menu.styled';
import { MultiChartComponentContext } from '../../multi-chart/multi-chart-context';
import { renderSettingsItem } from '../../yAxis-settings/yaxis-main-popover.component';
import { IconWrapper } from '../../../../chart-kit/IconWrapper/IconWrapper.component';
import { IconsOverridingContext } from '../../../../utils/icons-overriding-context';
const GeneralGroupItems = { settings: 'Settings', resetChart: 'Reset chart' };
export const BackgroundMenuGeneralGroup = memo(props => {
    const { onOpenSettings, onResetChart } = props;
    const { localization } = useContext(MultiChartComponentContext);
    const iconsConfig = useContext(IconsOverridingContext);
    const onGeneralGroupItemSelectHandler = useCallback((value) => {
        switch (value) {
            case GeneralGroupItems.settings:
                onOpenSettings();
                break;
            case GeneralGroupItems.resetChart:
                onResetChart();
                break;
        }
    }, [onOpenSettings, onResetChart]);
    return (React.createElement(RightClickPopoverMenuStyled, { onItemSelect: onGeneralGroupItemSelectHandler },
        React.createElement(RightClickPopoverMenuItemStyled, { value: 'Settings' }, renderSettingsItem(localization.studies.rightClickMenu.settings, true, React.createElement(IconWrapper, null, iconsConfig.background.settings), false, React.createElement(React.Fragment, null))),
        React.createElement(RightClickPopoverMenuItemStyled, { value: 'Reset chart' },
            React.createElement(RightClickPopoverMenuItemLabelStyled, null, localization.settingsPopup.resetChart))));
});
