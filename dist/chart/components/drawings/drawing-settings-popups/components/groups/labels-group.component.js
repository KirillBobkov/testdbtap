import React, { useCallback, memo, useState, useMemo } from 'react';
import { Lens } from 'monocle-ts';
import { DrawingSettingsCheckboxStyled, DrawingsSettingsSelectboxStyled, DrawingsSettingsMenuItemStyled, } from '../../../drawing-settings-section/drawing-settings-common.styled';
import { DrawingSettingsItem } from '../../../drawing-settings-section/drawing-settings-item';
import { Checkbox } from '../../../../../../chart-kit/Checkbox/Checkbox.component';
import { DrawingSettingsGroup } from '../../../drawing-settings-section/drawing-settings-group';
import { typedMemo } from '../../../../../../utils/typed-memo';
import { PopupEventTargetConsumer } from '../../../../../../chart-kit/Popup/PopupUI.component';
function LabelsGroupSettings(props) {
    const { showPriceLens, pricePlacementLens } = useMemo(() => {
        const drawingModelLens = Lens.fromPath();
        const showPriceLens = drawingModelLens(['properties', 'labels', 'showPrice']);
        const pricePlacementLens = drawingModelLens(['properties', 'labels', 'sidePlacement']);
        return {
            showPriceLens,
            pricePlacementLens,
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const { value, onValueChange, drawingsDict, children } = props;
    const labelsSectionDict = drawingsDict.popup.sections.labels;
    const drawingProperties = value.properties;
    const [isPricePlacementSelectboxOpened, togglePricePlacementSelectBox] = useState(false);
    const togglePricePlacementSelectBoxHandler = useCallback(() => togglePricePlacementSelectBox(!isPricePlacementSelectboxOpened), [isPricePlacementSelectboxOpened]);
    const createHandler = useCallback((lens, newValue) => onValueChange(lens.set(newValue)(value)), [value, onValueChange]);
    const updateShowPrice = useCallback((isShowPrice) => createHandler(showPriceLens, isShowPrice), [createHandler, showPriceLens]);
    const updatePricePlacement = useCallback((value) => isSidePlacement(value) && createHandler(pricePlacementLens, value), [createHandler, pricePlacementLens]);
    return (React.createElement(PopupEventTargetConsumer, null, eventTarget => (React.createElement(DrawingSettingsGroup, null,
        React.createElement(DrawingSettingsItem, null,
            React.createElement(DrawingSettingsCheckboxStyled, null,
                React.createElement(Checkbox, { value: drawingProperties.labels.showPrice, onValueChange: updateShowPrice }),
                React.createElement("span", null, labelsSectionDict.priceCheckbox))),
        React.createElement(DrawingSettingsItem, null,
            React.createElement(SidePlacementSelectbox, { value: drawingProperties.labels.sidePlacement ?? 'left', onValueChange: updatePricePlacement, isOpened: isPricePlacementSelectboxOpened, onToggle: togglePricePlacementSelectBoxHandler, parentEventTarget: eventTarget, drawingsDict: drawingsDict })),
        children))));
}
export const LabelsGroup = typedMemo(LabelsGroupSettings);
//#region SidePlacementSelectbox component
const sidePlacements = ['left', 'right'];
const SidePlacementSelectbox = memo(props => {
    const { drawingsDict, value, onValueChange } = props;
    const labelsSectionDict = drawingsDict.popup.sections.labels;
    const updateSidePlacement = useCallback(onValueChange, [onValueChange]);
    const toPlacementString = useCallback((placement) => {
        switch (placement) {
            case 'left':
                return labelsSectionDict.sidePlacementSelectboxOptions.left;
            case 'right':
                return labelsSectionDict.sidePlacementSelectboxOptions.right;
        }
    }, [labelsSectionDict]);
    const isActive = useCallback((placement) => value === placement, [value]);
    return (React.createElement(DrawingsSettingsSelectboxStyled, { ...props, onValueChange: updateSidePlacement, closeOnClickAway: true }, sidePlacements.map(placement => (React.createElement(DrawingsSettingsMenuItemStyled, { key: placement, value: placement, isActive: isActive(placement) }, toPlacementString(placement))))));
});
function isSidePlacement(value) {
    return typeof value === 'string' && (value === 'left' || value === 'right');
}
//#endregion
