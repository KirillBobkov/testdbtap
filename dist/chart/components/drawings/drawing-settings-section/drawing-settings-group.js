import React, { memo } from 'react';
import { DrawingSettingsGroupStyled, DrawingSettingsGroupLabelStyled, DrawingSettingsGroupWrapperStyled, } from './drawing-settings-group.styled';
export const DrawingSettingsGroup = memo(props => {
    const { children, className, vertical = false, noGap = false, noGapItems = false, label, disableMargin } = props;
    return (React.createElement(DrawingSettingsGroupWrapperStyled, null,
        label && React.createElement(DrawingSettingsGroupLabelStyled, null, label),
        React.createElement(DrawingSettingsGroupStyled, { disableBotMargin: disableMargin, className: className, vertical: vertical, noGap: noGap, noGapItems: noGapItems }, children)));
});
