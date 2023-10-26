import React, { memo, useCallback } from 'react';
import { DateCoordinatesGroup } from './components/groups/date-coordinates-group.component';
import { Lens } from 'monocle-ts';
import { ExtendGroup } from './components/groups/extend-group.component';
import { DrawingSettingsSection } from '../drawing-settings-section/drawing-settings-section.component';
import { LineStyleGroup } from './components/groups/line-style-group.component';
import { BackgroundFillGroup } from './components/groups/background-fill-group.component';
const curveLens = Lens.fromPath();
const keyPointsLens = curveLens(['keyPoints']);
export const CurveSettings = memo((props) => {
    const { value, onValueChange, palette, drawingsDict, instrument, currentTimezone } = props;
    const extendSectionDict = drawingsDict.popup.sections.extend;
    const coordinatesSectionDict = drawingsDict.popup.sections.coordinates;
    const styleSectionDict = drawingsDict.popup.sections.style;
    const createHandler = useCallback((lens, newValue) => onValueChange(lens.set(newValue)(value)), [value, onValueChange]);
    const updateCoordinatesHandler = useCallback((value) => createHandler(keyPointsLens, value), [createHandler]);
    const updateCoordinates = useCallback((changedCoordinates) => updateCoordinatesHandler([...changedCoordinates]), [updateCoordinatesHandler]);
    return (React.createElement(React.Fragment, null,
        React.createElement(DrawingSettingsSection, { title: coordinatesSectionDict.title },
            React.createElement(DateCoordinatesGroup, { value: value.keyPoints, onValueChange: updateCoordinates, instrument: instrument, drawingsDict: drawingsDict, currentTimezone: currentTimezone, withPrice: true })),
        React.createElement(DrawingSettingsSection, { title: styleSectionDict.title },
            React.createElement(LineStyleGroup, { value: value, onValueChange: onValueChange, palette: palette }),
            React.createElement(BackgroundFillGroup, { value: value, onValueChange: onValueChange, palette: palette, drawingsDict: drawingsDict })),
        React.createElement(DrawingSettingsSection, { title: extendSectionDict.title },
            React.createElement(ExtendGroup, { value: value, onValueChange: onValueChange, drawingsDict: drawingsDict }))));
});
