import React, { memo, useCallback } from 'react';
import { DrawingSettingsSection } from '../drawing-settings-section/drawing-settings-section.component';
import { DateCoordinatesGroup } from './components/groups/date-coordinates-group.component';
import { Lens } from 'monocle-ts';
import { array } from 'fp-ts';
import { pipe } from 'fp-ts/function';
import { FibonacciStylesGroup } from './components/groups/fib-styles-group.component';
import { FibLineStyleGroup } from './components/groups/fib-line-style-group.component';
import { BackgroundFillShortGroup } from './components/groups/background-fill-short-group.component';
import { CoeffGroup } from './components/groups/coeff-group.component';
const fibonacciRaysLens = Lens.fromPath();
const fibonacciRaysKeyPointsLens = fibonacciRaysLens(['keyPoints']);
const fibonacciRaysRaysLens = fibonacciRaysLens(['properties', 'rays']);
export const FibonacciRaysSettings = memo((props) => {
    const { value, onValueChange, palette, instrument, currentTimezone, drawingsDict } = props;
    const drawingProperties = value.properties;
    const labelsSectionDict = drawingsDict.popup.sections.labels;
    const styleSectionDict = drawingsDict.popup.sections.style;
    const coordinatesSectionDict = drawingsDict.popup.sections.coordinates;
    const createHandler = useCallback((lens, newValue) => onValueChange(lens.set(newValue)(value)), [onValueChange, value]);
    const updateCoordinates = useCallback((keyPoints) => createHandler(fibonacciRaysKeyPointsLens, keyPoints), [createHandler]);
    const applyToAll = useCallback(() => pipe(drawingProperties.rays, array.map(level => ({
        ...level,
        lineWidth: drawingProperties.line.lineWidth,
        lineColor: drawingProperties.line.lineColor,
        lineDash: drawingProperties.line.lineDash,
    })), rays => createHandler(fibonacciRaysRaysLens, rays)), [createHandler, drawingProperties]);
    const updateFibonacciRaysParts = useCallback((fibParts) => createHandler(fibonacciRaysRaysLens, fibParts), [createHandler]);
    return (React.createElement(React.Fragment, null,
        React.createElement(DrawingSettingsSection, { title: coordinatesSectionDict.title },
            React.createElement(DateCoordinatesGroup, { value: value.keyPoints, onValueChange: updateCoordinates, instrument: instrument, drawingsDict: drawingsDict, currentTimezone: currentTimezone, withPrice: true })),
        React.createElement(DrawingSettingsSection, { title: labelsSectionDict.title },
            React.createElement(CoeffGroup, { value: value, onValueChange: onValueChange, drawingsDict: drawingsDict })),
        React.createElement(DrawingSettingsSection, { title: styleSectionDict.title },
            React.createElement(FibLineStyleGroup, { value: value, onValueChange: onValueChange, palette: palette, drawingsDict: drawingsDict, applyToAll: applyToAll }),
            React.createElement(FibonacciStylesGroup, { value: drawingProperties.rays, onValueChange: updateFibonacciRaysParts, palette: palette }),
            React.createElement(BackgroundFillShortGroup, { value: value, onValueChange: onValueChange, drawingsDict: drawingsDict }))));
});
