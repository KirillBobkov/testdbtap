import React, { memo, useCallback } from 'react';
import { DateCoordinatesGroup } from './components/groups/date-coordinates-group.component';
import { Lens } from 'monocle-ts';
import { DrawingSettingsSection } from '../drawing-settings-section/drawing-settings-section.component';
import { RightBorderGroup } from './components/groups/right-border-group.component';
import { LeftBorderGroup } from './components/groups/left-border-group.component';
import { BackgroundFillGroup } from './components/groups/background-fill-group.component';
import { LineStyleGroup } from './components/groups/line-style-group.component';
const dateRangeLens = Lens.fromPath();
const keyPointsLens = dateRangeLens(['keyPoints']);
export const DateRangeSettings = memo((props) => {
    const { value, palette, instrument, currentTimezone, drawingsDict, onValueChange } = props;
    const styleSectionDict = drawingsDict.popup.sections.style;
    const coordinatesSectionDict = drawingsDict.popup.sections.coordinates;
    const createHandler = useCallback((lens, newValue) => onValueChange(lens.set(newValue)(value)), [value, onValueChange]);
    const updateCoordinatesHandler = useCallback((value) => createHandler(keyPointsLens, value), [createHandler]);
    const updateCoordinates = useCallback((changedCoordinates) => updateCoordinatesHandler([...changedCoordinates]), [updateCoordinatesHandler]);
    return (React.createElement(React.Fragment, null,
        React.createElement(DrawingSettingsSection, { title: coordinatesSectionDict.title },
            React.createElement(DateCoordinatesGroup, { value: value.keyPoints, onValueChange: updateCoordinates, instrument: instrument, drawingsDict: drawingsDict, currentTimezone: currentTimezone, withPrice: true })),
        React.createElement(DrawingSettingsSection, { title: styleSectionDict.title },
            React.createElement(LineStyleGroup, { value: value, onValueChange: onValueChange, palette: palette, leadingLabel: styleSectionDict.lineColor }),
            React.createElement(BackgroundFillGroup, { value: value, onValueChange: onValueChange, palette: palette, drawingsDict: drawingsDict }),
            React.createElement(LeftBorderGroup, { value: value, onValueChange: onValueChange, palette: palette, drawingsDict: drawingsDict }),
            React.createElement(RightBorderGroup, { value: value, onValueChange: onValueChange, palette: palette, drawingsDict: drawingsDict }))));
});
