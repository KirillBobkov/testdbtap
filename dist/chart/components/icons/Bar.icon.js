// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const BarIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M7.50012 3.125H6.25012V12.5H3.12512V13.75H6.25012V16.875H7.50012V10.625H10.0001V9.375H7.50012V3.125Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M14.3751 3.125H13.1251V5.625H10.0001V6.875H13.1251V16.875H14.3751V13.75H16.8751V12.5H14.3751V3.125Z", fill: "currentColor" }))));
});
