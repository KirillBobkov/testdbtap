import React, { memo, useCallback } from 'react';
import { Lens } from 'monocle-ts';
import { DateCoordinatesGroup } from './components/groups/date-coordinates-group.component';
import { DrawingSettingsSection } from '../drawing-settings-section/drawing-settings-section.component';
import { FibonacciStylesGroup } from './components/groups/fib-styles-group.component';
import { FibLineStyleGroup } from './components/groups/fib-line-style-group.component';
import { BackgroundFillShortGroup } from './components/groups/background-fill-short-group.component';
import { FibLabelsGroup } from './components/groups/fib-labels-group.component';
import { pipe } from 'fp-ts/function';
import { array } from 'fp-ts';
const fibTZLens = Lens.fromPath();
const keyPointsLens = fibTZLens(['keyPoints']);
const zonesLens = fibTZLens(['properties', 'zones']);
export const FibonacciTimeZonesSettings = memo((props) => {
    const { value, onValueChange, instrument, currentTimezone, drawingsDict, palette } = props;
    const drawingProperties = value.properties;
    const styleSectionDict = drawingsDict.popup.sections.style;
    const labelsSectionDict = drawingsDict.popup.sections.labels;
    const coordinatesSectionDict = drawingsDict.popup.sections.coordinates;
    const createHandler = useCallback((lens, newValue) => onValueChange(lens.set(newValue)(value)), [value, onValueChange]);
    const updateCoordinatesHandler = useCallback((value) => createHandler(keyPointsLens, value), [createHandler]);
    const updateCoordinates = useCallback((changedCoordinates) => updateCoordinatesHandler([...changedCoordinates]), [updateCoordinatesHandler]);
    const updateFibTZParts = useCallback((fibZones) => createHandler(zonesLens, fibZones), [createHandler]);
    const applyToAll = useCallback(() => pipe(drawingProperties.zones, array.map(level => ({
        ...level,
        lineWidth: drawingProperties.line.lineWidth,
        lineColor: drawingProperties.line.lineColor,
        lineDash: drawingProperties.line.lineDash,
    })), updateFibTZParts), [drawingProperties, updateFibTZParts]);
    return (React.createElement(React.Fragment, null,
        React.createElement(DrawingSettingsSection, { title: coordinatesSectionDict.title },
            React.createElement(DateCoordinatesGroup, { value: value.keyPoints, onValueChange: updateCoordinates, drawingsDict: drawingsDict, instrument: instrument, currentTimezone: currentTimezone, withPrice: true })),
        React.createElement(DrawingSettingsSection, { title: labelsSectionDict.title },
            React.createElement(FibLabelsGroup, { value: value, onValueChange: onValueChange, drawingsDict: drawingsDict })),
        React.createElement(DrawingSettingsSection, { title: styleSectionDict.title },
            React.createElement(FibLineStyleGroup, { value: value, onValueChange: onValueChange, palette: palette, drawingsDict: drawingsDict, applyToAll: applyToAll }),
            React.createElement(FibonacciStylesGroup, { value: drawingProperties.zones, onValueChange: updateFibTZParts, palette: palette, step: 1, precision: 0, multiplier: 1 }),
            React.createElement(BackgroundFillShortGroup, { value: value, onValueChange: onValueChange, drawingsDict: drawingsDict }))));
});
