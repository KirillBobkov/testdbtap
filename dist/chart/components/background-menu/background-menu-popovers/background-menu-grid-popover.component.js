import React, { memo, useCallback, useContext, useRef } from 'react';
import { BackgroundMenuPopoverContainerStyled, BackgroundMenuPopoverStyled } from './background-menu-popovers.styled';
import { RightClickPopoverMenuStyled } from '../../right-click-menu/right-click-menu.styled';
import { MultiChartComponentContext } from '../../multi-chart/multi-chart-context';
import { useA11yModalTabKeyHandler } from '../../../../chart-kit/accessibility/use-a11y-modal-tab-key-handler';
import { useA11yPopFocusController } from '../../../../chart-kit/accessibility/use-a11y-pop-focus-controller';
import { chartSettingsLens } from '../../../view-models/chart-configurator.view-model';
import { ChartSettingsCheckbox } from '../../chart-settings/chart-settings-checkbox/chart-settings-checkbox.component';
export const BackgroundMenuGridPopover = memo(props => {
    const { isOpened, onClose, settings, onSettingsChange, anchorRef } = props;
    const { localization } = useContext(MultiChartComponentContext);
    const popoverRef = useRef(null);
    const tabKeyHandler = useA11yModalTabKeyHandler(popoverRef);
    useA11yPopFocusController({
        anchorRef,
        popRef: popoverRef,
    });
    const showVerticalGridHandler = useCallback((value = false) => {
        onSettingsChange(chartSettingsLens(['chartCore', 'components', 'grid', 'vertical']), value);
    }, [onSettingsChange]);
    const showHorizontalGridHandler = useCallback((value = false) => {
        onSettingsChange(chartSettingsLens(['chartCore', 'components', 'grid', 'horizontal']), value);
    }, [onSettingsChange]);
    return (React.createElement(BackgroundMenuPopoverStyled, { opened: isOpened, onRequestClose: onClose, position: 'right', keyboardMode: true, onTabPress: tabKeyHandler, anchorRef: anchorRef, selectorRef: anchorRef, align: 'center' },
        React.createElement(BackgroundMenuPopoverContainerStyled, { ref: popoverRef },
            React.createElement(RightClickPopoverMenuStyled, null,
                React.createElement(ChartSettingsCheckbox, { label: localization.settingsPopup.tabs.general.grid.horizontal, value: settings.chartCore.components.grid.horizontal, onValueChange: showHorizontalGridHandler }),
                React.createElement(ChartSettingsCheckbox, { label: localization.settingsPopup.tabs.general.grid.vertical, value: settings.chartCore.components.grid.vertical, onValueChange: showVerticalGridHandler })))));
});
