// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const Draghandlev2Icon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "11", viewBox: "0 0 20 11", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M3 4L1 6L3 8M17 4L19 6L17 8M10 4V8M12 4V8M8 4V8", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" }))));
});
