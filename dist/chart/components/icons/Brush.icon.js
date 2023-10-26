// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const BrushIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M7.50012 13.125L3.38401 9.00888C2.89585 8.52073 2.89585 7.72927 3.38401 7.24112L6.25012 4.375M7.50012 13.125H10.7091C11.0543 13.125 11.3841 13.2678 11.6204 13.5195L14.3202 16.3953C14.8876 16.9997 15.8425 17.0148 16.4287 16.4286V16.4286C17.0149 15.8424 16.9998 14.8875 16.3954 14.3201L13.5196 11.6203C13.2679 11.384 13.1251 11.0542 13.1251 10.709V7.5M7.50012 13.125L13.1251 7.5M13.1251 7.5L9.009 3.38388C8.52085 2.89573 7.72939 2.89573 7.24124 3.38388L6.25012 4.375M6.25012 4.375L8.75012 6.875", stroke: "currentColor", strokeWidth: "1.25" }))));
});
