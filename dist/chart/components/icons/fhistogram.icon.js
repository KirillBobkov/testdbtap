// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const fhistogramIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M8.75 4.125C8.75 3.57272 9.19772 3.125 9.75 3.125H10.25C10.8023 3.125 11.25 3.57271 11.25 4.125V16.875H8.75V4.125Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M5 7.25C5 6.69772 5.44772 6.25 6 6.25H6.5C7.05229 6.25 7.5 6.69771 7.5 7.25V16.875H5V7.25Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M15 10.375C15 9.82272 14.5523 9.375 14 9.375H13.5C12.9477 9.375 12.5 9.82271 12.5 10.375V16.875H15V10.375Z", fill: "currentColor" }))));
});
