// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const TextIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M10.625 3.75H14.375H15.625V5V6.875H14.375V5H10.625V15H13.125V16.25H10.625H9.375H6.875V15H9.375V5H5.625V6.875H4.375V5V3.75H5.625H9.375H10.625Z", fill: "currentColor" }))));
});
