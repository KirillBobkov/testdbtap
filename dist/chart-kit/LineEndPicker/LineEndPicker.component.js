import React, { useState, useCallback, forwardRef } from 'react';
import { LineEndSelectboxStyled, LineEndSelectboxAnchorStyled, LineEndSelectboxPopoverStyled, } from './LineEndPicker.styled';
import { DropdownMenuItem } from '../Menu/dropdown-menu/DropdownMenuItem.component';
import { memoize } from '@devexperts/dxcharts-lite/dist/chart/utils/performance/memoize.utils';
import { string } from 'fp-ts';
const LineEndSelectboxPopover = (props) => {
    return React.createElement(LineEndSelectboxPopoverStyled, { ...props, align: "start", position: "bottom" });
};
const LineEndSelectboxAnchor = memoize((valueText) => forwardRef((props, ref) => {
    return React.createElement(LineEndSelectboxAnchorStyled, { ref: ref, ...props, valueText: valueText });
}));
export const lineEndTypes = ['arrow', 'line'];
export const LineEndSelectbox = props => {
    const { className, selectedType, localization, onTypeSelect, parentEventTarget } = props;
    const [isOpened, setOpened] = useState(false);
    const handleSelectboxToggle = useCallback((isShow) => {
        if (isShow !== undefined) {
            setOpened(isShow);
        }
    }, [setOpened]);
    const handleTypeSelect = useCallback((type) => {
        if (type !== undefined && !Array.isArray(type)) {
            onTypeSelect(toLineEndType(type.toString()));
        }
    }, [onTypeSelect]);
    const isTypeActive = useCallback((type) => string.Eq.equals(selectedType, type), [selectedType]);
    return (React.createElement(LineEndSelectboxStyled, { parentEventTarget: parentEventTarget, className: className, isOpened: isOpened, onToggle: handleSelectboxToggle, value: selectedType, onValueChange: handleTypeSelect, Anchor: LineEndSelectboxAnchor(lineEndTypeToLabel(selectedType, localization)), closeOnClickAway: true, Popover: LineEndSelectboxPopover }, Object.values(lineEndTypes).map(type => (React.createElement(DropdownMenuItem, { key: type, value: type, isActive: isTypeActive(type), label: lineEndTypeToLabel(type, localization) })))));
};
const toLineEndType = (type) => {
    switch (type) {
        case 'arrow':
            return 'arrow';
        case 'line':
            return 'line';
        default:
            return 'line';
    }
};
const lineEndTypeToLabel = (type, localization) => {
    switch (type) {
        case 'arrow':
            return localization.arrow;
        case 'line':
            return localization.none;
    }
};
