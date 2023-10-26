// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const PricerangeIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M3.75 2.5H16.25V3.75H3.75V2.5Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M3.75 16.25H16.25V17.5H3.75V16.25Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M13.8526 11.0938L12.9688 10.2099L10.4687 12.7099L10.4688 5.15625L9.21875 5.15625L9.21875 12.7099L6.71875 10.2099L5.83487 11.0938L9.84375 15.1026L13.8526 11.0938Z", fill: "currentColor" }))));
});
