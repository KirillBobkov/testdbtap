// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const ImageIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M6.875 8.75C7.91053 8.75 8.75 7.91053 8.75 6.875C8.75 5.83947 7.91053 5 6.875 5C5.83947 5 5 5.83947 5 6.875C5 7.91053 5.83947 8.75 6.875 8.75ZM6.25 6.875C6.25 6.52982 6.52982 6.25 6.875 6.25C7.22018 6.25 7.5 6.52982 7.5 6.875C7.5 7.22018 7.22018 7.5 6.875 7.5C6.52982 7.5 6.25 7.22018 6.25 6.875Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M4.375 3.125C3.68464 3.125 3.125 3.68464 3.125 4.375V15.625C3.125 16.3154 3.68464 16.875 4.375 16.875H15.625C16.3154 16.875 16.875 16.3154 16.875 15.625V4.375C16.875 3.68464 16.3154 3.125 15.625 3.125H4.375ZM15.625 4.375H4.375L4.375 13.8036L9.0625 9.11612L11.5625 11.6161L15.625 7.55362V4.375ZM4.375 15.625V15.5714L9.0625 10.8839L11.5625 13.3839L15.625 9.32138V15.625H4.375Z", fill: "currentColor" }))));
});
