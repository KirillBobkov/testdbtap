import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { getTextWidth } from '../../utils/script-title.utils';
import { A11Y_SIMPLE_NUMERIC_STEPPER_DESC_ID } from '../accessibility/use-a11y-descriptions';
import { SimpleNumericStepperContainerStyled, SimpleNumericStepperControlStyled, SimpleNumericStepperInputStyled, SimpleNumericStepperLabelStyled, SimpleNumericStepperUnitControl, } from './SimpleNumericStepper.styled';
const orientationsDict = {
    v: 'clientY',
    h: 'clientX',
};
const orientationKeysDict = {
    v: {
        increase: 'ArrowUp',
        decrease: 'ArrowDown',
    },
    h: {
        increase: 'ArrowRight',
        decrease: 'ArrowLeft',
    },
};
const formatter = (v) => String(v);
const getRangeSpecificNumber = (value, min, max) => Math.max(Math.min(value, max), min);
export const SimpleNumericStepper = memo((props) => {
    const { className, value, onValueChange, orientation = 'h', sensitivity = 8, max = Number.POSITIVE_INFINITY, min = Number.NEGATIVE_INFINITY, ariaLabel, label, isDisabled, id, units = '%', isChangingCallback, } = props;
    const [mouseDownCoord, setMouseDownCoord] = useState(null);
    const [mouseDownValue, setMouseDownValue] = useState(0);
    const width = useMemo(() => getTextWidth(formatter(value), 'normal normal 400 12px Open Sans'), [value]);
    const handleValueChange = useCallback((delta) => {
        const valueFromSesitive = Math.trunc(delta / sensitivity);
        const limitMinMax = getRangeSpecificNumber(mouseDownValue + valueFromSesitive, min, max);
        onValueChange(limitMinMax);
    }, [onValueChange, mouseDownValue, sensitivity, max, min]);
    const handlePressDown = useCallback((e) => {
        if (window.TouchEvent && e.nativeEvent instanceof TouchEvent) {
            setMouseDownCoord(
            // @ts-ignore
            e.changedTouches[0][orientationsDict[orientation]] ||
                // @ts-ignore
                e.targetTouches[0][orientationsDict[orientation]]);
        }
        else {
            setMouseDownCoord(e[orientationsDict[orientation]] || e.nativeEvent[orientationsDict[orientation]]);
        }
        setMouseDownValue(value);
    }, [orientation, value]);
    const handleStop = useCallback(() => {
        setMouseDownCoord(null);
        setMouseDownValue(0);
        isChangingCallback?.(false);
    }, [isChangingCallback]);
    const handleMove = useCallback((e) => {
        if (mouseDownCoord && !isDisabled) {
            e.preventDefault();
            let movingCoordinate = 0;
            if (window.TouchEvent && e instanceof TouchEvent) {
                movingCoordinate =
                    e.changedTouches[0][orientationsDict[orientation]] ||
                        e.targetTouches[0][orientationsDict[orientation]];
            }
            else {
                movingCoordinate = e[orientationsDict[orientation]];
            }
            const delta = orientation === 'h' ? movingCoordinate - mouseDownCoord : mouseDownCoord - movingCoordinate;
            handleValueChange(delta);
            isChangingCallback?.(true);
        }
    }, [mouseDownCoord, orientation, handleValueChange, isChangingCallback]);
    useEffect(() => {
        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleStop);
        document.addEventListener('touchmove', handleMove);
        document.addEventListener('touchend', handleStop);
        document.addEventListener('touchcancel', handleStop);
        return () => {
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseup', handleStop);
            document.removeEventListener('touchmove', handleMove);
            document.removeEventListener('touchend', handleStop);
            document.removeEventListener('touchcancel', handleStop);
        };
    }, [handleMove, handleStop]);
    const onInputChange = useCallback((val) => {
        if (val === '') {
            onValueChange(0);
        }
        if (val !== undefined && /^-?[0-9]/g.test(val)) {
            const parsedValue = parseInt(val, 10);
            const numberedValue = isNaN(parsedValue) ? 0 : parsedValue;
            const limitMinMax = getRangeSpecificNumber(numberedValue, min, max);
            onValueChange(limitMinMax);
        }
    }, [onValueChange, min, max]);
    const step = useCallback((step, triggerChanging = true) => {
        const limitMinMax = getRangeSpecificNumber(value + step, min, max);
        onValueChange(limitMinMax);
        isChangingCallback?.(triggerChanging);
    }, [value, onValueChange, min, max, isChangingCallback]);
    const onKeyDown = useCallback((e) => {
        switch (e.code) {
            case orientationKeysDict[orientation].increase:
                e.preventDefault();
                step(1, false);
                break;
            case orientationKeysDict[orientation].decrease:
                e.preventDefault();
                step(-1, false);
                break;
        }
    }, [step, orientation]);
    return (React.createElement(SimpleNumericStepperContainerStyled, { innerWidth: width, disabled: isDisabled, onMouseDown: handlePressDown, onTouchStart: handlePressDown, htmlFor: id, orientation: orientation },
        React.createElement(SimpleNumericStepperLabelStyled, { isDisabled: isDisabled }, label),
        React.createElement(SimpleNumericStepperControlStyled, null,
            React.createElement(SimpleNumericStepperInputStyled, { id: id, ariaLabel: ariaLabel, ariaDescribedby: A11Y_SIMPLE_NUMERIC_STEPPER_DESC_ID, value: formatter(value), onValueChange: onInputChange, className: className, onKeyDown: onKeyDown, onKeyUp: handleStop, isDisabled: isDisabled })),
        React.createElement(SimpleNumericStepperUnitControl, null, units)));
});
