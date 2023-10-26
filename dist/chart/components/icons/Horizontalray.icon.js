// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const HorizontalrayIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M4.56506 8.45001C3.70074 8.45001 3.00006 9.15069 3.00006 10.015C3.00006 10.8793 3.70074 11.58 4.56506 11.58C5.21299 11.58 5.76895 11.1863 6.00673 10.625H17V9.37501H5.99364C5.74899 8.82977 5.20138 8.45001 4.56506 8.45001Z", fill: "currentColor" }))));
});
