// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const NewScriptIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M14.375 4.375C14.7202 4.375 15 4.65482 15 5V6.25H16.25C16.5952 6.25 16.875 6.52982 16.875 6.875C16.875 7.22018 16.5952 7.5 16.25 7.5H15V8.75C15 9.09518 14.7202 9.375 14.375 9.375C14.0298 9.375 13.75 9.09518 13.75 8.75V7.5H12.5C12.1548 7.5 11.875 7.22018 11.875 6.875C11.875 6.52982 12.1548 6.25 12.5 6.25H13.75V5C13.75 4.65482 14.0298 4.375 14.375 4.375Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M10.5986 7.67959C10.6978 7.34897 10.5102 7.00054 10.1796 6.90136C9.84896 6.80217 9.50053 6.98979 9.40134 7.32041L7.52634 13.5704C7.42716 13.901 7.61477 14.2495 7.94539 14.3486C8.27601 14.4478 8.62444 14.2602 8.72363 13.9296L10.5986 7.67959Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M6.809 7.22049C6.96337 7.52923 6.83823 7.90465 6.52949 8.05902L4.52253 9.0625L6.52949 10.066C6.83823 10.2204 6.96337 10.5958 6.809 10.9045C6.65463 11.2132 6.27921 11.3384 5.97048 11.184L2.95728 9.67742C2.45056 9.42406 2.45056 8.70094 2.95728 8.44758L5.97048 6.94098C6.27921 6.78661 6.65463 6.91176 6.809 7.22049Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M11.316 10.3455C11.1616 10.6542 11.2867 11.0296 11.5955 11.184L13.6024 12.1875L11.5955 13.191C11.2867 13.3454 11.1616 13.7208 11.316 14.0295C11.4703 14.3382 11.8458 14.4634 12.1545 14.309L15.1677 12.8024C15.6744 12.5491 15.6744 11.8259 15.1677 11.5726L12.1545 10.066C11.8458 9.91161 11.4703 10.0368 11.316 10.3455Z", fill: "currentColor" }))));
});
