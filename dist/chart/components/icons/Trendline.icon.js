// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const TrendlineIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M13.125 5.3125C13.125 4.44956 13.8246 3.75 14.6875 3.75C15.5504 3.75 16.25 4.44956 16.25 5.3125C16.25 6.17544 15.5504 6.875 14.6875 6.875C14.486 6.875 14.2934 6.83685 14.1165 6.76738L7.39238 13.4915C7.46185 13.6684 7.5 13.861 7.5 14.0625C7.5 14.9254 6.80044 15.625 5.9375 15.625C5.07456 15.625 4.375 14.9254 4.375 14.0625C4.375 13.1996 5.07456 12.5 5.9375 12.5C6.13902 12.5 6.33163 12.5381 6.5085 12.6076L13.2326 5.8835C13.1631 5.70663 13.125 5.51402 13.125 5.3125Z", fill: "currentColor" }))));
});
