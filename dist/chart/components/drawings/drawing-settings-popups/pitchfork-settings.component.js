import React, { memo, useCallback } from 'react';
import { DateCoordinatesGroup } from './components/groups/date-coordinates-group.component';
import { DrawingSettingsSection } from '../drawing-settings-section/drawing-settings-section.component';
import { FibonacciStylesGroup } from './components/groups/fib-styles-group.component';
import { Lens } from 'monocle-ts';
import { pipe } from 'fp-ts/function';
import { array } from 'fp-ts';
import { BackgroundFillShortGroup } from './components/groups/background-fill-short-group.component';
import { FibLineStyleGroup } from './components/groups/fib-line-style-group.component';
const pitchforkLens = Lens.fromPath();
const pitchforkKeyPointsLens = pitchforkLens(['keyPoints']);
const pitchforkLevelsLens = pitchforkLens(['properties', 'levels']);
export const PitchforkSettings = memo((props) => {
    const { value, onValueChange, palette, instrument, currentTimezone, drawingsDict } = props;
    const drawingProperties = value.properties;
    const styleSectionDict = drawingsDict.popup.sections.style;
    const coordinatesSectionDict = drawingsDict.popup.sections.coordinates;
    const createHandler = useCallback((lens, newValue) => onValueChange(lens.set(newValue)(value)), [onValueChange, value]);
    const updateCoordinates = useCallback((keyPoints) => createHandler(pitchforkKeyPointsLens, keyPoints), [createHandler]);
    const applyToAll = useCallback(() => pipe(drawingProperties.levels, array.map(level => ({
        ...level,
        lineWidth: drawingProperties.line.lineWidth,
        lineColor: drawingProperties.line.lineColor,
        lineDash: drawingProperties.line.lineDash,
    })), levels => createHandler(pitchforkLevelsLens, levels)), [createHandler, drawingProperties]);
    const updatePitchforkParts = useCallback((fibParts) => createHandler(pitchforkLevelsLens, fibParts), [createHandler]);
    return (React.createElement(React.Fragment, null,
        React.createElement(DrawingSettingsSection, { title: coordinatesSectionDict.title },
            React.createElement(DateCoordinatesGroup, { value: value.keyPoints, onValueChange: updateCoordinates, instrument: instrument, drawingsDict: drawingsDict, currentTimezone: currentTimezone, withPrice: true })),
        React.createElement(DrawingSettingsSection, { title: styleSectionDict.title },
            React.createElement(FibLineStyleGroup, { value: value, onValueChange: onValueChange, palette: palette, drawingsDict: drawingsDict, applyToAll: applyToAll }),
            React.createElement(FibonacciStylesGroup, { value: drawingProperties.levels, onValueChange: updatePitchforkParts, palette: palette }),
            React.createElement(BackgroundFillShortGroup, { value: value, onValueChange: onValueChange, drawingsDict: drawingsDict }))));
});
