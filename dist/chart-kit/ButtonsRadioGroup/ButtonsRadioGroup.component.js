import React, { useCallback, useRef, useState } from 'react';
import { typedMemo } from '../../utils/typed-memo';
import { useA11yListboxArrowsFocusController } from '../accessibility/use-a11y-listbox-arrows-focus-controller';
import { ButtonsRadioGroupButtonStyled, ButtonsRadioGroupStyled } from './ButtonsRadioGroup.styled';
function ButtonsRadioGroupRaw(props) {
    const { buttons, selected, onSelect, isDisabled, className, ariaLabel, ariaDescribedby } = props;
    const [selectedButton, setSelectedButton] = useState(selected);
    if (selectedButton !== selected) {
        setSelectedButton(selected);
    }
    const radioGroupRef = useRef(null);
    const onSelectHandler = useCallback((type) => {
        setSelectedButton(type);
        onSelect(type);
    }, [onSelect]);
    useA11yListboxArrowsFocusController({
        wrapperRef: radioGroupRef,
        childrenSelector: 'button',
        role: 'radiogroup',
        childRole: 'radio',
    });
    return (React.createElement(ButtonsRadioGroupStyled, { "aria-label": ariaLabel, "aria-describedby": ariaDescribedby, ref: radioGroupRef, className: className }, buttons.map(b => {
        const isActive = b.type === selectedButton;
        return (React.createElement(ButtonsRadioGroupButtonStyled, { className: className, onClick: () => onSelectHandler(b.type), isActive: isActive, isFlat: true, tabIndex: 0, "aria-label": b.ariaLabel, "aria-describedby": b.ariaDescribedby, "aria-checked": isActive, key: b.type, disabled: isDisabled }, b.name));
    })));
}
export const ButtonsRadioGroup = typedMemo(ButtonsRadioGroupRaw);
