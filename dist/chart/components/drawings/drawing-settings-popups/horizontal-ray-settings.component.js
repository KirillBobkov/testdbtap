import React, { memo, useCallback } from 'react';
import { DrawingSettingsGroup } from '../drawing-settings-section/drawing-settings-group';
import { DrawingSettingsItem } from '../drawing-settings-section/drawing-settings-item';
import { Checkbox } from '../../../../chart-kit/Checkbox/Checkbox.component';
import { Lens } from 'monocle-ts';
import { DateCoordinatesGroup } from './components/groups/date-coordinates-group.component';
import { DrawingSettingsCheckboxStyled } from '../drawing-settings-section/drawing-settings-common.styled';
import { DrawingSettingsSection } from '../drawing-settings-section/drawing-settings-section.component';
import { LineStyleGroup } from './components/groups/line-style-group.component';
const pathLens = Lens.fromPath();
const HRKeyPoints = pathLens(['keyPoints']);
const HRShowPrice = pathLens(['properties', 'showPrice']);
const HRShowTime = pathLens(['properties', 'showTime']);
export const HorizontalRaySettings = memo((props) => {
    const drawingProperties = props.value.properties;
    const { value, onValueChange, palette, instrument, currentTimezone, drawingsDict } = props;
    const coordinatesSectionDict = drawingsDict.popup.sections.coordinates;
    const styleSectionDict = drawingsDict.popup.sections.style;
    const createHandler = useCallback((lens, newValue) => onValueChange(lens.set(newValue)(value)), [value, onValueChange]);
    const updateCoordinatesHandler = useCallback((value) => createHandler(HRKeyPoints, value), [createHandler]);
    const updateCoordinates = useCallback((changedCoordinates) => updateCoordinatesHandler([...changedCoordinates]), [updateCoordinatesHandler]);
    const updateShowPrice = useCallback((isShowPrice) => createHandler(HRShowPrice, isShowPrice), [createHandler]);
    const updateShowTime = useCallback((isShowTime) => createHandler(HRShowTime, isShowTime), [createHandler]);
    return (React.createElement(React.Fragment, null,
        React.createElement(DrawingSettingsSection, { title: coordinatesSectionDict.title },
            React.createElement(DateCoordinatesGroup, { value: value.keyPoints, onValueChange: updateCoordinates, instrument: instrument, drawingsDict: drawingsDict, currentTimezone: currentTimezone, withPrice: true }),
            React.createElement(DrawingSettingsGroup, null,
                React.createElement(DrawingSettingsItem, null,
                    React.createElement(DrawingSettingsCheckboxStyled, null,
                        React.createElement(Checkbox, { value: drawingProperties.showPrice, onValueChange: updateShowPrice }),
                        React.createElement("span", null, coordinatesSectionDict.priceCheckbox))),
                React.createElement(DrawingSettingsItem, null,
                    React.createElement(DrawingSettingsCheckboxStyled, null,
                        React.createElement(Checkbox, { value: drawingProperties.showTime, onValueChange: updateShowTime }),
                        React.createElement("span", null, coordinatesSectionDict.timeCheckbox))))),
        React.createElement(DrawingSettingsSection, { title: styleSectionDict.title },
            React.createElement(LineStyleGroup, { value: value, onValueChange: onValueChange, palette: palette }))));
});
