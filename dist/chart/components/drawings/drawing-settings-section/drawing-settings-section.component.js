import React, { memo } from 'react';
import { DrawingSettingsSectionStyled, DrawingSettingsSectionTitleStyled, DrawingSettingsSectionContentStyled, } from './drawing-settings-sections.styled';
export const DrawingSettingsSection = memo(props => {
    const { title, children, className } = props;
    return (React.createElement(DrawingSettingsSectionStyled, { className: className },
        React.createElement(DrawingSettingsSectionTitleStyled, null, title),
        React.createElement(DrawingSettingsSectionContentStyled, null, children)));
});
