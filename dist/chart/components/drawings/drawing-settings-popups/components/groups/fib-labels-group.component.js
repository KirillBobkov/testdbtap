import React, { useCallback, memo, useState, useMemo } from 'react';
import { Lens } from 'monocle-ts';
import { DrawingsSettingsSelectboxStyled, DrawingsSettingsMenuItemStyled, } from '../../../drawing-settings-section/drawing-settings-common.styled';
import { DrawingSettingsItem } from '../../../drawing-settings-section/drawing-settings-item';
import { DrawingSettingsGroup } from '../../../drawing-settings-section/drawing-settings-group';
import { typedMemo } from '../../../../../../utils/typed-memo';
import { CoeffGroup } from './coeff-group.component';
import { PopupEventTargetConsumer } from '../../../../../../chart-kit/Popup/PopupUI.component';
function FibLabelsGroupSettings(props) {
    const { placementToTheLineLens, sidePlacementLens } = useMemo(() => {
        const drawingModelLens = Lens.fromPath();
        const placementToTheLineLens = drawingModelLens(['properties', 'labels', 'placementToTheLine']);
        const sidePlacementLens = drawingModelLens(['properties', 'labels', 'sidePlacement']);
        return {
            placementToTheLineLens,
            sidePlacementLens,
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const { value, onValueChange, drawingsDict } = props;
    const drawingProperties = value.properties;
    const [isSidePlacementSelectboxOpened, toggleSidePlacementSelectBox] = useState(false);
    const [isPlacementToTheLineSelectboxOpened, togglePlacementToTheLineSelectBox] = useState(false);
    const toggleSidePlacementSelectBoxHandler = useCallback(() => toggleSidePlacementSelectBox(!isSidePlacementSelectboxOpened), [isSidePlacementSelectboxOpened]);
    const togglePlacementToTheLineSelectBoxHandler = useCallback(() => togglePlacementToTheLineSelectBox(!isPlacementToTheLineSelectboxOpened), [isPlacementToTheLineSelectboxOpened]);
    const createHandler = useCallback((lens, newValue) => onValueChange(lens.set(newValue)(value)), [value, onValueChange]);
    const updateSidePlacement = useCallback((value) => isSidePlacement(value) && createHandler(sidePlacementLens, value), [createHandler, sidePlacementLens]);
    const updatePlacementToTheLine = useCallback((value) => isPlacementToTheLine(value) && createHandler(placementToTheLineLens, value), [createHandler, placementToTheLineLens]);
    return (React.createElement(PopupEventTargetConsumer, null, eventTarget => (React.createElement(DrawingSettingsGroup, null,
        React.createElement(CoeffGroup, { value: value, onValueChange: onValueChange, drawingsDict: drawingsDict, noGap: true, noGapItems: true }),
        React.createElement(DrawingSettingsItem, null,
            React.createElement(SidePlacementSelectbox, { value: drawingProperties.labels.sidePlacement ?? 'left', onValueChange: updateSidePlacement, isOpened: isSidePlacementSelectboxOpened, onToggle: toggleSidePlacementSelectBoxHandler, drawingsDict: drawingsDict, parentEventTarget: eventTarget })),
        React.createElement(DrawingSettingsItem, null,
            React.createElement(PlacementToTheLineSelectbox, { value: drawingProperties.labels.placementToTheLine ?? 'left', onValueChange: updatePlacementToTheLine, isOpened: isPlacementToTheLineSelectboxOpened, onToggle: togglePlacementToTheLineSelectBoxHandler, drawingsDict: drawingsDict, parentEventTarget: eventTarget }))))));
}
export const FibLabelsGroup = typedMemo(FibLabelsGroupSettings);
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
//#region PlacementToTheLineSelectbox component
const placementsToTheLine = ['top', 'bottom', 'middle'];
const PlacementToTheLineSelectbox = memo(props => {
    const { drawingsDict, value, onValueChange } = props;
    const labelsSectionDict = drawingsDict.popup.sections.labels;
    const updatePricePlacement = useCallback(onValueChange, [onValueChange]);
    const toPlacementString = useCallback((placement) => {
        switch (placement) {
            case 'top':
                return labelsSectionDict.placementToTheLineSelectboxOptions.top;
            case 'bottom':
                return labelsSectionDict.placementToTheLineSelectboxOptions.bottom;
            case 'middle':
                return labelsSectionDict.placementToTheLineSelectboxOptions.middle;
        }
    }, [labelsSectionDict]);
    const isActive = useCallback((placement) => value === placement, [value]);
    return (React.createElement(DrawingsSettingsSelectboxStyled, { ...props, onValueChange: updatePricePlacement, closeOnClickAway: true }, placementsToTheLine.map(placement => (React.createElement(DrawingsSettingsMenuItemStyled, { key: placement, value: placement, isActive: isActive(placement) }, toPlacementString(placement))))));
});
function isPlacementToTheLine(value) {
    return typeof value === 'string' && (value === 'top' || value === 'bottom' || value === 'middle');
}
//#endregion
