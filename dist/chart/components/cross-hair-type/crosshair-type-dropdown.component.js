import React, { useState, useCallback } from 'react';
import { string } from 'fp-ts';
import { isCrosshairType, crosshairTypes, mapTypeToString, mapTypeToIcon } from './crosshair-type.model';
import { CrosshairTypeAnchor } from './crosshair-type-anchor.component';
import { DropdownMenuItem } from '../../../chart-kit/Menu/dropdown-menu/DropdownMenuItem.component';
import { SelectboxStyled } from './crosshair-type-dropdown.styled';
import { Popover } from '../../../chart-kit/Popover/Popover.lazy-component';
const SelectboxPopover = (props) => {
    return React.createElement(Popover, { ...props, align: "start", position: "bottom" });
};
export const CrosshairTypeDropdown = props => {
    const { selectedType, onTypeSelect, className } = props;
    const [isOpened, toggleOpen] = useState(false);
    const handleValueChange = useCallback((value) => {
        isCrosshairType(value) && onTypeSelect(value);
    }, [onTypeSelect]);
    return (React.createElement(SelectboxStyled, { className: className, isOpened: isOpened, onToggle: toggleOpen, value: selectedType, onValueChange: handleValueChange, Anchor: CrosshairTypeAnchor, Popover: SelectboxPopover }, crosshairTypes.map(type => (React.createElement(DropdownMenuItem, { key: type, value: type, isActive: string.Eq.equals(selectedType, type), label: mapTypeToString(type), icon: mapTypeToIcon(type) })))));
};
