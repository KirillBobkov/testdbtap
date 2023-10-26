import React, { forwardRef, memo } from 'react';
import { WithTooltip } from '../Tooltip/WithTooltip';
import { Button } from './Button.component';
export const ButtonWithTooltip = memo(forwardRef((props, forwardedRef) => {
    const { disableTooltip, align, label, position, ...rest } = props;
    return (React.createElement(WithTooltip, { disabled: disableTooltip, align: align, position: position, label: label },
        React.createElement(Button, { ref: forwardedRef, ...rest })));
}));
