// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const flineIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M3.5 13.5L7.79289 9.20711C8.18342 8.81658 8.81658 8.81658 9.20711 9.20711L10.7929 10.7929C11.1834 11.1834 11.8166 11.1834 12.2071 10.7929L16.5 6.5", stroke: "currentColor", strokeWidth: "1.25", strokeLinecap: "round" }))));
});
