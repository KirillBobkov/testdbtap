import React, { useCallback, useMemo } from 'react';
import { LineStyleGroup } from './line-style-group.component';
import { DrawingSettingsItem } from '../../../drawing-settings-section/drawing-settings-item';
import { typedMemo } from '../../../../../../utils/typed-memo';
import { DrawingSettingsGroup } from '../../../drawing-settings-section/drawing-settings-group';
import { DrawingSettingsCheckboxStyled } from '../../../drawing-settings-section/drawing-settings-common.styled';
import { Checkbox } from '../../../../../../chart-kit/Checkbox/Checkbox.component';
import { Lens } from 'monocle-ts';
function ElliotLineStyleGroupSettings(props) {
    const { elliottWaveLineVisibilityLens } = useMemo(() => {
        const drawingModelLens = Lens.fromPath();
        const elliottWaveLineVisibilityLens = drawingModelLens(['properties', 'line', 'lineVisibility']);
        return {
            elliottWaveLineVisibilityLens,
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const { value, onValueChange, drawingsDict, ...lineStyleGroupProps } = props;
    const drawingProperties = value.properties;
    const styleSectionDict = drawingsDict.popup.sections.style;
    const createHandler = useCallback((lens, newValue) => onValueChange(lens.set(newValue)(value)), [value, onValueChange]);
    const updateCorrectionWaveLineVisibilityHandler = useCallback(() => createHandler(elliottWaveLineVisibilityLens, !drawingProperties.line.lineVisibility), [createHandler, drawingProperties.line.lineVisibility, elliottWaveLineVisibilityLens]);
    return (React.createElement(DrawingSettingsGroup, { vertical: true },
        React.createElement(LineStyleGroup, { value: value, onValueChange: onValueChange, ...lineStyleGroupProps }),
        React.createElement(DrawingSettingsItem, null,
            React.createElement(DrawingSettingsCheckboxStyled, null,
                React.createElement(Checkbox, { value: drawingProperties.line.lineVisibility, onValueChange: updateCorrectionWaveLineVisibilityHandler }),
                React.createElement("span", null, styleSectionDict.lineVisibility)))));
}
export const ElliotLineStyleGroup = typedMemo(ElliotLineStyleGroupSettings);
