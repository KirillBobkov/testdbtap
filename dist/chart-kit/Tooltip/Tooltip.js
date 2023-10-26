import React, { memo } from 'react';
import { TooltipStyled } from './Tooltip.styled';
export const Tooltip = memo(props => React.createElement(TooltipStyled, { ...props, role: "tooltip" }));
