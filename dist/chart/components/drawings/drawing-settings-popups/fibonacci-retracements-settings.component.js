import React, { memo, useCallback } from 'react';
import { DateCoordinatesGroup } from './components/groups/date-coordinates-group.component';
import { FibonacciStylesGroup } from './components/groups/fib-styles-group.component';
import { DrawingSettingsSection } from '../drawing-settings-section/drawing-settings-section.component';
import { Lens } from 'monocle-ts';
import { ExtendGroup } from './components/groups/extend-group.component';
import { pipe } from 'fp-ts/function';
import { array } from 'fp-ts';
import { FibLabelsGroup } from './components/groups/fib-labels-group.component';
import { PriceCoeffGroup } from './components/groups/price-coeff-group.component';
import { BackgroundFillShortGroup } from './components/groups/background-fill-short-group.component';
import { FibLineStyleGroup } from './components/groups/fib-line-style-group.component';
const fibonacciRetracementsLens = Lens.fromPath();
const fibRetracementsKeyPointsLens = fibonacciRetracementsLens(['keyPoints']);
const fibRetracementsLevelsLens = fibonacciRetracementsLens(['properties', 'levels']);
export const FibonacciRetracementsSettings = memo((props) => {
    const { value, onValueChange, palette, instrument, currentTimezone, drawingsDict } = props;
    const drawingProperties = value.properties;
    const labelsSectionDict = drawingsDict.popup.sections.labels;
    const styleSectionDict = drawingsDict.popup.sections.style;
    const extendSectionDict = drawingsDict.popup.sections.extend;
    const coordinatesSectionDict = drawingsDict.popup.sections.coordinates;
    const createHandler = useCallback((lens, newValue) => onValueChange(lens.set(newValue)(value)), [value, onValueChange]);
    const updateFibonacciRetracementsParts = useCallback((fibParts) => createHandler(fibRetracementsLevelsLens, fibParts), [createHandler]);
    const updateCoordinates = useCallback((keyPoints) => createHandler(fibRetracementsKeyPointsLens, keyPoints), [createHandler]);
    const applyToAll = useCallback(() => pipe(drawingProperties.levels, array.map(level => ({
        ...level,
        lineWidth: drawingProperties.line.lineWidth,
        lineColor: drawingProperties.line.lineColor,
        lineDash: drawingProperties.line.lineDash,
    })), updateFibonacciRetracementsParts), [updateFibonacciRetracementsParts, drawingProperties]);
    return (React.createElement(React.Fragment, null,
        React.createElement(DrawingSettingsSection, { title: coordinatesSectionDict.title },
            React.createElement(DateCoordinatesGroup, { value: value.keyPoints, onValueChange: updateCoordinates, drawingsDict: drawingsDict, instrument: instrument, currentTimezone: currentTimezone, withPrice: true })),
        React.createElement(DrawingSettingsSection, { title: labelsSectionDict.title },
            React.createElement(FibLabelsGroup, { value: value, onValueChange: onValueChange, drawingsDict: drawingsDict }),
            React.createElement(PriceCoeffGroup, { value: value, onValueChange: onValueChange, drawingsDict: drawingsDict })),
        React.createElement(DrawingSettingsSection, { title: styleSectionDict.title },
            React.createElement(FibLineStyleGroup, { value: value, onValueChange: onValueChange, palette: palette, drawingsDict: drawingsDict, applyToAll: applyToAll }),
            React.createElement(FibonacciStylesGroup, { value: drawingProperties.levels, onValueChange: updateFibonacciRetracementsParts, palette: palette }),
            React.createElement(BackgroundFillShortGroup, { value: value, onValueChange: onValueChange, drawingsDict: drawingsDict })),
        React.createElement(DrawingSettingsSection, { title: extendSectionDict.title },
            React.createElement(ExtendGroup, { value: value, onValueChange: onValueChange, drawingsDict: drawingsDict }))));
});
