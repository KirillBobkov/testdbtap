// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const EditIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M15.4791 4.53122C14.7793 3.82537 13.6396 3.82257 12.9364 4.52499L12.3294 5.13121L14.869 7.67268L15.4741 7.06711C16.1733 6.36741 16.1756 5.23366 15.4791 4.53122Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M13.0675 9.47551L10.5261 6.93229L4 13.4504V16L6.54774 16L13.0675 9.47551Z", fill: "currentColor" }))));
});
