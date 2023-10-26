import React, { memo } from 'react';
import { WithTooltip } from '../../Tooltip/WithTooltip';
import { MenuItem } from '../MenuItem.component';
export const MenuItemWithTooltip = memo(props => {
    const { disableTooltip, label, align, position, onMouseEnter, onMouseLeave, ...rest } = props;
    return (React.createElement(WithTooltip, { disabled: disableTooltip, label: label, align: align, position: position, onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave },
        React.createElement(MenuItem, { ...rest })));
});
