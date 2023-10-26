import React, { useCallback, useContext, useState, useEffect, useRef } from 'react';
import { IconsOverridingContext } from '../../utils/icons-overriding-context';
import { namedMemoRef } from '../../utils/named-memo';
import { isKeyCode } from '../Control/Control';
import { IconWrapper } from '../IconWrapper/IconWrapper.component';
import { Input } from '../Input/Input.component';
import { CustomInputMenuItemInactiveStyled, CustomInputMenuItemStyled, CustomInputConfirmButton, CustomInputMenuItemErrorStyled, CustomInputMenuItemInputContainerStyled, } from './CustomInputMenuItem.styled';
export const CustomInputMenuItem = namedMemoRef('CustomInputMenuItem', (props, ref) => {
    const { placeholder, inactiveText, defaultValue, ariaLabels, testIds, isActive, className, error: errorFromProps, keyboardModeEnabled, onEnter, onActiveChange, onFocusOut, inputValidator, onClearError, } = props;
    const iconsConfig = useContext(IconsOverridingContext);
    const [value, setValue] = useState(defaultValue ?? '');
    // error state
    const [error, setError] = useState(errorFromProps);
    // sync error state with the props
    if (errorFromProps?.reason !== error?.reason) {
        setError(errorFromProps);
    }
    const errorRef = useRef(null);
    useEffect(() => {
        if (errorRef.current && error) {
            errorRef.current.scrollIntoView();
        }
    }, [error]);
    const addNewInputValue = useCallback(() => {
        if (value) {
            onEnter(value);
        }
    }, [onEnter, value]);
    const onFocusOutHandler = useCallback(() => {
        onFocusOut?.();
        onActiveChange?.(false);
        onClearError?.();
    }, [onFocusOut, onActiveChange]);
    const onInputChange = useCallback((value) => {
        if (inputValidator) {
            inputValidator(value) && setValue(value);
        }
        else {
            setValue(value);
        }
        setError(undefined);
        onClearError?.();
    }, [inputValidator, onClearError]);
    const onKeyDown = useCallback((event) => {
        if (isKeyCode(event.code)) {
            const code = event.code;
            switch (code) {
                case 'Escape':
                case 'ArrowUp':
                case 'ArrowDown':
                    isActive && onFocusOutHandler();
                    break;
                case 'Enter':
                case 'NumpadEnter':
                    isActive ? addNewInputValue() : onActiveChange?.(true);
                    break;
            }
        }
    }, [isActive, onFocusOutHandler, addNewInputValue, onActiveChange]);
    const onActivateHandler = useCallback((e) => {
        e.stopPropagation();
        onActiveChange?.(true);
    }, [onActiveChange]);
    return (React.createElement(React.Fragment, null,
        React.createElement(CustomInputMenuItemStyled, { keyboardModeEnabled: keyboardModeEnabled, isActive: isActive, ref: ref, key: 'custom', value: 'custom', className: className, onKeyDown: onKeyDown }, isActive ? (React.createElement(CustomInputMenuItemInputContainerStyled, { error: error !== undefined },
            React.createElement(Input, { onValueChange: onInputChange, value: value, autofocus: true, testId: testIds?.input, ariaLabel: ariaLabels?.input, ariaDescribedby: error ? 'input-error-id' : undefined, placeholder: placeholder }),
            React.createElement(CustomInputConfirmButton, { icon: React.createElement(IconWrapper, { height: 16 }, iconsConfig.layout.customLayoutInput), onClick: addNewInputValue }))) : (React.createElement(CustomInputMenuItemInactiveStyled, { onClick: onActivateHandler, "aria-label": ariaLabels?.inactiveText, "data-test-id": testIds?.inactiveText }, inactiveText))),
        isActive && error ? (React.createElement(CustomInputMenuItemErrorStyled, { id: "input-error-id", ref: errorRef }, error.reason)) : null));
});
