// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const OvalIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M17.5 10C17.5 11.4918 16.7155 12.8846 15.3642 13.924C14.0122 14.964 12.1177 15.625 10 15.625C7.88225 15.625 5.98781 14.964 4.63583 13.924C3.28452 12.8846 2.5 11.4918 2.5 10C2.5 8.50818 3.28452 7.11544 4.63583 6.07597C5.98781 5.03598 7.88225 4.375 10 4.375C12.1177 4.375 14.0122 5.03598 15.3642 6.07597C16.7155 7.11544 17.5 8.50818 17.5 10Z", stroke: "currentColor", strokeWidth: "1.25" }))));
});
