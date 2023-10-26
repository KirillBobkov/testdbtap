import React, { forwardRef, memo, useCallback, useMemo, useState, useContext, } from 'react';
import { pipe } from 'fp-ts/function';
import { isSome, none, some } from 'fp-ts/Option';
import { option } from 'fp-ts';
import { NumericInputStyled, NumericSteppableInputStyled, NumericStepperStyled } from './NumericStepper.styled';
import { IconsOverridingContext } from '../../utils/icons-overriding-context';
import { IconWrapper } from '../IconWrapper/IconWrapper.component';
const DEFAULT_STEP = 1;
const defaultNSValidate = (value) => /^\d*[.]?\d*$/.test(value);
export const NumericStepper = memo(forwardRef((props, ref) => {
    const iconsConfig = useContext(IconsOverridingContext);
    const { value: propsValue, isDisabled, isIncrementButtonDisabled, isDecrementButtonDisabled, placeholder, onValueChange: propsOnValueChange, SteppableInput = NumericSteppableInputStyled, step: propsStep = DEFAULT_STEP, incrementIcon = React.createElement(IconWrapper, null, iconsConfig.stepper.plus), decrementIcon = React.createElement(IconWrapper, null, iconsConfig.stepper.minus), clearIcon = React.createElement(IconWrapper, null, iconsConfig.stepper.clear), formatter = (v) => String(v), min = Number.NEGATIVE_INFINITY, max = Number.POSITIVE_INFINITY, className, ariaLabel, onValidate = defaultNSValidate, } = props;
    const [displayedValue, setDisplayedValue] = useState(() => formatter(propsValue));
    // additional state to compare props value and current value
    const [stateValue, setStateValue] = useState(propsValue);
    const [prevPropsValue, setPrevPropsValue] = useState(propsValue);
    const [isFocused, setFocused] = useState(false);
    if (prevPropsValue !== propsValue) {
        setPrevPropsValue(propsValue);
        stateValue !== propsValue && setDisplayedValue(formatter(propsValue));
    }
    const precision = useMemo(() => {
        let e = 1;
        while (Math.round(propsStep * e) / e !== propsStep) {
            e *= 10;
        }
        return Math.round(Math.log(e) / Math.LN10);
    }, [propsStep]);
    const sanitizeValue = useCallback((value) => parseFloat(value.toFixed(precision)), [precision]);
    const onValueChange = useCallback((newValue, isFocused = false) => {
        if (newValue === '') {
            const minValue = isFinite(min) ? min : 0;
            propsOnValueChange(minValue);
            setStateValue(minValue);
            setDisplayedValue('');
            return;
        }
        const processedValue = pipe(some(newValue), option.map(value => parseFloat(value)), option.chain(value => (isNaN(value) ? none : some(value))), option.chain(value => (min > value || value > max ? none : some(value))), option.map(sanitizeValue));
        isSome(processedValue) && setStateValue(processedValue.value);
        isSome(processedValue) && propsOnValueChange?.(processedValue.value);
        const displayedValue = isSome(processedValue) && !isFocused ? formatter(processedValue.value) : newValue;
        setDisplayedValue(displayedValue);
        setFocused(isFocused);
    }, [formatter, max, min, propsOnValueChange, sanitizeValue]);
    const step = useCallback((n) => {
        const increment = (1 / Math.pow(10, precision)) * n;
        const newValue = parseFloat((propsValue + increment).toFixed(precision));
        onValueChange(formatter(newValue), true);
    }, [precision, onValueChange, formatter, propsValue]);
    const decrease = useCallback(() => step(-1), [step]);
    const increase = useCallback(() => step(1), [step]);
    const onKeyDown = useCallback((event) => {
        event.stopPropagation();
        switch (event.code) {
            case 'ArrowUp':
                event.preventDefault();
                increase();
                break;
            case 'ArrowDown':
                event.preventDefault();
                decrease();
                break;
        }
    }, [decrease, increase]);
    const checkNumberValue = useCallback((value) => {
        return value === '-' || (parseInt(value, 10) >= min && parseInt(value, 10) <= max);
    }, [min, max]);
    const onInputChange = useCallback((value) => {
        if (isFocused && value !== undefined) {
            if (value === '') {
                return onValueChange?.(value);
            }
            const replacedValue = value.replace(/^-?[^0-9.]/g, '-');
            if (checkNumberValue(replacedValue) && onValidate(replacedValue)) {
                onValueChange(replacedValue, true);
            }
        }
    }, [isFocused, onValueChange, onValidate, checkNumberValue]);
    const onFocus = useCallback(() => {
        setFocused(true);
    }, []);
    const onBlur = useCallback(() => {
        onValueChange(propsValue.toString());
    }, [onValueChange, propsValue]);
    const onWheel = useCallback((event) => {
        if (!isDisabled && isFocused) {
            if (event.deltaY < 0) {
                increase();
            }
            else {
                decrease();
            }
        }
    }, [decrease, increase, isDisabled, isFocused]);
    const onIncrement = useCallback(() => {
        increase();
    }, [increase]);
    const onDecrement = useCallback(() => {
        decrease();
    }, [decrease]);
    const hasError = useMemo(() => isNaN(propsValue) || propsValue < min || propsValue > max, [max, min, propsValue]);
    return (SteppableInput && (React.createElement(NumericStepperStyled, null,
        React.createElement(SteppableInput, { className: className, isDisabled: isDisabled, isIncrementButtonDisabled: isIncrementButtonDisabled, isDecrementButtonDisabled: isDecrementButtonDisabled, error: hasError, onDecrement: onDecrement, onIncrement: onIncrement, decrementIcon: decrementIcon, incrementIcon: incrementIcon, clearIcon: clearIcon },
            React.createElement(NumericInputStyled, { ariaLabel: ariaLabel, type: "number", onKeyDown: onKeyDown, onFocus: onFocus, onWheel: onWheel, tabIndex: 0, error: hasError, isDisabled: isDisabled, value: displayedValue, onBlur: onBlur, onValueChange: onInputChange, placeholder: placeholder, ref: ref })))));
}));
