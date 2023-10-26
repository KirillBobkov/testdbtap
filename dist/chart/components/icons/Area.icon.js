// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const AreaIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("mask", { id: "path-1-inside-1_1169_10457", fill: "white" },
                React.createElement("path", { shapeRendering: svgShapeRendering, d: "M8.43756 7.8125L1.87506 14.375H16.8751V4.375L10.9376 10.3125L8.43756 7.8125Z" })),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M8.43756 7.8125L1.87506 14.375H16.8751V4.375L10.9376 10.3125L8.43756 7.8125Z", stroke: "currentColor", strokeWidth: "2.5", mask: "url(#path-1-inside-1_1169_10457)" }))));
});
