import React, { memo, useCallback, useMemo } from 'react';
import { Checkbox } from '../../../../chart-kit/Checkbox/Checkbox.component';
import { DrawingSettingsSection } from '../drawing-settings-section/drawing-settings-section.component';
import { DateCoordinatesGroup } from './components/groups/date-coordinates-group.component';
import { DrawingSettingsCheckboxStyled } from '../drawing-settings-section/drawing-settings-common.styled';
import { DrawingSettingsGroup } from '../drawing-settings-section/drawing-settings-group';
import { Lens } from 'monocle-ts';
import { BackgroundFillShortGroup } from './components/groups/background-fill-short-group.component';
import { DrawingSettingsItem } from '../drawing-settings-section/drawing-settings-item';
import { pipe } from 'fp-ts/function';
import { array, option } from 'fp-ts';
import { constVoid } from 'fp-ts/function';
import styled from 'styled-components';
import { LineStyleControl } from './components/line-style-control.component';
const gannSquareLens = Lens.fromPath();
const levelsLens = gannSquareLens(['properties', 'coefficients', 'levels']);
const fansLens = gannSquareLens(['properties', 'coefficients', 'fans']);
const arcsLens = gannSquareLens(['properties', 'coefficients', 'arcs']);
const keyPointsLens = gannSquareLens(['keyPoints']);
const gsqCoefLineLens = Lens.fromProp()('line');
const gsqCoefVisibilityLens = Lens.fromProp()('visible');
const arcsCoefs = ['1', '1 ', '1.5', '2', '2', '3', '3', '4', '4', '5', '5 '];
const getDecimal = (value, showInteger) => {
    if (showInteger) {
        return value;
    }
    else {
        return value <= 1 ? '1 x ' + (100 / (value * 100)).toFixed() : `${((value * 100) / 100).toFixed()} x 1`;
    }
};
const updateGsqCoeffVisibility = (visible, index, callback) => (arr) => pipe(arr, array.modifyAt(index, gsqCoefVisibilityLens.set(visible)), option.fold(constVoid, callback));
const updateGsqCoeffLineStyles = (line, index, callback) => (arr) => pipe(arr, array.modifyAt(index, gsqCoefLineLens.set(line)), option.fold(constVoid, callback));
export const GannSquareSettings = memo((props) => {
    const { value, palette, instrument, currentTimezone, drawingsDict, onValueChange } = props;
    const { coefficients } = value.properties;
    const drawingsDictionary = drawingsDict.popup.sections;
    const coordinatesSectionDict = drawingsDict.popup.sections.coordinates;
    const styleSectionDict = drawingsDict.popup.sections.style;
    const createHandler = useCallback((lens, newValue) => onValueChange(lens.set(newValue)(value)), [value, onValueChange]);
    const updateCoordinates = useCallback((keyPoints) => createHandler(keyPointsLens, keyPoints), [createHandler]);
    const updateLevels = useCallback((value) => createHandler(levelsLens, value), [createHandler]);
    const updateFans = useCallback((value) => createHandler(fansLens, value), [createHandler]);
    const updateArcs = useCallback((value) => createHandler(arcsLens, value), [createHandler]);
    const updateLevelLineStyles = useCallback((line, index) => pipe(coefficients.levels, updateGsqCoeffLineStyles(line, index, updateLevels)), [coefficients.levels, updateLevels]);
    const updateLevelVisibility = useCallback((visible, index) => pipe(coefficients.levels, updateGsqCoeffVisibility(visible, index, updateLevels)), [coefficients.levels, updateLevels]);
    const updateFanLineStyles = useCallback((line, index) => pipe(coefficients.fans, updateGsqCoeffLineStyles(line, index, updateFans)), [coefficients.fans, updateFans]);
    const updateFanVisibility = useCallback((visible, index) => pipe(coefficients.fans, updateGsqCoeffVisibility(visible, index, updateFans)), [coefficients.fans, updateFans]);
    const updateArcLineStyles = useCallback((line, index) => pipe(coefficients.arcs, updateGsqCoeffLineStyles(line, index, updateArcs)), [coefficients.arcs, updateArcs]);
    const updateArcVisibility = useCallback((visible, index) => pipe(coefficients.arcs, updateGsqCoeffVisibility(visible, index, updateArcs)), [coefficients.arcs, updateArcs]);
    return (React.createElement(React.Fragment, null,
        React.createElement(DrawingSettingsSection, { title: coordinatesSectionDict.title },
            React.createElement(DateCoordinatesGroup, { value: value.keyPoints, onValueChange: updateCoordinates, instrument: instrument, drawingsDict: drawingsDict, currentTimezone: currentTimezone, withPrice: true })),
        React.createElement(DrawingSettingsSection, { title: styleSectionDict.title },
            React.createElement(BackgroundFillShortGroup, { value: value, onValueChange: onValueChange, drawingsDict: drawingsDict })),
        React.createElement(DrawingSettingsSection, { title: drawingsDictionary.gann.levels }, coefficients.levels.map((level, index) => (React.createElement(GannSquareStyleItem, { showInteger: true, key: `level-${index}`, gsqCoef: level, index: index, palette: palette, changeVisibility: updateLevelVisibility, changeLineStyle: updateLevelLineStyles })))),
        React.createElement(DrawingSettingsSection, { title: drawingsDictionary.gann.fans }, coefficients.fans.map((fan, index) => (React.createElement(GannSquareStyleItem, { key: `fan-${index}`, gsqCoef: fan, index: index, palette: palette, changeVisibility: updateFanVisibility, changeLineStyle: updateFanLineStyles })))),
        React.createElement(DrawingSettingsSection, { title: drawingsDictionary.gann.arcs }, coefficients.arcs.map((arc, index) => (React.createElement(GannSquareStyleItem, { key: `arc-${index}`, gsqCoef: arc, index: index, palette: palette, changeVisibility: updateArcVisibility, changeLineStyle: updateArcLineStyles }))))));
});
const GannSquareStyleItem = memo(props => {
    const { gsqCoef, palette, changeVisibility, changeLineStyle, index, showInteger = false } = props;
    const changeVisibilityHandler = useCallback((visible) => changeVisibility(Boolean(visible), index), [changeVisibility, index]);
    const changeLineStyleHandler = useCallback((line) => changeLineStyle(line, index), [changeLineStyle, index]);
    const coef = useMemo(() => gsqCoef.type
        ? gsqCoef.type === 'toZero'
            ? arcsCoefs[index] + ' x 0'
            : arcsCoefs[index] + ' x 1'
        : getDecimal(gsqCoef.value, showInteger), [gsqCoef, index, showInteger]);
    return (React.createElement(DrawingSettingsGroup, { noGapItems: true },
        React.createElement(FixedWidthSettingsItem, null,
            React.createElement(DrawingSettingsCheckboxStyled, null,
                React.createElement(Checkbox, { value: gsqCoef.visible, onValueChange: changeVisibilityHandler }),
                React.createElement("span", null, coef))),
        React.createElement(LineStyleControl, { noGap: true, noGapItems: true, value: gsqCoef.line, palette: palette, onValueChange: changeLineStyleHandler })));
});
const FixedWidthSettingsItem = styled(DrawingSettingsItem).withConfig({ displayName: "FixedWidthSettingsItem" }) `
	width: 75px;
`;
