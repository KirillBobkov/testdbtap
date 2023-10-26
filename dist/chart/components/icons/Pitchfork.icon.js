// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const PitchforkIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M4.37503 15.625L7.50003 12.5M14.0625 5.9375L7.50003 12.5M7.50003 12.5L5.57141 10.5714C5.08326 10.0832 5.08326 9.29177 5.57141 8.80362L11.25 3.125M7.50003 12.5L9.42865 14.4286C9.9168 14.9168 10.7083 14.9168 11.1964 14.4286L16.875 8.75", stroke: "currentColor", strokeWidth: "1.25" }))));
});
