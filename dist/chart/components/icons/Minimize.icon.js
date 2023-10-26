// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const MinimizeIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M6.875 8.75C7.91053 8.75 8.75 7.91053 8.75 6.875V3.75H7.5V6.875C7.5 7.22018 7.22018 7.5 6.875 7.5H3.75V8.75H6.875Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M6.875 11.25C7.91053 11.25 8.75 12.0895 8.75 13.125V16.25H7.5V13.125C7.5 12.7798 7.22018 12.5 6.875 12.5H3.75V11.25H6.875Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M13.125 8.75C12.0895 8.75 11.25 7.91053 11.25 6.875V3.75H12.5V6.875C12.5 7.22018 12.7798 7.5 13.125 7.5L16.25 7.5L16.25 8.75H13.125Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M11.25 13.125C11.25 12.0895 12.0895 11.25 13.125 11.25H16.25L16.25 12.5H13.125C12.7798 12.5 12.5 12.7798 12.5 13.125V16.25L11.25 16.25V13.125Z", fill: "currentColor" }))));
});
