import React, { memo, useCallback } from 'react';
import { DateCoordinatesGroup } from './components/groups/date-coordinates-group.component';
import { Lens } from 'monocle-ts';
import { DrawingSettingsSection } from '../drawing-settings-section/drawing-settings-section.component';
import { LineStyleGroup } from './components/groups/line-style-group.component';
import { BackgroundFillGroup } from './components/groups/background-fill-group.component';
const arcLens = Lens.fromPath();
const keyPointsLens = arcLens(['keyPoints']);
export const ArcSettings = memo((props) => {
    const { value, onValueChange, palette, drawingsDict, instrument, currentTimezone } = props;
    const dateCoordinatesSectionDict = drawingsDict.popup.sections.coordinates;
    const styleSectionDict = drawingsDict.popup.sections.style;
    const createHandler = useCallback((lens, newValue) => onValueChange(lens.set(newValue)(value)), [value, onValueChange]);
    const updateCoordinatesHandler = useCallback((value) => createHandler(keyPointsLens, value), [createHandler]);
    const updateCoordinates = useCallback((changedCoordinates) => updateCoordinatesHandler([...changedCoordinates]), [updateCoordinatesHandler]);
    return (React.createElement(React.Fragment, null,
        React.createElement(DrawingSettingsSection, { title: dateCoordinatesSectionDict.title },
            React.createElement(DateCoordinatesGroup, { value: value.keyPoints, onValueChange: updateCoordinates, instrument: instrument, drawingsDict: drawingsDict, currentTimezone: currentTimezone, withPrice: true })),
        React.createElement(DrawingSettingsSection, { title: styleSectionDict.title },
            React.createElement(LineStyleGroup, { value: value, onValueChange: onValueChange, palette: palette }),
            React.createElement(BackgroundFillGroup, { value: value, onValueChange: onValueChange, palette: palette, drawingsDict: drawingsDict }))));
});
