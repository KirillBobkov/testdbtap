// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const DraghandleIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M7.5 6C8.05228 6 8.5 5.55228 8.5 5C8.5 4.44772 8.05228 4 7.5 4C6.94772 4 6.5 4.44772 6.5 5C6.5 5.55228 6.94772 6 7.5 6Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M7.5 11C8.05228 11 8.5 10.5523 8.5 10C8.5 9.44772 8.05228 9 7.5 9C6.94772 9 6.5 9.44772 6.5 10C6.5 10.5523 6.94772 11 7.5 11Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M8.5 15C8.5 15.5523 8.05228 16 7.5 16C6.94772 16 6.5 15.5523 6.5 15C6.5 14.4477 6.94772 14 7.5 14C8.05228 14 8.5 14.4477 8.5 15Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M12.5 6C13.0523 6 13.5 5.55228 13.5 5C13.5 4.44772 13.0523 4 12.5 4C11.9477 4 11.5 4.44772 11.5 5C11.5 5.55228 11.9477 6 12.5 6Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M13.5 10C13.5 10.5523 13.0523 11 12.5 11C11.9477 11 11.5 10.5523 11.5 10C11.5 9.44772 11.9477 9 12.5 9C13.0523 9 13.5 9.44772 13.5 10Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M12.5 16C13.0523 16 13.5 15.5523 13.5 15C13.5 14.4477 13.0523 14 12.5 14C11.9477 14 11.5 14.4477 11.5 15C11.5 15.5523 11.9477 16 12.5 16Z", fill: "currentColor" }))));
});
