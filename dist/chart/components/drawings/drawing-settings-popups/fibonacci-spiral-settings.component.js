import React, { memo, useCallback } from 'react';
import { DateCoordinatesGroup } from './components/groups/date-coordinates-group.component';
import { Lens } from 'monocle-ts';
import { DrawingSettingsSection } from '../drawing-settings-section/drawing-settings-section.component';
import { LineStyleGroup } from './components/groups/line-style-group.component';
import { DrawingSettingsCheckboxStyled } from '../drawing-settings-section/drawing-settings-common.styled';
import { Checkbox } from '../../../../chart-kit/Checkbox/Checkbox.component';
import { DrawingSettingsItem } from '../drawing-settings-section/drawing-settings-item';
import { NumericStepper } from '../../../../chart-kit/NumericStepper/NumericStepper.component';
import { DrawingSettingsGroup } from '../drawing-settings-section/drawing-settings-group';
const fibonacciSpiralLens = Lens.fromPath();
const fibonacciSpiralKeyPoints = fibonacciSpiralLens(['keyPoints']);
const fibonacciSpiralcounterclockwiseLens = fibonacciSpiralLens(['properties', 'counterclockwise']);
const fibonacciSpiralSpiralLength = fibonacciSpiralLens(['properties', 'spiralLength']);
export const FibonacciSpiralSettings = memo((props) => {
    const { value, onValueChange, palette, instrument, currentTimezone, drawingsDict } = props;
    const fibonacciSpiralDict = drawingsDict.fibonacciSpiral;
    const coordinatesSectionDict = drawingsDict.popup.sections.coordinates;
    const styleSectionDict = drawingsDict.popup.sections.style;
    const createHandler = useCallback((lens, newValue) => onValueChange(lens.set(newValue)(value)), [value, onValueChange]);
    const updateCoordinatesHandler = useCallback((value) => createHandler(fibonacciSpiralKeyPoints, value), [createHandler]);
    const updateCoordinates = useCallback((changedCoordinates) => updateCoordinatesHandler([...changedCoordinates]), [updateCoordinatesHandler]);
    const updatecounterclockwise = useCallback((isConter) => createHandler(fibonacciSpiralcounterclockwiseLens, isConter), [createHandler]);
    const updateSpiralLengthHandler = useCallback((newValue) => createHandler(fibonacciSpiralSpiralLength, newValue), [createHandler]);
    return (React.createElement(React.Fragment, null,
        React.createElement(DrawingSettingsSection, { title: coordinatesSectionDict.title },
            React.createElement(DateCoordinatesGroup, { value: value.keyPoints, onValueChange: updateCoordinates, instrument: instrument, drawingsDict: drawingsDict, currentTimezone: currentTimezone, withPrice: true })),
        React.createElement(DrawingSettingsSection, { title: styleSectionDict.title },
            React.createElement(LineStyleGroup, { value: value, onValueChange: onValueChange, palette: palette }),
            React.createElement(DrawingSettingsGroup, null,
                React.createElement(DrawingSettingsItem, { label: fibonacciSpiralDict.spiralLength },
                    React.createElement(NumericStepper, { min: 0, max: Number.POSITIVE_INFINITY, step: 1, value: value.properties.spiralLength, onValueChange: updateSpiralLengthHandler }))),
            React.createElement(DrawingSettingsCheckboxStyled, null,
                React.createElement(Checkbox, { value: value.properties.counterclockwise, onValueChange: updatecounterclockwise }),
                React.createElement("span", null, fibonacciSpiralDict.counterclockwiseCheckbox)))));
});
