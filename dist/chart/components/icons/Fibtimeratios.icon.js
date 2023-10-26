// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const FibtimeratiosIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M13.75 11.25C13.75 11.9404 13.1904 12.5 12.5 12.5C11.8096 12.5 11.25 11.9404 11.25 11.25C11.25 10.5596 11.8096 10 12.5 10C13.1904 10 13.75 10.5596 13.75 11.25Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M5.625 8.75C5.625 9.44036 5.06536 10 4.375 10C3.68464 10 3.125 9.44036 3.125 8.75C3.125 8.05964 3.68464 7.5 4.375 7.5C5.06536 7.5 5.625 8.05964 5.625 8.75Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M15.625 4.375H16.875V15.625H15.625V4.375Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M8.125 4.375H9.375V15.625H8.125V4.375Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M5 4.375H3.75V6.32876C3.94976 6.27735 4.15919 6.25 4.375 6.25C4.59081 6.25 4.80024 6.27735 5 6.32876V4.375Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M5 11.1712C4.80024 11.2227 4.59081 11.25 4.375 11.25C4.15919 11.25 3.94976 11.2227 3.75 11.1712V15.625H5V11.1712Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M13.125 4.375H11.875V8.82876C12.0748 8.77735 12.2842 8.75 12.5 8.75C12.7158 8.75 12.9252 8.77735 13.125 8.82876V4.375Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M13.125 13.6712C12.9252 13.7227 12.7158 13.75 12.5 13.75C12.2842 13.75 12.0748 13.7227 11.875 13.6712V15.625H13.125V13.6712Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M5.38574 8.40821L11.7993 10.3931L11.4803 11.5892L8.31793 10.6187L5.10226 9.6252L5.38574 8.40821Z", fill: "currentColor" }))));
});
