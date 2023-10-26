import React, { memo } from 'react';
import { DrawingSettingsItemContentStyled, DrawingSettingsItemLabelStyled, DrawingSettingsItemStyled, } from './drawing-settings-item.styled';
export const DrawingSettingsItem = memo(props => {
    const { label, children, className } = props;
    return (React.createElement(DrawingSettingsItemStyled, { className: className },
        label && React.createElement(DrawingSettingsItemLabelStyled, null, label),
        React.createElement(DrawingSettingsItemContentStyled, null, children)));
});
