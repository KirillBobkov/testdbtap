import React from 'react';
import { LineStyleGroup } from './line-style-group.component';
import { DrawingSettingsItem } from '../../../drawing-settings-section/drawing-settings-item';
import { typedMemo } from '../../../../../../utils/typed-memo';
import { Button } from '../../../../../../chart-kit/Button/Button.component';
function FibLineStyleGroupSettings(props) {
    const { applyToAll, drawingsDict, ...lineStyleGroupProps } = props;
    const styleSectionDict = drawingsDict.popup.sections.style;
    return (React.createElement(LineStyleGroup, { leadingLabel: styleSectionDict.trendlineColorPicker, ...lineStyleGroupProps },
        React.createElement(DrawingSettingsItem, null,
            React.createElement(Button, { onClick: applyToAll, isFlat: true }, styleSectionDict.applyToAll))));
}
export const FibLineStyleGroup = typedMemo(FibLineStyleGroupSettings);
