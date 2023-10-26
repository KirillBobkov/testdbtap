import React from 'react';
import { useMemo, useCallback } from 'react';
import { Lens } from 'monocle-ts';
import { typedMemo } from '../../../../../../utils/typed-memo';
import { LineEndSelectbox } from '../../../../../../chart-kit/LineEndPicker/LineEndPicker.component';
import { LineStyleGroup } from './line-style-group.component';
import { DrawingSettingsItem } from '../../../drawing-settings-section/drawing-settings-item';
import { PopupEventTargetConsumer } from '../../../../../../chart-kit/Popup/PopupUI.component';
function LineStyleGroupLineEndingsSettings(props) {
    const { arrowStartLens, arrowEndLens } = useMemo(() => {
        const drawingModelLens = Lens.fromPath();
        const arrowStartLens = drawingModelLens(['properties', 'arrows', 'start']);
        const arrowEndLens = drawingModelLens(['properties', 'arrows', 'end']);
        return {
            arrowStartLens,
            arrowEndLens,
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const { value, drawingsDict, onValueChange } = props;
    const lineEndSelectboxLocalization = {
        arrow: drawingsDict.popup.sections.style.lineEndType.arrow,
        none: drawingsDict.popup.sections.style.lineEndType.none,
    };
    const createHandler = useCallback((lens, newValue) => onValueChange(lens.set(newValue)(value)), [value, onValueChange]);
    const updateLeftLineEnd = useCallback((type) => createHandler(arrowStartLens, mapLineEndTypeToProps(type)), [createHandler, arrowStartLens]);
    const updateRightLineEnd = useCallback((type) => createHandler(arrowEndLens, mapLineEndTypeToProps(type)), [createHandler, arrowEndLens]);
    const leftLineEnd = useMemo(() => {
        const isArrow = arrowStartLens.get(value);
        return mapPropsToLineEndType(isArrow ?? false);
    }, [value, arrowStartLens]);
    const rightLineEnd = useMemo(() => {
        const isArrow = arrowEndLens.get(value);
        return mapPropsToLineEndType(isArrow ?? true);
    }, [value, arrowEndLens]);
    return (React.createElement(PopupEventTargetConsumer, null, eventTarget => (React.createElement(LineStyleGroup, { ...props },
        React.createElement(DrawingSettingsItem, null,
            React.createElement(LineEndSelectbox, { selectedType: leftLineEnd, reversed: true, onTypeSelect: updateLeftLineEnd, localization: lineEndSelectboxLocalization, parentEventTarget: eventTarget })),
        React.createElement(DrawingSettingsItem, null,
            React.createElement(LineEndSelectbox, { selectedType: rightLineEnd, onTypeSelect: updateRightLineEnd, localization: lineEndSelectboxLocalization, parentEventTarget: eventTarget }))))));
}
export const LineStyleLineEndingsGroup = typedMemo(LineStyleGroupLineEndingsSettings);
const mapLineEndTypeToProps = (type) => type === 'arrow';
const mapPropsToLineEndType = (isArrow) => (isArrow ? 'arrow' : 'line');
