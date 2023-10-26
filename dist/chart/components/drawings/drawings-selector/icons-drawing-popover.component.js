import React, { forwardRef, useCallback } from 'react';
import { IconsDrawingPopoverStyled, IconsDrawingIconWrapperStyled, IconsDrawingPopoverWrapperStyled, } from './icons-drawing-popover.styled';
import { record } from 'fp-ts';
import { Scrollable } from '../../../../chart-kit/Scrollable/Scrollable';
export const IconsDrawingPopover = React.memo(forwardRef((props, forwardedRef) => {
    const { parentRef, className, isOpened, onRequestClose, icons, onSelectIcon } = props;
    const selectIconsDrawingIcon = useCallback((icon) => onSelectIcon(icon), [onSelectIcon]);
    return (React.createElement(IconsDrawingPopoverStyled, { anchorRef: parentRef, opened: isOpened, onRequestClose: onRequestClose, closeOnClickAway: true, align: "end", position: "right", className: className },
        React.createElement(Scrollable, { mode: "visible" },
            React.createElement(IconsDrawingPopoverWrapperStyled, { ref: forwardedRef }, record.keys(icons).map(i => {
                const [width, height, , , path] = icons[i];
                return (React.createElement(Icon, { onSelect: selectIconsDrawingIcon, name: i, key: i, iconWidth: width, iconHeight: height, width: 18, height: 18, path: path }));
            })))));
}));
const Icon = React.memo(props => {
    const { width, height, path, iconWidth, iconHeight, name, onSelect } = props;
    const onClickHandler = useCallback(() => onSelect && onSelect(name), [name, onSelect]);
    return (React.createElement(IconsDrawingIconWrapperStyled, { "aria-label": name, tabIndex: 0, onClick: onClickHandler },
        React.createElement("svg", { "aria-hidden": "true", style: { height, width }, width: iconWidth, height: iconHeight, viewBox: `0 0 ${iconWidth} ${iconHeight}`, xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink" },
            React.createElement("path", { d: path, fill: "currentColor", fillOpacity: "0.8" }))));
});
