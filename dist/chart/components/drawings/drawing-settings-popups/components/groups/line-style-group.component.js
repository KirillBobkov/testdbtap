import React, { useCallback, useMemo } from 'react';
import { Lens } from 'monocle-ts';
import { typedMemo } from '../../../../../../utils/typed-memo';
import { LineStyleControl } from '../line-style-control.component';
import { DrawingSettingsGroup } from '../../../drawing-settings-section/drawing-settings-group';
import { PopupEventTargetConsumer } from '../../../../../../chart-kit/Popup/PopupUI.component';
function LineStyleGroupSettings(props) {
    const { lineStyleLens } = useMemo(() => {
        const drawingModelLens = Lens.fromPath();
        const lineStyleLens = drawingModelLens(['properties', 'line']);
        return {
            lineStyleLens,
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const { value, onValueChange, className, ...lineStyleProps } = props;
    const drawingProperties = value.properties;
    const createHandler = useCallback((lens, newValue) => onValueChange(lens.set(newValue)(value)), [value, onValueChange]);
    const updateLineStyle = useCallback((line) => createHandler(lineStyleLens, line), [createHandler, lineStyleLens]);
    return (React.createElement(PopupEventTargetConsumer, null, eventTarget => (React.createElement(DrawingSettingsGroup, { className: className },
        React.createElement(LineStyleControl, { value: drawingProperties.line, onValueChange: updateLineStyle, parentEventTarget: eventTarget, noGap: true, noGapItems: true, ...lineStyleProps })))));
}
export const LineStyleGroup = typedMemo(LineStyleGroupSettings);
