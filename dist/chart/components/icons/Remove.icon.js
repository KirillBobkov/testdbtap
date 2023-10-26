// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const RemoveIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M6.75402 14C6.54559 14 6.36782 13.9264 6.22069 13.7793C6.07356 13.6261 6 13.4421 6 13.2276C6 13.0192 6.07356 12.8414 6.22069 12.6943L8.91494 10L6.22069 7.30575C6.07356 7.15862 6 6.98084 6 6.77241C6 6.55785 6.07356 6.38008 6.22069 6.23908C6.36782 6.09195 6.54559 6.01839 6.75402 6.01839C6.97471 6.01839 7.15249 6.09195 7.28736 6.23908L9.9908 8.93333L12.7218 6.22989C12.869 6.07663 13.0437 6 13.246 6C13.4544 6 13.6322 6.07356 13.7793 6.22069C13.9264 6.36782 14 6.54559 14 6.75402C14 6.95632 13.9264 7.13716 13.7793 7.29655L11.0759 10L13.7701 12.6851C13.9172 12.8444 13.9908 13.0253 13.9908 13.2276C13.9908 13.4421 13.9172 13.6261 13.7701 13.7793C13.623 13.9264 13.4421 14 13.2276 14C13.0253 14 12.8444 13.9234 12.6851 13.7701L9.9908 11.0759L7.31494 13.7701C7.16169 13.9234 6.97471 14 6.75402 14Z", fill: "currentColor" }))));
});
