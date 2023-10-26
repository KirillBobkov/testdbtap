import React, { memo, useCallback, useMemo } from 'react';
import { DrawingSettingsSection } from '../drawing-settings-section/drawing-settings-section.component';
import { DateCoordinatesGroup } from './components/groups/date-coordinates-group.component';
import { Lens } from 'monocle-ts';
import { FibonacciStylesGroup } from './components/groups/fib-styles-group.component';
import { pipe } from 'fp-ts/function';
import { array } from 'fp-ts';
import { CoeffGroup } from './components/groups/coeff-group.component';
import { BackgroundFillShortGroup } from './components/groups/background-fill-short-group.component';
const pathLens = Lens.fromPath();
const keyPointsLens = pathLens(['keyPoints']);
const priceLevelLens = pathLens(['properties', 'coefficients', 'priceLevel']);
const timeLevelLens = pathLens(['properties', 'coefficients', 'timeLevel']);
export const GannBoxSettings = memo((props) => {
    const { value, palette, instrument, currentTimezone, drawingsDict, onValueChange } = props;
    const coefficients = value.properties.coefficients;
    const coordinatesSectionDict = drawingsDict.popup.sections.coordinates;
    const labelsSectionDict = drawingsDict.popup.sections.labels;
    const styleSectionDict = drawingsDict.popup.sections.style;
    const createHandler = useCallback((lens, newValue) => onValueChange(lens.set(newValue)(value)), [value, onValueChange]);
    const updateCoordinates = useCallback((keyPoints) => {
        createHandler(keyPointsLens, keyPoints);
    }, [createHandler]);
    const updatePriceLevels = useCallback((fibParts) => createHandler(priceLevelLens, fibPartsToGannBoxCoeffs(fibParts)), [createHandler]);
    const updateTimeLevels = useCallback((fibParts) => createHandler(timeLevelLens, fibPartsToGannBoxCoeffs(fibParts)), [createHandler]);
    const priceLevelsFibonacciParts = useMemo(() => gannBoxCoeffsToFibParts(coefficients.priceLevel), [coefficients.priceLevel]);
    const timeLevelsFibonacciParts = useMemo(() => gannBoxCoeffsToFibParts(coefficients.timeLevel), [coefficients.timeLevel]);
    return (React.createElement(React.Fragment, null,
        React.createElement(DrawingSettingsSection, { title: coordinatesSectionDict.title },
            React.createElement(DateCoordinatesGroup, { value: value.keyPoints, onValueChange: updateCoordinates, instrument: instrument, drawingsDict: drawingsDict, currentTimezone: currentTimezone, withPrice: true })),
        React.createElement(DrawingSettingsSection, { title: labelsSectionDict.title },
            React.createElement(CoeffGroup, { value: value, onValueChange: onValueChange, drawingsDict: drawingsDict })),
        React.createElement(DrawingSettingsSection, { title: styleSectionDict.title },
            React.createElement(BackgroundFillShortGroup, { value: value, onValueChange: onValueChange, drawingsDict: drawingsDict })),
        React.createElement(DrawingSettingsSection, { title: drawingsDict.popup.sections.gann.price + ' ' + drawingsDict.popup.sections.gann.levels },
            React.createElement(FibonacciStylesGroup, { value: priceLevelsFibonacciParts, onValueChange: updatePriceLevels, palette: palette })),
        React.createElement(DrawingSettingsSection, { title: drawingsDict.popup.sections.gann.time + ' ' + drawingsDict.popup.sections.gann.levels },
            React.createElement(FibonacciStylesGroup, { value: timeLevelsFibonacciParts, onValueChange: updateTimeLevels, palette: palette }))));
});
function gannBoxCoeffsToFibParts(gannBoxCoeffs) {
    return pipe(gannBoxCoeffs, array.map(gbc => ({ ...gbc, ...gbc.line, coefficient: gbc.value })));
}
function fibPartsToGannBoxCoeffs(fibParts) {
    return pipe(fibParts, array.map(fp => ({
        line: {
            lineColor: fp.lineColor,
            lineDash: fp.lineDash,
            lineWidth: fp.lineWidth,
            lineCap: fp.lineCap,
            lineVisibility: fp.lineVisibility,
        },
        value: fp.coefficient,
        visible: fp.visible,
    })));
}
