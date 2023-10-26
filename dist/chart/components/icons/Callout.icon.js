// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const CalloutIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("mask", { id: "path-1-inside-1_1169_10453", fill: "white" },
                React.createElement("path", { shapeRendering: svgShapeRendering, d: "M3.125 5.625C3.125 4.93464 3.68464 4.375 4.375 4.375H15.625C16.3154 4.375 16.875 4.93464 16.875 5.625V11.875C16.875 12.5654 16.3154 13.125 15.625 13.125H7.5L3.125 15.625V12.5V10.3125V5.625Z" })),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M3.125 5.625C3.125 4.93464 3.68464 4.375 4.375 4.375H15.625C16.3154 4.375 16.875 4.93464 16.875 5.625V11.875C16.875 12.5654 16.3154 13.125 15.625 13.125H7.5L3.125 15.625V12.5V10.3125V5.625Z", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", mask: "url(#path-1-inside-1_1169_10453)" }))));
});
