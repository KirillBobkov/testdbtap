import React, { useCallback, useMemo } from 'react';
import { Lens } from 'monocle-ts';
import { typedMemo } from '../../../../../../utils/typed-memo';
import { DrawingSettingsGroup, } from '../../../drawing-settings-section/drawing-settings-group';
import { DrawingSettingsItem } from '../../../drawing-settings-section/drawing-settings-item';
import { DrawingSettingsCheckboxStyled } from '../../../drawing-settings-section/drawing-settings-common.styled';
import { Checkbox } from '../../../../../../chart-kit/Checkbox/Checkbox.component';
function CoeffGroupSettings(props) {
    const { showCoeffLens } = useMemo(() => {
        const drawingModelLens = Lens.fromPath();
        const showCoeffLens = drawingModelLens(['properties', 'labels', 'showCoefficient']);
        return {
            showCoeffLens,
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const { value, onValueChange, className, drawingsDict, ...groupProps } = props;
    const drawingProperties = value.properties;
    const labelsSectionDict = drawingsDict.popup.sections.labels;
    const createHandler = useCallback((lens, newValue) => onValueChange(lens.set(newValue)(value)), [value, onValueChange]);
    const updateShowCoefficient = useCallback((showCoeff) => createHandler(showCoeffLens, Boolean(showCoeff)), [createHandler, showCoeffLens]);
    return (React.createElement(DrawingSettingsGroup, { className: className, ...groupProps },
        React.createElement(DrawingSettingsItem, null,
            React.createElement(DrawingSettingsCheckboxStyled, null,
                React.createElement(Checkbox, { value: drawingProperties.labels.showCoefficient, onValueChange: updateShowCoefficient }),
                React.createElement("span", null, labelsSectionDict.coefficientCheckbox)))));
}
export const CoeffGroup = typedMemo(CoeffGroupSettings);
