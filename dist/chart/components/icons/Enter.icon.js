// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const EnterIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M4.6875 11.25L8.125 7.8125M4.6875 11.25L8.125 14.6875M4.6875 11.25H14.0625C14.7529 11.25 15.3125 10.6904 15.3125 10V6.875C15.3125 6.18464 14.7529 5.625 14.0625 5.625H10.9375", stroke: "currentColor", strokeWidth: "1.25" }))));
});
