import React, { useCallback, useMemo } from 'react';
import { Lens } from 'monocle-ts';
import { typedMemo } from '../../../../../../utils/typed-memo';
import { BackgroundFillControl } from '../background-fill-control.component';
import { PopupEventTargetConsumer } from '../../../../../../chart-kit/Popup/PopupUI.component';
function BackgroundFillGroupSettings(props) {
    const { backgroundLens } = useMemo(() => {
        const drawingModelLens = Lens.fromPath();
        const backgroundLens = drawingModelLens(['properties', 'background']);
        return {
            backgroundLens,
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const { value, onValueChange, drawingsDict, palette } = props;
    const drawingProperties = value.properties;
    const createHandler = useCallback((lens, newValue) => onValueChange(lens.set(newValue)(value)), [value, onValueChange]);
    const updateBackground = useCallback((value) => createHandler(backgroundLens, value), [createHandler, backgroundLens]);
    return (React.createElement(PopupEventTargetConsumer, null, eventTarget => (React.createElement(BackgroundFillControl, { drawingsDict: drawingsDict, onValueChange: updateBackground, value: drawingProperties.background, palette: palette, parentEventTarget: eventTarget, showBackgroundCheckbox: true }))));
}
export const BackgroundFillGroup = typedMemo(BackgroundFillGroupSettings);
