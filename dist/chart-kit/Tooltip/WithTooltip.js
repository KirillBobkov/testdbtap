import React, { memo, useState, useRef, useCallback, useMemo } from 'react';
import { Tooltip } from './Tooltip';
export const WithTooltip = memo(props => {
    const { children, label, onMouseEnter, onMouseLeave, disabled, force = false, align = 'center', position = 'right', className, } = props;
    const [hovered, setHovered] = useState(false);
    const itemRef = useRef(null);
    const setItemRef = useCallback((node) => (itemRef.current = node), []);
    const handleChildRef = useCallback((node) => {
        if (React.isValidElement(children)) {
            // Call the original ref, if any
            //@ts-ignore
            const { ref } = children;
            if (typeof ref === 'function') {
                ref(node);
            }
            else if (ref !== null) {
                ref.current = node;
            }
        }
        setItemRef(node);
    }, [children, setItemRef]);
    const handleMouseEnter = useCallback((e) => {
        setHovered(true);
        onMouseEnter && onMouseEnter(e);
    }, [onMouseEnter]);
    const handleMouseLeave = useCallback((e) => {
        setHovered(false);
        onMouseLeave && onMouseLeave(e);
    }, [onMouseLeave]);
    const handleRequestClose = useCallback(() => {
        setHovered(false);
    }, []);
    const tooltipOpened = useMemo(() => force || hovered, [force, hovered]);
    if (!React.isValidElement(children)) {
        return null;
    }
    return (React.createElement(React.Fragment, null,
        React.Children.only(React.cloneElement(children, {
            // @ts-ignore
            ref: handleChildRef,
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave,
            onFocus: handleMouseEnter,
            onBlur: handleMouseLeave,
        })),
        !disabled ? (React.createElement(Tooltip, { className: className, anchorRef: itemRef, opened: tooltipOpened, position: position, align: align, onRequestClose: handleRequestClose }, label)) : null));
});
