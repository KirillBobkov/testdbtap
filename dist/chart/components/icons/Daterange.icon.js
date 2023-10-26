// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const DaterangeIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M2.5 3.75H3.75V16.25H2.5V3.75Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M16.25 3.75H17.5V16.25H16.25V3.75Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M10.9375 5.99112L10.0536 6.875L12.5536 9.375H5V10.625H12.5536L10.0536 13.125L10.9375 14.0089L14.9464 10L10.9375 5.99112Z", fill: "currentColor" }))));
});
