import React, { memo, forwardRef } from 'react';
import { ButtonStyled, ButtonInnerStyled } from './Button.styled';
export const Button = memo(forwardRef((props, forwardedRef) => (React.createElement(ButtonStyled, { ...props, ref: forwardedRef },
    React.createElement(ButtonInnerStyled, null, props.children)))));
