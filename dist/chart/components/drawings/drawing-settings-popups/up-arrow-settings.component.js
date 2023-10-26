import React, { memo, useCallback } from 'react';
import { DateCoordinatesGroup } from './components/groups/date-coordinates-group.component';
import { Lens } from 'monocle-ts';
import { DrawingSettingsSection } from '../drawing-settings-section/drawing-settings-section.component';
import { LineStyleGroup } from './components/groups/line-style-group.component';
const upArrowLens = Lens.fromPath();
const keyPointsLens = upArrowLens(['keyPoints']);
export const UpArrowSettings = memo((props) => {
    const { value, onValueChange, palette, instrument, currentTimezone, drawingsDict } = props;
    const coordinatesSectionDict = drawingsDict.popup.sections.coordinates;
    const styleSectionDict = drawingsDict.popup.sections.style;
    const createHandler = useCallback((lens, newValue) => onValueChange(lens.set(newValue)(value)), [value, onValueChange]);
    const updateCoordinates = useCallback((keyPoints) => createHandler(keyPointsLens, keyPoints), [createHandler]);
    return (React.createElement(React.Fragment, null,
        React.createElement(DrawingSettingsSection, { title: coordinatesSectionDict.title },
            React.createElement(DateCoordinatesGroup, { value: value.keyPoints, onValueChange: updateCoordinates, instrument: instrument, drawingsDict: drawingsDict, currentTimezone: currentTimezone, withPrice: true })),
        React.createElement(DrawingSettingsSection, { title: styleSectionDict.title },
            React.createElement(LineStyleGroup, { value: value, onValueChange: onValueChange, palette: palette }))));
});
