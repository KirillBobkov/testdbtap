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
function RightBorderGroupSettings(props) {
    const { rightBorderStyleLens } = useMemo(() => {
        const drawingModelLens = Lens.fromPath();
        const rightBorderStyleLens = drawingModelLens(['properties', 'borders', 'right']);
        return {
            rightBorderStyleLens,
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const { value, onValueChange, drawingsDict, palette } = props;
    const drawingProperties = value.properties;
    const createHandler = useCallback((lens, newValue) => onValueChange(lens.set(newValue)(value)), [value, onValueChange]);
    const updateRightBorderStyle = useCallback((line) => createHandler(rightBorderStyleLens, line), [createHandler, rightBorderStyleLens]);
    const updateRightBorderVisibility = useCallback((value) => {
        value ? updateRightBorderStyle(BASE_LINE_STYLES) : createHandler(rightBorderStyleLens, undefined);
    }, [updateRightBorderStyle, createHandler, rightBorderStyleLens]);
    const isRightBorder = useMemo(() => drawingProperties.borders.right === undefined, [drawingProperties.borders.right]);
    return (React.createElement(PopupEventTargetConsumer, null, eventTarget => (React.createElement(DrawingSettingsGroup, null,
        React.createElement(DrawingSettingsItem, null,
            React.createElement(LineStyleControl, { value: drawingProperties.borders.right || drawingProperties.line, onValueChange: updateRightBorderStyle, palette: palette, parentEventTarget: eventTarget, noGap: true, noGapItems: true })),
        React.createElement(DrawingSettingsItem, null,
            React.createElement(DrawingSettingsCheckboxStyled, null,
                React.createElement(Checkbox, { value: !isRightBorder, onValueChange: updateRightBorderVisibility }),
                React.createElement("span", null, drawingsDict.popup.sections.borders.right)))))));
}
export const RightBorderGroup = typedMemo(RightBorderGroupSettings);
