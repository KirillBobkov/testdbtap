import React, { memo } from 'react';
import { DrawingSettingsSection } from '../drawing-settings-section/drawing-settings-section.component';
import { LineStyleLineEndingsGroup } from './components/groups/line-style-endings-group.component';
export const PathSettings = memo((props) => {
    const { value, palette, drawingsDict, onValueChange } = props;
    const styleSectionDict = drawingsDict.popup.sections.style;
    return (React.createElement(React.Fragment, null,
        React.createElement(DrawingSettingsSection, { title: styleSectionDict.title },
            React.createElement(LineStyleLineEndingsGroup, { value: value, onValueChange: onValueChange, drawingsDict: drawingsDict, palette: palette }))));
});
