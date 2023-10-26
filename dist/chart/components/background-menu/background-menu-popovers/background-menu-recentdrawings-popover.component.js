import React, { memo, useCallback, useContext, useRef } from 'react';
import { BGMenuNoRecentDrawingsLabel, BackgroundMenuPopoverContainerStyled, BackgroundMenuPopoverStyled, } from './background-menu-popovers.styled';
import { RightClickPopoverMenuStyled } from '../../right-click-menu/right-click-menu.styled';
import { useA11yModalTabKeyHandler } from '../../../../chart-kit/accessibility/use-a11y-modal-tab-key-handler';
import { useA11yPopFocusController } from '../../../../chart-kit/accessibility/use-a11y-pop-focus-controller';
import { isDrawingType } from '../../../model/drawing.model';
import { DropdownMenuItem } from '../../../../chart-kit/Menu/dropdown-menu/DropdownMenuItem.component';
import { MultiChartComponentContext } from '../../multi-chart/multi-chart-context';
export const BackgroundMenuRecentDrawingsPopover = memo(props => {
    const { isOpened, onClose, anchorRef, recentDrawings, onRecentDrawingSelect } = props;
    const { localization } = useContext(MultiChartComponentContext);
    const popoverRef = useRef(null);
    const tabKeyHandler = useA11yModalTabKeyHandler(popoverRef);
    useA11yPopFocusController({
        anchorRef,
        popRef: popoverRef,
    });
    const onRecentDrawingSelectHandler = useCallback((type) => isDrawingType(type) && onRecentDrawingSelect(type), [onRecentDrawingSelect]);
    return (React.createElement(BackgroundMenuPopoverStyled, { opened: isOpened, onRequestClose: onClose, position: 'right', keyboardMode: true, onTabPress: tabKeyHandler, anchorRef: anchorRef, selectorRef: anchorRef, align: 'center' },
        React.createElement(BackgroundMenuPopoverContainerStyled, { ref: popoverRef },
            React.createElement(RightClickPopoverMenuStyled, { onItemSelect: onRecentDrawingSelectHandler }, recentDrawings.length > 0 ? (recentDrawings.map(drawing => (React.createElement(DropdownMenuItem, { key: drawing, value: drawing, label: localization.drawings.types[drawing], icon: React.createElement(React.Fragment, null) })))) : (React.createElement(BGMenuNoRecentDrawingsLabel, null, localization.drawings.noRecentDrawings))))));
});
