import React, { useCallback, useState, useMemo } from 'react';
import { DrawingSettingsGroup } from '../../../drawing-settings-section/drawing-settings-group';
import { Lens } from 'monocle-ts';
import { DrawingSettingsItem } from '../../../drawing-settings-section/drawing-settings-item';
import { Checkbox } from '../../../../../../chart-kit/Checkbox/Checkbox.component';
import { DrawingSettingsCheckboxStyled, DrawingsSettingsMenuItemStyled, DrawingsSettingsSelectboxStyled, } from '../../../drawing-settings-section/drawing-settings-common.styled';
import { typedMemo } from '../../../../../../utils/typed-memo';
import { PopupEventTargetConsumer } from '../../../../../../chart-kit/Popup/PopupUI.component';
const positions = ['left', 'right', 'middle']; // center also takes into account box width
function MeasureBoxSettings(props) {
    const { MBShowPriceAbsolute, MBShowPricePercent, MBShowBars, MBShowDateTime, MBShowDistance, MBShowAngle, MBPosition, } = useMemo(() => {
        const pathLens = Lens.fromPath();
        const MBShowPriceAbsolute = pathLens(['properties', 'measureBox', 'showPriceChangeAbs']);
        const MBShowPricePercent = pathLens(['properties', 'measureBox', 'showPriceChangePercent']);
        const MBShowBars = pathLens(['properties', 'measureBox', 'showBars']);
        const MBShowDateTime = pathLens(['properties', 'measureBox', 'showTimeDiff']);
        const MBShowDistance = pathLens(['properties', 'measureBox', 'showDistance']);
        const MBShowAngle = pathLens(['properties', 'measureBox', 'showAngle']);
        const MBPosition = pathLens(['properties', 'measureBox', 'position']);
        return {
            MBShowPriceAbsolute,
            MBShowPricePercent,
            MBShowBars,
            MBShowDateTime,
            MBShowDistance,
            MBShowAngle,
            MBPosition,
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const { value, onValueChange, drawingsDict, className } = props;
    const [isPricePlacementSelectboxOpened, togglePricePlacementSelectBox] = useState(false);
    const togglePricePlacementSelectboxHandler = useCallback(() => togglePricePlacementSelectBox(!isPricePlacementSelectboxOpened), [isPricePlacementSelectboxOpened]);
    const drawingProperties = value.properties;
    const measureBoxProperties = drawingProperties.measureBox;
    const measureBoxSectionDict = drawingsDict.popup.sections.measureBox;
    const createHandler = useCallback((lens, newValue) => onValueChange(lens.set(newValue)(value)), [onValueChange, value]);
    const updateShowPriceAbsolute = useCallback((showPrice) => createHandler(MBShowPriceAbsolute, Boolean(showPrice)), [MBShowPriceAbsolute, createHandler]);
    const updateShowPricePercent = useCallback((showPrice) => createHandler(MBShowPricePercent, Boolean(showPrice)), [MBShowPricePercent, createHandler]);
    const updateShowBars = useCallback((showBars) => createHandler(MBShowBars, Boolean(showBars)), [MBShowBars, createHandler]);
    const updateShowDateTime = useCallback((showDateTime) => createHandler(MBShowDateTime, Boolean(showDateTime)), [MBShowDateTime, createHandler]);
    const updateShowDistance = useCallback((showDistance) => createHandler(MBShowDistance, Boolean(showDistance)), [MBShowDistance, createHandler]);
    const updateShowAngle = useCallback((showAngle) => createHandler(MBShowAngle, Boolean(showAngle)), [MBShowAngle, createHandler]);
    const toPlacementString = useCallback((placement) => {
        switch (placement) {
            case 'left':
                return measureBoxSectionDict.position.left;
            case 'right':
                return measureBoxSectionDict.position.right;
            case 'middle':
                return measureBoxSectionDict.position.middle;
        }
    }, [
        measureBoxSectionDict.position.left,
        measureBoxSectionDict.position.right,
        measureBoxSectionDict.position.middle,
    ]);
    const updateMBPosition = useCallback((selectboxValue) => {
        if (typeof selectboxValue === 'string' && stringIsPlacement(selectboxValue)) {
            createHandler(MBPosition, selectboxValue);
        }
    }, [MBPosition, createHandler]);
    return (React.createElement(PopupEventTargetConsumer, null, eventTarget => (React.createElement("div", { className: className },
        React.createElement(DrawingSettingsGroup, { vertical: true },
            React.createElement(DrawingSettingsItem, null,
                React.createElement(DrawingSettingsCheckboxStyled, null,
                    React.createElement(Checkbox, { value: measureBoxProperties.showPriceChangePercent, onValueChange: updateShowPricePercent }),
                    React.createElement("span", null, measureBoxSectionDict.percentPriceCheckbox))),
            React.createElement(DrawingSettingsItem, null,
                React.createElement(DrawingSettingsCheckboxStyled, null,
                    React.createElement(Checkbox, { value: measureBoxProperties.showPriceChangeAbs, onValueChange: updateShowPriceAbsolute }),
                    React.createElement("span", null, measureBoxSectionDict.changeCheckbox))),
            React.createElement(DrawingSettingsItem, null,
                React.createElement(DrawingSettingsCheckboxStyled, null,
                    React.createElement(Checkbox, { value: measureBoxProperties.showBars, onValueChange: updateShowBars }),
                    React.createElement("span", null, measureBoxSectionDict.showBars))),
            React.createElement(DrawingSettingsItem, null,
                React.createElement(DrawingSettingsCheckboxStyled, null,
                    React.createElement(Checkbox, { value: measureBoxProperties.showTimeDiff, onValueChange: updateShowDateTime }),
                    React.createElement("span", null, measureBoxSectionDict.showDateTime))),
            React.createElement(DrawingSettingsItem, null,
                React.createElement(DrawingSettingsCheckboxStyled, null,
                    React.createElement(Checkbox, { value: measureBoxProperties.showDistance, onValueChange: updateShowDistance }),
                    React.createElement("span", null, measureBoxSectionDict.showDistance))),
            React.createElement(DrawingSettingsItem, null,
                React.createElement(DrawingSettingsCheckboxStyled, null,
                    React.createElement(Checkbox, { value: measureBoxProperties.showAngle, onValueChange: updateShowAngle }),
                    React.createElement("span", null, measureBoxSectionDict.showAngle)))),
        React.createElement(DrawingSettingsGroup, null,
            React.createElement(DrawingSettingsItem, null,
                React.createElement(DrawingSettingsCheckboxStyled, null,
                    React.createElement("span", null, measureBoxSectionDict.positionTitle))),
            React.createElement(DrawingSettingsItem, null,
                React.createElement(DrawingsSettingsSelectboxStyled, { value: measureBoxProperties.position, onValueChange: updateMBPosition, isOpened: isPricePlacementSelectboxOpened, closeOnClickAway: true, onToggle: togglePricePlacementSelectboxHandler, parentEventTarget: eventTarget }, positions.map(position => (React.createElement(DrawingsSettingsMenuItemStyled, { key: position, value: position, isActive: measureBoxProperties.position === position }, toPlacementString(position)))))))))));
}
export const MeasureBoxGroup = typedMemo(MeasureBoxSettings);
const stringIsPlacement = (value) => {
    return value === 'left' || value === 'right' || value === 'middle';
};
