// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const FillIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M8.87944 3.62056L7.99556 4.50444L9.42862 5.9375L5.05362 10.3125L9.6875 14.9464L14.9464 9.6875L8.87944 3.62056ZM6.82139 10.3125L10.3125 6.82138L13.1786 9.6875L12.5536 10.3125H6.82139Z", fill: "currentColor" }))));
});
