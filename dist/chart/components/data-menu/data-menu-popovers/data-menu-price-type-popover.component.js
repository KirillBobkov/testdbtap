import React, { memo, useCallback, useContext, useRef } from 'react';
import { RightClickPopoverMenuStyled } from '../../right-click-menu/right-click-menu.styled';
import { useA11yPopFocusController } from '../../../../chart-kit/accessibility/use-a11y-pop-focus-controller';
import { useA11yModalTabKeyHandler } from '../../../../chart-kit/accessibility/use-a11y-modal-tab-key-handler';
import { string } from 'fp-ts';
import { DropdownMenuItem } from '../../../../chart-kit/Menu/dropdown-menu/DropdownMenuItem.component';
import { MultiChartComponentContext } from '../../multi-chart/multi-chart-context';
import { DataMenuPopoverContainerStyled, DataMenuPopoverStyled } from './data-menu-popovers.styled';
const priceTypes = ['last', 'ask', 'bid', 'mark'];
export const DataMenuPriceTypePopover = memo(props => {
    const { isOpened, onClose, value, priceTypes, onChangePriceType, anchorRef } = props;
    const { localization } = useContext(MultiChartComponentContext);
    const popoverRef = useRef(null);
    const tabKeyHandler = useA11yModalTabKeyHandler(popoverRef);
    useA11yPopFocusController({
        anchorRef,
        popRef: popoverRef,
    });
    const isTypeActive = useCallback((type) => string.Eq.equals(value, type), [value]);
    const changeTypeHandler = useCallback((value) => isPriceType(value) && onChangePriceType(`${value}`), [onChangePriceType]);
    return (React.createElement(DataMenuPopoverStyled, { opened: isOpened, onRequestClose: onClose, position: 'right', keyboardMode: true, onTabPress: tabKeyHandler, anchorRef: anchorRef, selectorRef: anchorRef, align: 'start' },
        React.createElement(DataMenuPopoverContainerStyled, { ref: popoverRef },
            React.createElement(RightClickPopoverMenuStyled, { onItemSelect: changeTypeHandler }, priceTypes.map(type => (React.createElement(DropdownMenuItem, { key: type, value: type, isActive: isTypeActive(type), label: localization.settingsPopup.priceTypes[type], icon: React.createElement(React.Fragment, null) })))))));
});
const isPriceType = (value) => {
    const types = priceTypes;
    return typeof value === 'string' && types.includes(value);
};
