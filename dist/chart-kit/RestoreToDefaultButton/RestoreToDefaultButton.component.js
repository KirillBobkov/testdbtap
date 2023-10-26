import React, { memo, forwardRef } from 'react';
import { ButtonInnerStyled } from '../Button/Button.styled';
import { RestoreToDefaultButtonStyled, RestoreToDefaultWrapper } from './RestoreToDefaultButton.styled';
export const RestoreToDefaultButton = memo(forwardRef((props, forwardedRef) => (React.createElement(RestoreToDefaultWrapper, null,
    React.createElement(RestoreToDefaultButtonStyled, { ...props, ref: forwardedRef },
        React.createElement(ButtonInnerStyled, null, props.children))))));
