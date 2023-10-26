// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const TextcolorIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M13.75 15H15L10.625 4.375H9.375L5 15H6.25L7.25625 12.5H12.7188L13.75 15ZM7.76875 11.25L9.91875 6.01875H10.0812L12.2125 11.25H7.76875Z", fill: "currentColor" }))));
});
