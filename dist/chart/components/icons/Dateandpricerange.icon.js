// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const DateandpricerangeIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M10 2.24112L6.74556 5.49556L7.62944 6.37944L10 4.00889L12.3706 6.37944L13.2544 5.49556L10 2.24112Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M10 17.7589L6.74556 14.5044L7.62944 13.6206L10 15.9911L12.3706 13.6206L13.2544 14.5044L10 17.7589Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M17.7589 10L14.5044 6.74556L13.6206 7.62944L15.9911 10L13.6206 12.3706L14.5044 13.2544L17.7589 10Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M2.24112 10L5.49556 13.2544L6.37944 12.3706L4.00888 10L6.37944 7.62944L5.49556 6.74556L2.24112 10Z", fill: "currentColor" }))));
});
