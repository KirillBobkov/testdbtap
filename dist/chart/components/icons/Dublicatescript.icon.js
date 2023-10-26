// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const DublicatescriptIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M7 5C6.44772 5 6 5.44772 6 6V13C6 13.5523 6.44772 14 7 14H11C11.5523 14 12 13.5523 12 13V6C12 5.44772 11.5523 5 11 5H7Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M9 16C8.44772 16 8 15.5523 8 15H11C12.1046 15 13 14.1046 13 13V7C13.5523 7 14 7.44772 14 8V15C14 15.5523 13.5523 16 13 16H9Z", fill: "currentColor" }))));
});
