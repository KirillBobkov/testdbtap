import React, { useMemo } from 'react';
import { memo } from 'react';
import { RadioButtonContainerStyled, RadioButtonViewStyled } from './Radio-button.styled';
import { createKeyDownHandler } from '../utils/keyDownHandler';
export const RadioButton = memo(props => {
    const { id, isDisabled = false, value, onValueChange, children, ariaLabel, ...rest } = props;
    const handleChange = React.useCallback(() => !isDisabled && onValueChange(!value), [onValueChange, value, isDisabled]);
    const keyDownHandler = useMemo(() => createKeyDownHandler(['Space', handleChange]), [handleChange]);
    return (React.createElement(RadioButtonContainerStyled, { ...rest, role: "radio", "aria-label": ariaLabel, "aria-checked": value, tabIndex: 0, isChecked: value, isDisabled: isDisabled, onKeyDown: keyDownHandler, onClick: handleChange },
        React.createElement(RadioButtonViewStyled, null),
        children));
});
