// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const MaximizeIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M5.625 3.75C4.58947 3.75 3.75 4.58947 3.75 5.625V8.75H5V5.625C5 5.27982 5.27982 5 5.625 5H8.75V3.75H5.625Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M5.625 16.25C4.58947 16.25 3.75 15.4105 3.75 14.375V11.25H5V14.375C5 14.7202 5.27982 15 5.625 15H8.75V16.25H5.625Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M14.375 3.75C15.4105 3.75 16.25 4.58947 16.25 5.625V8.75L15 8.75V5.625C15 5.27982 14.7202 5 14.375 5L11.25 5V3.75H14.375Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M16.25 14.375C16.25 15.4105 15.4105 16.25 14.375 16.25H11.25V15H14.375C14.7202 15 15 14.7202 15 14.375V11.25H16.25V14.375Z", fill: "currentColor" }))));
});
