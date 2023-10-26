import * as React from 'react';
import { forwardRef } from 'react';
import { useMemo } from 'react';
import { CrosshairTypeAnchorStyled } from './crosshair-type-anchor.styled';
import { isCrosshairType, mapTypeToIcon } from './crosshair-type.model';
export const CrosshairTypeAnchor = forwardRef((props, forwardedRef) => {
    const caretIcon = useMemo(() => {
        if (isCrosshairType(props.value)) {
            return mapTypeToIcon(props.value);
        }
        return null;
    }, [props.value]);
    return React.createElement(CrosshairTypeAnchorStyled, { ref: forwardedRef, ...props, valueText: caretIcon });
});
