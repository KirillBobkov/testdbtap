import React, { memo, useCallback, forwardRef } from 'react';
import { MenuItemStyled } from './MenuItem.styled';
export const MenuItem = memo(forwardRef((props, ref) => {
    const { onSelect, isActive, value, children, className, onMouseEnter, onMouseLeave, onMouseOver, onMouseOut, disabled, onKeyDown, onFocus, onBlur, testId, ariaLabel, ariaDescribedBy, } = props;
    const onClickHandler = useCallback(() => {
        !disabled && onSelect?.(value);
    }, [disabled, onSelect, value]);
    const onKeyDownHandler = useCallback((e) => {
        const keyCode = e.key;
        if (keyCode === 'Enter' || keyCode === 'Space') {
            !disabled && onSelect?.(value);
        }
        onKeyDown?.(e);
    }, [disabled, onKeyDown, onSelect, value]);
    return (React.createElement(MenuItemStyled, { "aria-describedby": ariaDescribedBy, "aria-selected": isActive, "aria-label": ariaLabel, "data-test-id": testId, onFocus: onFocus, onBlur: onBlur, role: 'option', ref: ref, value: value, onClick: onClickHandler, "data-active": isActive, isActive: isActive, className: className, tabIndex: 0, onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave, onMouseOver: onMouseOver, onMouseOut: onMouseOut, onKeyDown: onKeyDownHandler }, children));
}));
