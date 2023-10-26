// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const TrendchannelIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("mask", { id: "path-1-inside-1_1169_10523", fill: "white" },
                React.createElement("path", { shapeRendering: svgShapeRendering, d: "M3.75014 7.5L16.2501 3.75V12.5L3.75014 16.25V7.5Z" })),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M3.75014 7.5L16.2501 3.75V12.5L3.75014 16.25V7.5Z", stroke: "currentColor", strokeWidth: "2.5", mask: "url(#path-1-inside-1_1169_10523)" }))));
});
