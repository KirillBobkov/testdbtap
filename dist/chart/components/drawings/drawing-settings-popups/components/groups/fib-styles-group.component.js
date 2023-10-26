import React, { useCallback, memo, useMemo } from 'react';
import { DrawingSettingsGroup } from '../../../drawing-settings-section/drawing-settings-group';
import { DrawingSettingsItem } from '../../../drawing-settings-section/drawing-settings-item';
import { getPricePrecisionFormatter } from '../../../../../../utils/inputs.utils';
import { Checkbox } from '../../../../../../chart-kit/Checkbox/Checkbox.component';
import { NumericStepper } from '../../../../../../chart-kit/NumericStepper/NumericStepper.component';
import { Lens } from 'monocle-ts';
import { array, option } from 'fp-ts';
import { constVoid, pipe } from 'fp-ts/function';
import { LineStyleControl } from '../line-style-control.component';
import { PopupEventTargetConsumer } from '../../../../../../chart-kit/Popup/PopupUI.component';
const fibPartVisibleLens = Lens.fromProp()('visible');
const fibPartLineStyleLens = Lens.fromProps()(['lineColor', 'lineDash', 'lineWidth']);
const fibPartCoefLens = Lens.fromProp()('coefficient');
export const FibonacciStylesGroup = memo(props => {
    const { palette, value, onValueChange, step = 0.001, precision = 3, multiplier = 1 } = props;
    const updateVisibilityHandler = useCallback((visible, index) => pipe(value, array.modifyAt(index, fibPartVisibleLens.set(visible)), option.fold(constVoid, onValueChange)), [onValueChange, value]);
    const updateLineStylesHandler = useCallback((line, index) => pipe(value, array.modifyAt(index, fibPartLineStyleLens.set(line)), option.fold(constVoid, onValueChange)), [value, onValueChange]);
    const updateCoefficientHandler = useCallback((coefficient, index) => pipe(value, array.modifyAt(index, fibPartCoefLens.set(coefficient)), option.fold(constVoid, onValueChange)), [value, onValueChange]);
    return (React.createElement(PopupEventTargetConsumer, null, eventTarget => (React.createElement(DrawingSettingsGroup, { vertical: true }, value.map((fibPart, index) => (React.createElement(FibonacciStyleGroupItem, { key: `fibonacci-style-group-item-${index}`, fibonacciPart: fibPart, index: index, step: step, precision: precision, multiplier: multiplier, palette: palette, parentEventTarget: eventTarget, changeVisibility: updateVisibilityHandler, changeLineStyle: updateLineStylesHandler, changeCoefficient: updateCoefficientHandler })))))));
});
const FibonacciStyleGroupItem = memo(props => {
    const { fibonacciPart, index, step, precision, multiplier, palette, parentEventTarget, changeVisibility, changeLineStyle, changeCoefficient, } = props;
    const changeVisibilityHandler = useCallback((visible) => changeVisibility(Boolean(visible), index), [changeVisibility, index]);
    const changeLineStyleHandler = useCallback((line) => changeLineStyle(line, index), [changeLineStyle, index]);
    const changeCoefficientHandler = useCallback((coefficient) => changeCoefficient(coefficient / multiplier, index), [changeCoefficient, multiplier, index]);
    const coefficient = useMemo(() => fibonacciPart.coefficient * multiplier, [multiplier, fibonacciPart.coefficient]);
    return (React.createElement(DrawingSettingsGroup, { noGapItems: true },
        React.createElement(DrawingSettingsItem, null,
            React.createElement("label", null,
                React.createElement(Checkbox, { value: fibonacciPart.visible, onValueChange: changeVisibilityHandler }))),
        React.createElement(DrawingSettingsItem, null,
            React.createElement(NumericStepper, { min: Number.NEGATIVE_INFINITY, max: Number.POSITIVE_INFINITY, step: step, value: coefficient, onValueChange: changeCoefficientHandler, formatter: getPricePrecisionFormatter(precision) })),
        React.createElement(LineStyleControl, { noGap: true, noGapItems: true, value: fibonacciPart, palette: palette, onValueChange: changeLineStyleHandler, parentEventTarget: parentEventTarget })));
});
