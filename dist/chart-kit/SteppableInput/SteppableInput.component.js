import React, { forwardRef, memo, useCallback, useMemo, useState } from 'react';
import { constUndefined } from 'fp-ts/function';
import { useSyncedRef } from '../utils/react/use-synced-ref';
import { InputStyled, SIButtonStyled, SIClearButtonStyled, SIInnerStyled, SIInputStyled, } from './SteppableInput.styled';
import { Holdable } from '../Holdable/Holdable.component';
import { useActiveEventListener } from '../utils/react/useActiveEventListener';
export const SteppableInput = memo(forwardRef((props, ref) => {
    const { isDisabled, onFocus, onBlur, error, children, decrementIcon, incrementIcon, clearIcon, onIncrement, onDecrement, onClear, onClick, onKeyDown, onMouseEnter, onMouseLeave, isDecrementButtonDisabled, isIncrementButtonDisabled, Input = InputStyled, ButtonIcon = SIButtonStyled, ClearButtonIcon = SIClearButtonStyled, className, } = props;
    const inputRef = useSyncedRef(ref);
    const [isFocused, setFocused] = useState(false);
    const isIncrementDisabled = useMemo(() => isDisabled || isIncrementButtonDisabled, [isIncrementButtonDisabled, isDisabled]);
    const isDecrementDisabled = useMemo(() => isDisabled || isDecrementButtonDisabled, [isDecrementButtonDisabled, isDisabled]);
    const onClearHandler = useCallback(() => {
        onClear && onClear();
    }, [onClear]);
    const onIncrementHandler = useCallback(() => {
        !isIncrementDisabled && onIncrement && onIncrement();
    }, [onIncrement, isIncrementDisabled]);
    const onDecrementHandler = useCallback(() => {
        !isDecrementDisabled && onDecrement && onDecrement();
    }, [onDecrement, isDecrementDisabled]);
    const onButtonMouseDown = useCallback((e) => {
        if (isFocused) {
            e.preventDefault();
        }
    }, [isFocused]);
    const onFocusHandler = useCallback((e) => {
        if (!isDisabled && !isFocused) {
            setFocused(true);
            onFocus && onFocus(e);
        }
    }, [isDisabled, isFocused, setFocused, onFocus]);
    const onBlurHandler = useCallback((e) => {
        if (!isDisabled && isFocused) {
            setFocused(false);
            onBlur && onBlur(e);
        }
    }, [isDisabled, isFocused, setFocused, onBlur]);
    const onKeyDownHandler = useCallback((e) => {
        if (!isDisabled) {
            switch (e.code) {
                case 'ArrowUp': {
                    e.preventDefault(); // prevent vertical scroll of parent element
                    onIncrementHandler();
                    break;
                }
                case 'ArrowDown': {
                    e.preventDefault(); // prevent vertical scroll of parent element
                    onDecrementHandler();
                    break;
                }
            }
            onKeyDown && onKeyDown(e);
        }
    }, [isDisabled, onIncrementHandler, onDecrementHandler, onKeyDown]);
    const onWheel = useCallback((e) => {
        if (!isDisabled && isFocused) {
            e.preventDefault();
            if (e.deltaY < 0) {
                onIncrementHandler();
            }
            else {
                onDecrementHandler();
            }
        }
    }, [isFocused, isDisabled, onIncrementHandler, onDecrementHandler]);
    useActiveEventListener(inputRef, onWheel, 'wheel');
    return (React.createElement(SIInputStyled, null,
        React.createElement(Input, { className: className, value: undefined, onValueChange: constUndefined, type: "hidden", onFocus: onFocusHandler, onBlur: onBlurHandler, onKeyDown: onKeyDownHandler, onClick: onClick, onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave, isDisabled: isDisabled, error: error, ref: inputRef },
            React.createElement(SIInnerStyled, null,
                children,
                onClear && clearIcon && (React.createElement(ClearButtonIcon, { icon: clearIcon, isFlat: true, onClick: onClearHandler, onMouseDown: onButtonMouseDown, disabled: isDisabled, tabIndex: -1 })),
                onDecrement && decrementIcon && (React.createElement(Holdable, { onHold: onDecrement, isDisabled: isDecrementDisabled },
                    React.createElement(ButtonIcon, { icon: decrementIcon, onClick: onDecrementHandler, onMouseDown: onButtonMouseDown, disabled: isDecrementButtonDisabled, tabIndex: -1 }))),
                onIncrement && incrementIcon && (React.createElement(Holdable, { onHold: onIncrement, isDisabled: isIncrementDisabled },
                    React.createElement(ButtonIcon, { icon: incrementIcon, onClick: onIncrementHandler, onMouseDown: onButtonMouseDown, disabled: isIncrementButtonDisabled, tabIndex: -1 })))))));
}));
