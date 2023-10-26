import React, { useCallback, useMemo } from 'react';
import { typedMemo } from '../../../../../../utils/typed-memo';
import { DrawingSettingsCheckboxStyled } from '../../../drawing-settings-section/drawing-settings-common.styled';
import { DrawingSettingsItem } from '../../../drawing-settings-section/drawing-settings-item';
import { Checkbox } from '../../../../../../chart-kit/Checkbox/Checkbox.component';
import { DrawingSettingsGroup } from '../../../drawing-settings-section/drawing-settings-group';
import { Lens } from 'monocle-ts';
function ExtendGroupSettings(props) {
    const { extendRightLens, extendLeftLens } = useMemo(() => {
        const drawingModelLens = Lens.fromPath();
        const extendRightLens = drawingModelLens(['properties', 'style', 'extendRight']);
        const extendLeftLens = drawingModelLens(['properties', 'style', 'extendLeft']);
        return {
            extendRightLens,
            extendLeftLens,
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const { value, onValueChange, drawingsDict } = props;
    const extendSectionDict = drawingsDict.popup.sections.extend;
    const drawingProperties = value.properties;
    const createHandler = useCallback((lens, newValue) => onValueChange(lens.set(newValue)(value)), [onValueChange, value]);
    const updateExtendRight = useCallback((extendRight) => createHandler(extendRightLens, Boolean(extendRight)), [createHandler, extendRightLens]);
    const updateExtendLeft = useCallback((extendLeft) => createHandler(extendLeftLens, Boolean(extendLeft)), [createHandler, extendLeftLens]);
    return (React.createElement(DrawingSettingsGroup, { vertical: true },
        React.createElement(DrawingSettingsItem, null,
            React.createElement(DrawingSettingsCheckboxStyled, null,
                React.createElement(Checkbox, { value: drawingProperties.style.extendLeft, onValueChange: updateExtendLeft }),
                React.createElement("span", null, extendSectionDict.leftCheckbox))),
        React.createElement(DrawingSettingsItem, null,
            React.createElement(DrawingSettingsCheckboxStyled, null,
                React.createElement(Checkbox, { value: drawingProperties.style.extendRight, onValueChange: updateExtendRight }),
                React.createElement("span", null, extendSectionDict.rightCheckbox)))));
}
export const ExtendGroup = typedMemo(ExtendGroupSettings);
