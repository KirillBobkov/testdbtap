import React, { useCallback, useMemo } from 'react';
import { Lens } from 'monocle-ts';
import { typedMemo } from '../../../../../../utils/typed-memo';
import { DrawingSettingsGroup } from '../../../drawing-settings-section/drawing-settings-group';
import { DrawingSettingsItem } from '../../../drawing-settings-section/drawing-settings-item';
import { LineStyleControl } from '../line-style-control.component';
import { DrawingSettingsCheckboxStyled } from '../../../drawing-settings-section/drawing-settings-common.styled';
import { Checkbox } from '../../../../../../chart-kit/Checkbox/Checkbox.component';
import { PopupEventTargetConsumer } from '../../../../../../chart-kit/Popup/PopupUI.component';
function AllBordersGroupSettings(props) {
    const { showBorderLens, borderStyleLens } = useMemo(() => {
        const drawingModelLens = Lens.fromPath();
        const showBorderLens = drawingModelLens(['properties', 'borders', 'visible']);
        const borderStyleLens = drawingModelLens(['properties', 'borders', 'all']);
        return {
            showBorderLens,
            borderStyleLens,
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const { value, onValueChange, drawingsDict, palette } = props;
    const drawingProperties = value.properties;
    const createHandler = useCallback((lens, newValue) => onValueChange(lens.set(newValue)(value)), [value, onValueChange]);
    const updateBorderStyle = useCallback((line) => createHandler(borderStyleLens, line), [createHandler, borderStyleLens]);
    const showBorderStyle = useCallback((visible) => createHandler(showBorderLens, visible), [createHandler, showBorderLens]);
    return (React.createElement(PopupEventTargetConsumer, null, eventTarget => (React.createElement(DrawingSettingsGroup, null,
        React.createElement(DrawingSettingsItem, null,
            React.createElement(LineStyleControl, { value: drawingProperties.borders.all || drawingProperties.line, onValueChange: updateBorderStyle, palette: palette, parentEventTarget: eventTarget, noGap: true, noGapItems: true })),
        React.createElement(DrawingSettingsItem, null,
            React.createElement(DrawingSettingsCheckboxStyled, null,
                React.createElement(Checkbox, { value: !!drawingProperties.borders.visible, onValueChange: showBorderStyle }),
                React.createElement("span", null, drawingsDict.popup.sections.background.borderCheckbox)))))));
}
export const AllBordersGroup = typedMemo(AllBordersGroupSettings);
