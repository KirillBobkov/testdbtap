import React, { memo } from 'react';
import { ToolbarItemStyled } from './toolbar-item.styled';
export const ToolbarItem = memo(({ className, children, padding = false, margin = true }) => {
    return (React.createElement(ToolbarItemStyled, { className: className, padding: padding, margin: margin }, children));
});
