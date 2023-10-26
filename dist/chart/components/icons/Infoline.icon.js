// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const InfolineIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M8 5C8 4.44772 8.44772 4 9 4H15C15.5523 4 16 4.44772 16 5V9C16 9.55228 15.5523 10 15 10H9C8.44772 10 8 9.55228 8 9V5ZM9.25 8.75V5.25H14.75V8.75H9.25Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M2.53282 7.41519L10.5328 16.4152L11.4671 15.5847L3.46708 6.58473L2.53282 7.41519Z", fill: "currentColor" }))));
});
