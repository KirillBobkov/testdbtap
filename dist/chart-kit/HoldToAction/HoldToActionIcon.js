import React from 'react';
export const HoldToActionIcon = ({ onMouseDown, onMouseUp, onMouseLeave, onTouchStart, onTouchEnd, iconWrapper: IconWrapper, iconSVGComponent: Icon, ariaLabel, tabIndex, ariaHidden, }) => {
    return (React.createElement(IconWrapper, { "aria-label": ariaLabel, tabIndex: tabIndex, "aria-hidden": ariaHidden, isFlat: true, icon: React.createElement(Icon, null), onMouseDown: onMouseDown, onMouseUp: onMouseUp, onMouseLeave: onMouseLeave, onTouchStart: onTouchStart, onTouchEnd: onTouchEnd }));
};
