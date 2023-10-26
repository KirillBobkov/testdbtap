// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const OnChartIndicatorIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M3.75 10.5C4.375 11.75 5.9375 13 7.8125 12.375C9.6875 11.75 9.6875 9.87498 11.5625 8.93749C13.4375 7.99999 15.625 9.24998 16.25 10.5", stroke: "currentColor", strokeWidth: "1.25" }))));
});
