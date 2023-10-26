// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const EventsIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("mask", { id: "path-1-inside-1_1169_10474", fill: "white" },
                React.createElement("path", { shapeRendering: svgShapeRendering, d: "M3 10L10 3L17 10L10 17L3 10Z" })),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M3 10L10 3L17 10L10 17L3 10Z", stroke: "currentColor", strokeWidth: "3", mask: "url(#path-1-inside-1_1169_10474)" }))));
});
