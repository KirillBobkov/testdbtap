// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const CompareIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M13.75 3.125H15V5H16.875V6.25H15V8.125H13.75V6.25H11.875V5H13.75V3.125Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M13.625 10.0625L12.625 9.3125L10.1754 12.5786L7.04139 10.3848L2.61832 16.5091L3.63167 17.2409L7.3336 12.1152L10.4496 14.2964L13.625 10.0625Z", fill: "currentColor" }))));
});
