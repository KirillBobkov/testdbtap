import React, { memo, useCallback, useContext, useRef } from 'react';
import { BackgroundMenuPopoverContainerStyled, BackgroundMenuPopoverStyled } from './background-menu-popovers.styled';
import { RightClickPopoverMenuStyled } from '../../right-click-menu/right-click-menu.styled';
import { MultiChartComponentContext } from '../../multi-chart/multi-chart-context';
import { useA11yModalTabKeyHandler } from '../../../../chart-kit/accessibility/use-a11y-modal-tab-key-handler';
import { useA11yPopFocusController } from '../../../../chart-kit/accessibility/use-a11y-pop-focus-controller';
import { DropdownMenuItem } from '../../../../chart-kit/Menu/dropdown-menu/DropdownMenuItem.component';
const themeTypes = ['light', 'dark'];
export const BackgroundMenuThemePopover = memo(props => {
    const { isOpened, onClose, anchorRef, activeTheme, onChangeTheme } = props;
    const { localization } = useContext(MultiChartComponentContext);
    const popoverRef = useRef(null);
    const tabKeyHandler = useA11yModalTabKeyHandler(popoverRef);
    useA11yPopFocusController({
        anchorRef,
        popRef: popoverRef,
    });
    const changeThemeHandler = useCallback((value) => isThemeType(value) && onChangeTheme(value), [onChangeTheme]);
    return (React.createElement(BackgroundMenuPopoverStyled, { opened: isOpened, onRequestClose: onClose, position: 'right', keyboardMode: true, onTabPress: tabKeyHandler, anchorRef: anchorRef, selectorRef: anchorRef, align: 'center' },
        React.createElement(BackgroundMenuPopoverContainerStyled, { ref: popoverRef },
            React.createElement(RightClickPopoverMenuStyled, { onItemSelect: changeThemeHandler }, themeTypes.map(type => (React.createElement(DropdownMenuItem, { key: type, value: type, isActive: activeTheme === type, label: localization.themes.types[type], icon: React.createElement(React.Fragment, null) })))))));
});
const isThemeType = (value) => {
    const types = themeTypes;
    return typeof value === 'string' && types.includes(value);
};
