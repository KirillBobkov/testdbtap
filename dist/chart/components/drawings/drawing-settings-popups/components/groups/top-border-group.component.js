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
function TopBorderGroupSettings(props) {
    const { topBorderStyleLens } = useMemo(() => {
        const drawingModelLens = Lens.fromPath();
        const topBorderStyleLens = drawingModelLens(['properties', 'borders', 'top']);
        return {
            topBorderStyleLens,
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const { value, onValueChange, drawingsDict, palette } = props;
    const drawingProperties = value.properties;
    const createHandler = useCallback((lens, newValue) => onValueChange(lens.set(newValue)(value)), [value, onValueChange]);
    const updateTopBorderStyle = useCallback((line) => createHandler(topBorderStyleLens, line), [createHandler, topBorderStyleLens]);
    const updateTopBorderVisibility = useCallback((value) => {
        value ? updateTopBorderStyle(BASE_LINE_STYLES) : createHandler(topBorderStyleLens, undefined);
    }, [updateTopBorderStyle, createHandler, topBorderStyleLens]);
    const isTopBorder = useMemo(() => drawingProperties.borders.top === undefined, [drawingProperties.borders.top]);
    return (React.createElement(PopupEventTargetConsumer, null, eventTarget => (React.createElement(DrawingSettingsGroup, null,
        React.createElement(DrawingSettingsItem, null,
            React.createElement(LineStyleControl, { value: drawingProperties.borders.top || drawingProperties.line, onValueChange: updateTopBorderStyle, palette: palette, parentEventTarget: eventTarget, noGap: true, noGapItems: true })),
        React.createElement(DrawingSettingsItem, null,
            React.createElement(DrawingSettingsCheckboxStyled, null,
                React.createElement(Checkbox, { value: !isTopBorder, onValueChange: updateTopBorderVisibility }),
                React.createElement("span", null, drawingsDict.popup.sections.borders.top)))))));
}
export const TopBorderGroup = typedMemo(TopBorderGroupSettings);
