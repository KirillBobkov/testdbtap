import React, { useCallback, useMemo } from 'react';
import { Lens } from 'monocle-ts';
import { typedMemo } from '../../../../../../utils/typed-memo';
import { DrawingSettingsGroup } from '../../../drawing-settings-section/drawing-settings-group';
import { DrawingSettingsItem } from '../../../drawing-settings-section/drawing-settings-item';
import { LineStyleControl } from '../line-style-control.component';
import { DrawingSettingsCheckboxStyled } from '../../../drawing-settings-section/drawing-settings-common.styled';
import { Checkbox } from '../../../../../../chart-kit/Checkbox/Checkbox.component';
import { PopupEventTargetConsumer } from '../../../../../../chart-kit/Popup/PopupUI.component';
const BASE_LINE_STYLES = { lineDash: [], lineWidth: 1, lineColor: 'rgba(255,170,0,1)' };
function LeftBorderGroupSettings(props) {
    const { leftBorderStyleLens } = useMemo(() => {
        const drawingModelLens = Lens.fromPath();
        const leftBorderStyleLens = drawingModelLens(['properties', 'borders', 'left']);
        return {
            leftBorderStyleLens,
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const { value, onValueChange, drawingsDict, palette } = props;
    const drawingProperties = value.properties;
    const createHandler = useCallback((lens, newValue) => onValueChange(lens.set(newValue)(value)), [value, onValueChange]);
    const updateLeftBorderStyle = useCallback((line) => createHandler(leftBorderStyleLens, line), [createHandler, leftBorderStyleLens]);
    const updateLeftBorderVisibility = useCallback((value) => {
        value ? updateLeftBorderStyle(BASE_LINE_STYLES) : createHandler(leftBorderStyleLens, undefined);
    }, [updateLeftBorderStyle, createHandler, leftBorderStyleLens]);
    const isLeftBorder = useMemo(() => drawingProperties.borders.left === undefined, [drawingProperties.borders.left]);
    return (React.createElement(PopupEventTargetConsumer, null, eventTarget => (React.createElement(DrawingSettingsGroup, null,
        React.createElement(DrawingSettingsItem, null,
            React.createElement(LineStyleControl, { value: drawingProperties.borders.left || drawingProperties.line, onValueChange: updateLeftBorderStyle, palette: palette, parentEventTarget: eventTarget, noGap: true, noGapItems: true })),
        React.createElement(DrawingSettingsItem, null,
            React.createElement(DrawingSettingsCheckboxStyled, null,
                React.createElement(Checkbox, { value: !isLeftBorder, onValueChange: updateLeftBorderVisibility }),
                React.createElement("span", null, drawingsDict.popup.sections.borders.left)))))));
}
export const LeftBorderGroup = typedMemo(LeftBorderGroupSettings);
