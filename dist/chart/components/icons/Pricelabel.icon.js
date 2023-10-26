// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const PricelabelIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("mask", { id: "path-1-inside-1_1169_10434", fill: "white" },
                React.createElement("path", { shapeRendering: svgShapeRendering, d: "M3.125 5.625C3.125 4.93464 3.68464 4.375 4.375 4.375H15.625C16.3154 4.375 16.875 4.93464 16.875 5.625V11.875C16.875 12.5654 16.3154 13.125 15.625 13.125H12.8125L10 15.625L7.1875 13.125H4.375C3.68464 13.125 3.125 12.5654 3.125 11.875V5.625Z" })),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M3.125 5.625C3.125 4.93464 3.68464 4.375 4.375 4.375H15.625C16.3154 4.375 16.875 4.93464 16.875 5.625V11.875C16.875 12.5654 16.3154 13.125 15.625 13.125H12.8125L10 15.625L7.1875 13.125H4.375C3.68464 13.125 3.125 12.5654 3.125 11.875V5.625Z", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", mask: "url(#path-1-inside-1_1169_10434)" }))));
});
