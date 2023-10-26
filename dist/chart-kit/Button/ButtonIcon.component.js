import React from 'react';
import { ButtonIconStyled, IconStyled } from './ButtonIcon.styled';
import { forwardRef } from 'react';
export const ButtonIcon = forwardRef(({ icon, children, ...props }, forwardedRef) => (React.createElement(ButtonIconStyled, { ref: forwardedRef, ...props },
    React.createElement(IconStyled, null, icon),
    children)));
