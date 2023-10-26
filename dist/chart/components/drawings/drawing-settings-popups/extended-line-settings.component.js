import React, { memo, useCallback } from 'react';
import { DateCoordinatesGroup } from './components/groups/date-coordinates-group.component';
import { Lens } from 'monocle-ts';
import { ExtendGroup } from './components/groups/extend-group.component';
import { LabelsGroup } from './components/groups/labels-group.component';
import { DrawingSettingsSection } from '../drawing-settings-section/drawing-settings-section.component';
import { LineStyleLineEndingsGroup } from './components/groups/line-style-endings-group.component';
import { MeasureBoxGroup } from './components/groups/measure-box-group.component';
const extendedLineLens = Lens.fromPath();
const extendedLineKeyPoints = extendedLineLens(['keyPoints']);
export const ExtendedLineSettings = memo((props) => {
    const { value, onValueChange, palette, instrument, currentTimezone, drawingsDict } = props;
    const extendSectionDict = drawingsDict.popup.sections.extend;
    const labelsSectionDict = drawingsDict.popup.sections.labels;
    const coordinatesSectionDict = drawingsDict.popup.sections.coordinates;
    const styleSectionDict = drawingsDict.popup.sections.style;
    const measureBoxSectionDict = drawingsDict.popup.sections.measureBox;
    const createHandler = useCallback((lens, newValue) => onValueChange(lens.set(newValue)(value)), [value, onValueChange]);
    const updateCoordinatesHandler = useCallback((value) => createHandler(extendedLineKeyPoints, value), [createHandler]);
    const updateCoordinates = useCallback((changedCoordinates) => updateCoordinatesHandler([...changedCoordinates]), [updateCoordinatesHandler]);
    return (React.createElement(React.Fragment, null,
        React.createElement(DrawingSettingsSection, { title: coordinatesSectionDict.title },
            React.createElement(DateCoordinatesGroup, { value: value.keyPoints, onValueChange: updateCoordinates, instrument: instrument, drawingsDict: drawingsDict, currentTimezone: currentTimezone, withPrice: true })),
        React.createElement(DrawingSettingsSection, { title: styleSectionDict.title },
            React.createElement(LineStyleLineEndingsGroup, { value: value, onValueChange: onValueChange, palette: palette, drawingsDict: drawingsDict })),
        React.createElement(DrawingSettingsSection, { title: labelsSectionDict.title },
            React.createElement(LabelsGroup, { value: value, onValueChange: onValueChange, drawingsDict: drawingsDict })),
        React.createElement(DrawingSettingsSection, { title: measureBoxSectionDict.title },
            React.createElement(MeasureBoxGroup, { value: value, onValueChange: onValueChange, drawingsDict: drawingsDict })),
        React.createElement(DrawingSettingsSection, { title: extendSectionDict.title },
            React.createElement(ExtendGroup, { value: value, onValueChange: onValueChange, drawingsDict: drawingsDict }))));
});
