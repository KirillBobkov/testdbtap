import React, { useCallback, useContext, useRef } from 'react';
import { useFocusVisibleWithin } from '../accessibility/use-focus-visible-within-helper';
import { CheckboxContainerStyled, CheckboxIconStyled, CheckboxInputStyled, CheckboxViewStyled, } from './Checkbox.styled';
import { IconWrapper } from '../IconWrapper/IconWrapper.component';
import { IconsOverridingContext } from '../../utils/icons-overriding-context';
import { typedMemo } from '../../utils/typed-memo';
import { constVoid } from 'fp-ts/function';
function CheckboxRaw(props) {
    const { id, isDisabled, value = false, onValueChange = constVoid, ariaLabel, field, testId, ...rest } = props;
    const ref = useRef(null);
    const inputFocused = useFocusVisibleWithin(ref, 'input');
    const iconsConfig = useContext(IconsOverridingContext);
    const handleChange = useCallback((nextValue) => {
        onValueChange(nextValue.target.checked, field);
    }, [onValueChange, field]);
    const handleEnterPress = useCallback((e) => {
        const key = e.key;
        if (!key) {
            return;
        }
        if (key === 'Enter') {
            onValueChange(!value, field);
        }
    }, [onValueChange, value, field]);
    return (React.createElement(CheckboxContainerStyled, { isChecked: value, isDisabled: isDisabled, "data-focus": inputFocused, "data-test-id": testId, ref: ref, ...rest },
        React.createElement(CheckboxInputStyled, { "aria-label": ariaLabel, type: "checkbox", id: id, checked: value, disabled: isDisabled, onChange: handleChange, onKeyDown: handleEnterPress }),
        React.createElement(CheckboxViewStyled, null,
            React.createElement(CheckboxIconStyled, null,
                React.createElement(IconWrapper, null, iconsConfig.checkbox.checkboxTick)))));
}
export const Checkbox = typedMemo(CheckboxRaw);
