// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const XABDIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M15.625 15.625L16.875 3.75L9.95066 9.28947L3.125 4.375L5 15L9.9917 10.7965L15.625 15.625ZM14.6311 13.1267L15.3185 6.59597L11.022 10.0332L14.6311 13.1267ZM5.85402 12.6467L4.89045 7.18641L8.90533 10.0771L5.85402 12.6467Z", fill: "currentColor" }))));
});
