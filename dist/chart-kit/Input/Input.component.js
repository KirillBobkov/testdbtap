import * as React from 'react';
import { forwardRef, memo, useCallback, useMemo, useRef, useContext, useState, useEffect, } from 'react';
import { InputErrorStyled } from './Input.styled';
import { InputContainerStyled, InputStyled } from './Input.styled';
import { MultiChartComponentContext } from '../../chart/components/multi-chart/multi-chart-context';
export const Input = memo(forwardRef(({ isDisabled, isReadOnly, tabIndex = 0, children, value, error, onClick, onMouseDown, onMouseUp, onMouseEnter, onMouseLeave, onKeyDown, onKeyUp, onKeyPress, onTouchStart, onTouchMove, onTouchEnd, onTouchCancel, max = Number.MAX_SAFE_INTEGER, min = Number.MIN_SAFE_INTEGER, placeholder, type, name, pattern, id, onWheel, onFocus, onBlur, onChange, onValueChange, className, testId, autofocus, ariaLabel, ariaDescribedby, }, containerRef) => {
    const [isFocused, setFocused] = useState(false);
    const inputRef = useRef(null);
    const isFocusingOnInput = useRef(false);
    // on Chrome and Firefox focus-visible gets added to textarea and input fields even when the user uses the mouse to get focus
    // thats why we use keyBoardMode to turn outlines off, and enable them only by tab actions
    const { keyboardModeEnabled } = useContext(MultiChartComponentContext);
    const isCustom = useMemo(() => type === 'hidden', [type]);
    useEffect(() => {
        if (autofocus && inputRef.current) {
            inputRef.current.focus();
        }
    }, [autofocus, inputRef]);
    const styleProps = useMemo(() => ({
        isFocused: !isDisabled && isFocused,
        isHasError: Boolean(error),
        isDisabled,
        isReadOnly,
        keyboardModeEnabled,
    }), [isDisabled, isFocused, error, isReadOnly, keyboardModeEnabled]);
    const keyboardEvents = useMemo(() => ({
        onKeyDown,
        onKeyUp,
        onKeyPress,
    }), [onKeyDown, onKeyUp, onKeyPress]);
    const onFocusHandler = useCallback((e) => {
        if (!isDisabled && !isFocused && !isFocusingOnInput.current && inputRef.current) {
            isFocusingOnInput.current = true;
            inputRef.current.focus();
            isFocusingOnInput.current = false;
            setFocused(true);
            onFocus?.(e);
        }
    }, [isDisabled, isFocused, setFocused, onFocus]);
    const onBlurHandler = useCallback((e) => {
        if (!isDisabled && isFocused && !isFocusingOnInput.current) {
            setFocused(false);
            onBlur?.(e);
        }
    }, [isDisabled, isFocused, onBlur]);
    const onChangeHandler = useCallback((e) => {
        const value = e.target.value;
        onValueChange?.(value);
        onChange?.(e);
    }, [onValueChange, onChange]);
    const onClickHandler = useCallback((e) => {
        !isDisabled && onClick?.(e);
    }, [isDisabled, onClick]);
    //NumericStepper uses two inputs, one of them should stay hidden, so we can't set all inputs as 'text' by default
    //TODO: possible solution: make NumericStepper implementation easier (only one input)
    const inputType = useMemo(() => (type === 'hidden' ? 'hidden' : 'text'), [type]);
    const inputContainer = (React.createElement(InputContainerStyled, { className: className, id: id, onClick: onClickHandler, onMouseDown: onMouseDown, onMouseUp: onMouseUp, onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave, onTouchStart: onTouchStart, onTouchMove: onTouchMove, onTouchEnd: onTouchEnd, onTouchCancel: onTouchCancel, onFocus: onFocusHandler, onBlur: onBlurHandler, onWheel: onWheel, ref: containerRef, ...styleProps, ...(isCustom && keyboardEvents) },
        React.createElement(InputStyled, { "aria-label": ariaLabel, "aria-describedby": ariaDescribedby, ref: inputRef, value: value, type: inputType, min: min, max: max, pattern: pattern, name: name, onChange: onChangeHandler, placeholder: placeholder, readOnly: isReadOnly, disabled: isDisabled, "data-test-id": testId, ...(!isCustom && keyboardEvents) }),
        children));
    const errorComponent = error && React.createElement(InputErrorStyled, null, error);
    return (React.createElement(React.Fragment, null,
        inputContainer,
        errorComponent));
}));
