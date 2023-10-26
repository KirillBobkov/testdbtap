import React, { memo, useCallback, useMemo } from 'react';
import { DrawingSettingsSection } from '../drawing-settings-section/drawing-settings-section.component';
import { DateCoordinatesGroup } from './components/groups/date-coordinates-group.component';
import { DrawingSettingsItem } from '../drawing-settings-section/drawing-settings-item';
import { Checkbox } from '../../../../chart-kit/Checkbox/Checkbox.component';
import { Lens } from 'monocle-ts';
import { CoeffGroup } from './components/groups/coeff-group.component';
import { BackgroundFillShortGroup } from './components/groups/background-fill-short-group.component';
import { DrawingSettingsGroup } from '../drawing-settings-section/drawing-settings-group';
import { pipe } from 'fp-ts/function';
import { array, option } from 'fp-ts';
import { constVoid } from 'fp-ts/function';
import { DrawingSettingsCheckboxStyled } from '../drawing-settings-section/drawing-settings-common.styled';
import { LineStyleControl } from './components/line-style-control.component';
const gannFanLens = Lens.fromPath();
const raysLens = gannFanLens(['properties', 'rays']);
const keyPointsLens = gannFanLens(['keyPoints']);
const gannFanRayLineLens = Lens.fromProp()('line');
const gannFanRayVisibilityLens = Lens.fromProp()('visible');
export const GannFannSettings = memo((props) => {
    const { value, onValueChange, palette, instrument, currentTimezone, drawingsDict } = props;
    const drawingProperties = value.properties;
    const labelsSectionDict = drawingsDict.popup.sections.labels;
    const styleSectionDict = drawingsDict.popup.sections.style;
    const coordinatesSectionDict = drawingsDict.popup.sections.coordinates;
    const gannSectionDict = drawingsDict.popup.sections.gann;
    const rays = drawingProperties.rays;
    const createHandler = useCallback((lens, newValue) => onValueChange(lens.set(newValue)(value)), [value, onValueChange]);
    const updateRays = useCallback((value) => createHandler(raysLens, value), [createHandler]);
    const updateCoordinates = useCallback((keyPoints) => {
        createHandler(keyPointsLens, keyPoints);
    }, [createHandler]);
    const updateRayLineStyles = useCallback((line, index) => pipe(rays, array.modifyAt(index, gannFanRayLineLens.set(line)), option.fold(constVoid, updateRays)), [rays, updateRays]);
    const updateRayVisibility = useCallback((visible, index) => pipe(rays, array.modifyAt(index, gannFanRayVisibilityLens.set(visible)), option.fold(constVoid, updateRays)), [rays, updateRays]);
    return (React.createElement(React.Fragment, null,
        React.createElement(DrawingSettingsSection, { title: coordinatesSectionDict.title },
            React.createElement(DateCoordinatesGroup, { value: value.keyPoints, onValueChange: updateCoordinates, instrument: instrument, drawingsDict: drawingsDict, currentTimezone: currentTimezone, withPrice: true })),
        React.createElement(DrawingSettingsSection, { title: labelsSectionDict.title },
            React.createElement(CoeffGroup, { value: value, onValueChange: onValueChange, drawingsDict: drawingsDict })),
        React.createElement(DrawingSettingsSection, { title: styleSectionDict.title },
            React.createElement(BackgroundFillShortGroup, { value: value, onValueChange: onValueChange, drawingsDict: drawingsDict })),
        React.createElement(DrawingSettingsSection, { title: gannSectionDict.fans }, rays.map((ray, index) => (React.createElement(GannFanStyleItem, { key: `ray-${index}`, ray: ray, palette: palette, index: index, changeLineStyle: updateRayLineStyles, changeVisibility: updateRayVisibility }))))));
});
const GannFanStyleItem = memo(props => {
    const { ray, palette, changeVisibility, changeLineStyle, index } = props;
    const changeVisibilityHandler = useCallback((visible) => changeVisibility(Boolean(visible), index), [changeVisibility, index]);
    const changeLineStyleHandler = useCallback((line) => changeLineStyle(line, index), [changeLineStyle, index]);
    const coef = useMemo(() => ray.coefficient <= 1
        ? (100 / (ray.coefficient * 100)).toFixed() + ' / 1'
        : '1 / ' + ((ray.coefficient * 100) / 100).toFixed(), [ray.coefficient]);
    return (React.createElement(DrawingSettingsGroup, { noGapItems: true },
        React.createElement(DrawingSettingsItem, null,
            React.createElement(DrawingSettingsCheckboxStyled, null,
                React.createElement(Checkbox, { value: ray.visible, onValueChange: changeVisibilityHandler }),
                React.createElement("span", null, coef))),
        React.createElement(LineStyleControl, { noGap: true, noGapItems: true, value: ray.line, palette: palette, onValueChange: changeLineStyleHandler })));
});
