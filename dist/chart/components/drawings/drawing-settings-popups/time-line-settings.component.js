import React, { memo, useCallback } from 'react';
import { DateCoordinatesGroup } from './components/groups/date-coordinates-group.component';
import { DrawingSettingsItem } from '../drawing-settings-section/drawing-settings-item';
import { Checkbox } from '../../../../chart-kit/Checkbox/Checkbox.component';
import { DrawingSettingsCheckboxStyled } from '../drawing-settings-section/drawing-settings-common.styled';
import { Lens } from 'monocle-ts';
import { DrawingSettingsSection } from '../drawing-settings-section/drawing-settings-section.component';
import { LineStyleGroup } from './components/groups/line-style-group.component';
const timeLineLens = Lens.fromPath();
const timeLineKeyPointsLens = timeLineLens(['keyPoints']);
const timeLineShowTimeLens = timeLineLens(['properties', 'showTime']);
export const TimeLineSettings = memo((props) => {
    const { value, onValueChange, palette, instrument, currentTimezone, drawingsDict } = props;
    const drawingProperties = props.value.properties;
    const coordinatesSectionDict = drawingsDict.popup.sections.coordinates;
    const styleSectionDict = drawingsDict.popup.sections.style;
    const createHandler = useCallback((lens, newValue) => onValueChange(lens.set(newValue)(value)), [value, onValueChange]);
    const updateCoordinates = useCallback((keyPoints) => createHandler(timeLineKeyPointsLens, keyPoints), [createHandler]);
    const updateShowTime = useCallback((isShowTime) => createHandler(timeLineShowTimeLens, isShowTime), [createHandler]);
    return (React.createElement(React.Fragment, null,
        React.createElement(DrawingSettingsSection, { title: coordinatesSectionDict.title },
            React.createElement(DateCoordinatesGroup, { value: value.keyPoints, onValueChange: updateCoordinates, instrument: instrument, drawingsDict: drawingsDict, currentTimezone: currentTimezone }),
            React.createElement(DrawingSettingsItem, null,
                React.createElement(DrawingSettingsCheckboxStyled, null,
                    React.createElement(Checkbox, { value: drawingProperties.showTime, onValueChange: updateShowTime }),
                    React.createElement("span", null, coordinatesSectionDict.timeCheckbox)))),
        React.createElement(DrawingSettingsSection, { title: styleSectionDict.title },
            React.createElement(LineStyleGroup, { value: value, onValueChange: onValueChange, palette: palette }))));
});
