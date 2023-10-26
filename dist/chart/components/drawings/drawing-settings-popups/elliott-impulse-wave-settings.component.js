import React, { memo, useCallback } from 'react';
import { DrawingSettingsSection } from '../drawing-settings-section/drawing-settings-section.component';
import { DateCoordinatesGroup } from './components/groups/date-coordinates-group.component';
import { ElliotLineStyleGroup } from './components/groups/elliot-line-style-group.component';
import { ElliotDegreeGroup } from './components/groups/elliot-degree-group.component';
import { Lens } from 'monocle-ts';
const elliottImpulseWaveLens = Lens.fromPath();
const elliottImpulseWaveKeyPoints = elliottImpulseWaveLens(['keyPoints']);
export const ElliottImpulseWaveSettings = memo((props) => {
    const { value, onValueChange, instrument, currentTimezone, drawingsDict, palette } = props;
    const styleSectionDict = drawingsDict.popup.sections.style;
    const coordinatesSectionDict = drawingsDict.popup.sections.coordinates;
    const createHandler = useCallback((lens, newValue) => onValueChange(lens.set(newValue)(value)), [value, onValueChange]);
    const updateCoordinates = useCallback((keyPoints) => createHandler(elliottImpulseWaveKeyPoints, keyPoints), [createHandler]);
    return (React.createElement(React.Fragment, null,
        React.createElement(DrawingSettingsSection, { title: coordinatesSectionDict.title },
            React.createElement(DateCoordinatesGroup, { value: value.keyPoints, onValueChange: updateCoordinates, instrument: instrument, drawingsDict: drawingsDict, currentTimezone: currentTimezone, withPrice: true })),
        React.createElement(DrawingSettingsSection, { title: styleSectionDict.title },
            React.createElement(ElliotLineStyleGroup, { value: value, onValueChange: onValueChange, drawingsDict: drawingsDict, palette: palette })),
        React.createElement(DrawingSettingsSection, { title: styleSectionDict.elliottDegree },
            React.createElement(ElliotDegreeGroup, { value: value, onValueChange: onValueChange }))));
});
