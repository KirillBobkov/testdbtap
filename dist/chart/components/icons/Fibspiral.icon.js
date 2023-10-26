// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const FibspiralIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M10 10.5V10.5C10 9.67158 9.32843 9.00001 8.5 9.00001V9.00001C7.67158 9.00001 7 9.67158 7 10.5V11C7 12.1046 7.89543 13 9 13H10C11.6569 13 13 11.6569 13 10V9.5C13 7.567 11.433 6 9.5 6H8.5C6.01472 6 4 8.01472 4 10.5V11C4 13.7614 6.23858 16 9 16H10C13.3137 16 16 13.3137 16 10V9.73185C16 6.09418 12.9137 3.22045 9.28526 3.47962L9 3.5", stroke: "currentColor", strokeWidth: "1.25", strokeLinecap: "round" }))));
});
