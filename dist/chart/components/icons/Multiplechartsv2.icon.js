// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const Multiplechartsv2Icon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("rect", { shapeRendering: svgShapeRendering, x: "4.375", y: "4.375", width: "11.25", height: "11.25", rx: "1.875", stroke: "currentColor", strokeWidth: "1.25" }))));
});