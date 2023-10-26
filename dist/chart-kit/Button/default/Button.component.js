import React, { memo, forwardRef } from 'react';
import { ButtonStyled } from './Button.styled';
export const Button = memo(forwardRef((props, forwardedRef) => {
    const { children, isFlat, isPrimary, isExtra, isActive, type = 'button', testId, disabled = false, ...rest } = props;
    return (React.createElement(ButtonStyled, { ref: forwardedRef, ...rest, type: type, "data-test-id": testId, disabled: disabled, "data-active": isActive, "aria-pressed": isActive, "aria-disabled": disabled }, children));
}));
