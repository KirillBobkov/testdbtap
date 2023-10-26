// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const FibtimezoneIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M5.625 4.375L5.62501 15.625H4.37501L4.375 4.375L5.625 4.375Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M10.625 4.375V15.625H9.375V4.375L10.625 4.375Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M15.625 15.625V4.375L14.375 4.375V15.625H15.625Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M6.5625 10C6.5625 10.8629 5.86294 11.5625 5 11.5625C4.13706 11.5625 3.4375 10.8629 3.4375 10C3.4375 9.13705 4.13706 8.4375 5 8.4375C5.86294 8.4375 6.5625 9.13705 6.5625 10Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M11.5625 10C11.5625 10.8629 10.8629 11.5625 10 11.5625C9.13705 11.5625 8.4375 10.8629 8.4375 10C8.4375 9.13705 9.13705 8.4375 10 8.4375C10.8629 8.4375 11.5625 9.13705 11.5625 10Z", fill: "currentColor" }))));
});
