import React, { useCallback, memo } from 'react';
import { DrawingSettingsGroup } from '../../../drawing-settings-section/drawing-settings-group';
import { Lens } from 'monocle-ts';
import { array, option } from 'fp-ts';
import { constVoid, pipe } from 'fp-ts/function';
import { DrawingSettingsItem } from '../../../drawing-settings-section/drawing-settings-item';
import { NumericStepper } from '../../../../../../chart-kit/NumericStepper/NumericStepper.component';
const regressionTrendSectionCoefLens = Lens.fromProp()('deviationCoef');
export const RegressionTrendCoefGroup = memo(props => {
    const { value, onValueChange, dictionary } = props;
    const updateCoefficientHandler = useCallback((coefficient, index) => pipe(value, array.modifyAt(index, regressionTrendSectionCoefLens.set(coefficient)), option.fold(constVoid, onValueChange)), [value, onValueChange]);
    return (React.createElement(React.Fragment, null, value.map((regressionTrendSection, index) => {
        return (regressionTrendSection.type !== 'base' && (React.createElement(RegressionTrendCoefGroupItem, { key: `regression-trend--style-group-item-${index}`, regressionTrendSection: regressionTrendSection, index: index, step: 1, dictionary: dictionary, changeCoefficient: updateCoefficientHandler })));
    })));
});
const RegressionTrendCoefGroupItem = memo(props => {
    const { regressionTrendSection, index, step, dictionary, changeCoefficient } = props;
    const changeCoefficientHandler = useCallback((coefficient) => changeCoefficient(coefficient, index), [changeCoefficient, index]);
    return (React.createElement(DrawingSettingsGroup, null,
        React.createElement(DrawingSettingsItem, { label: dictionary.regressionTrend.deviation[regressionTrendSection.type] },
            React.createElement(NumericStepper, { min: Number.NEGATIVE_INFINITY, max: Number.POSITIVE_INFINITY, step: step, value: regressionTrendSection.deviationCoef, onValueChange: changeCoefficientHandler }))));
});
