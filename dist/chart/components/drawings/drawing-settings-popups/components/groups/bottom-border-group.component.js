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
function BottomBorderGroupSettings(props) {
    const { bottomBorderStyleLens } = useMemo(() => {
        const drawingModelLens = Lens.fromPath();
        const bottomBorderStyleLens = drawingModelLens(['properties', 'borders', 'bottom']);
        return {
            bottomBorderStyleLens,
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const { value, onValueChange, drawingsDict, palette } = props;
    const drawingProperties = value.properties;
    const createHandler = useCallback((lens, newValue) => onValueChange(lens.set(newValue)(value)), [value, onValueChange]);
    const updateBottomBorderStyle = useCallback((line) => createHandler(bottomBorderStyleLens, line), [createHandler, bottomBorderStyleLens]);
    const updateBottomBorderVisibility = useCallback((value) => {
        value ? updateBottomBorderStyle(BASE_LINE_STYLES) : createHandler(bottomBorderStyleLens, undefined);
    }, [updateBottomBorderStyle, createHandler, bottomBorderStyleLens]);
    const isBottomBorder = useMemo(() => drawingProperties.borders.bottom === undefined, [drawingProperties.borders.bottom]);
    return (React.createElement(PopupEventTargetConsumer, null, eventTarget => (React.createElement(DrawingSettingsGroup, null,
        React.createElement(DrawingSettingsItem, null,
            React.createElement(LineStyleControl, { value: drawingProperties.borders.bottom || drawingProperties.line, onValueChange: updateBottomBorderStyle, palette: palette, parentEventTarget: eventTarget, noGap: true, noGapItems: true })),
        React.createElement(DrawingSettingsItem, null,
            React.createElement(DrawingSettingsCheckboxStyled, null,
                React.createElement(Checkbox, { value: !isBottomBorder, onValueChange: updateBottomBorderVisibility }),
                React.createElement("span", null, drawingsDict.popup.sections.borders.bottom)))))));
}
export const BottomBorderGroup = typedMemo(BottomBorderGroupSettings);
