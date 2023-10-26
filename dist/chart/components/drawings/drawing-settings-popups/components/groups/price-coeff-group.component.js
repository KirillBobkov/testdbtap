import React, { useCallback, useMemo } from 'react';
import { Lens } from 'monocle-ts';
import { typedMemo } from '../../../../../../utils/typed-memo';
import { DrawingSettingsGroup } from '../../../drawing-settings-section/drawing-settings-group';
import { DrawingSettingsItem } from '../../../drawing-settings-section/drawing-settings-item';
import { DrawingSettingsCheckboxStyled } from '../../../drawing-settings-section/drawing-settings-common.styled';
import { Checkbox } from '../../../../../../chart-kit/Checkbox/Checkbox.component';
function PriceCoeffGroupSettings(props) {
    const { showPriceLens } = useMemo(() => {
        const drawingModelLens = Lens.fromPath();
        const showPriceLens = drawingModelLens(['properties', 'labels', 'showPrice']);
        return {
            showPriceLens,
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const { value, onValueChange, className, drawingsDict } = props;
    const drawingProperties = value.properties;
    const labelsSectionDict = drawingsDict.popup.sections.labels;
    const createHandler = useCallback((lens, newValue) => onValueChange(lens.set(newValue)(value)), [value, onValueChange]);
    const updateShowPrice = useCallback((showPrice) => createHandler(showPriceLens, Boolean(showPrice)), [createHandler, showPriceLens]);
    return (React.createElement(DrawingSettingsGroup, { className: className },
        React.createElement(DrawingSettingsItem, null,
            React.createElement(DrawingSettingsCheckboxStyled, null,
                React.createElement(Checkbox, { value: drawingProperties.labels.showPrice, onValueChange: updateShowPrice }),
                React.createElement("span", null, labelsSectionDict.priceCheckbox)))));
}
export const PriceCoeffGroup = typedMemo(PriceCoeffGroupSettings);
