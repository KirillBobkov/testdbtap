// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const Lockv2Icon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M9.08836 3.125C7.86626 3.125 6.82329 4.00853 6.62238 5.214L6.571 5.52225C6.51426 5.86273 6.74427 6.18475 7.08475 6.2415C7.42523 6.29824 7.74725 6.06823 7.804 5.72775L7.85537 5.4195C7.95583 4.81677 8.47731 4.375 9.08836 4.375H10.4167C11.2221 4.375 11.875 5.02792 11.875 5.83333V8.125H6.5625C5.69956 8.125 5 8.82456 5 9.6875V14.6875C5 15.5504 5.69955 16.25 6.5625 16.25H13.4375C14.3004 16.25 15 15.5504 15 14.6875V9.6875C15 8.82456 14.3004 8.125 13.4375 8.125H13.125V5.83333C13.125 4.33756 11.9124 3.125 10.4167 3.125H9.08836Z", fill: "currentColor" }))));
});
