import { array } from 'fp-ts';
import { pipe } from 'fp-ts/function';
import { Lens } from 'monocle-ts';
import React, { memo, useCallback } from 'react';
import { DrawingSettingsSection } from '../drawing-settings-section/drawing-settings-section.component';
import { BackgroundFillShortGroup } from './components/groups/background-fill-short-group.component';
import { DateCoordinatesGroup } from './components/groups/date-coordinates-group.component';
import { FibLabelsGroup } from './components/groups/fib-labels-group.component';
import { FibLineStyleGroup } from './components/groups/fib-line-style-group.component';
import { FibonacciStylesGroup } from './components/groups/fib-styles-group.component';
const fibonacciTimeExtensionLens = Lens.fromPath();
const keyPointsLens = fibonacciTimeExtensionLens(['keyPoints']);
const zonesLens = fibonacciTimeExtensionLens(['properties', 'zones']);
export const FibonacciTimeExtensionSettings = memo((props) => {
    const { value, onValueChange, instrument, currentTimezone, drawingsDict, palette } = props;
    const drawingProperties = value.properties;
    const styleSectionDict = drawingsDict.popup.sections.style;
    const labelsSectionDict = drawingsDict.popup.sections.labels;
    const coordinatesSectionDict = drawingsDict.popup.sections.coordinates;
    const createHandler = useCallback((lens, newValue) => onValueChange(lens.set(newValue)(value)), [value, onValueChange]);
    const updateCoordinatesHandler = useCallback((value) => createHandler(keyPointsLens, value), [createHandler]);
    const updateCoordinates = useCallback((changedCoordinates) => updateCoordinatesHandler([...changedCoordinates]), [updateCoordinatesHandler]);
    const updateFibTimeExtParts = useCallback((fibZones) => createHandler(zonesLens, fibZones), [createHandler]);
    const applyLinePropsToZones = useCallback(() => pipe(drawingProperties.zones, array.map(level => ({
        ...level,
        lineWidth: drawingProperties.line.lineWidth,
        lineColor: drawingProperties.line.lineColor,
        lineDash: drawingProperties.line.lineDash,
    })), updateFibTimeExtParts), [drawingProperties, updateFibTimeExtParts]);
    return (React.createElement(React.Fragment, null,
        React.createElement(DrawingSettingsSection, { title: coordinatesSectionDict.title },
            React.createElement(DateCoordinatesGroup, { value: value.keyPoints, onValueChange: updateCoordinates, drawingsDict: drawingsDict, instrument: instrument, currentTimezone: currentTimezone, withPrice: true })),
        React.createElement(DrawingSettingsSection, { title: labelsSectionDict.title },
            React.createElement(FibLabelsGroup, { value: value, onValueChange: onValueChange, drawingsDict: drawingsDict })),
        React.createElement(DrawingSettingsSection, { title: styleSectionDict.title },
            React.createElement(FibLineStyleGroup, { value: value, onValueChange: onValueChange, palette: palette, drawingsDict: drawingsDict, applyToAll: applyLinePropsToZones }),
            React.createElement(FibonacciStylesGroup, { value: drawingProperties.zones, onValueChange: updateFibTimeExtParts, palette: palette }),
            React.createElement(BackgroundFillShortGroup, { value: value, onValueChange: onValueChange, drawingsDict: drawingsDict }))));
});
