// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const DumpsterIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M2.44427 7.5C2.19768 7.5 2.04824 7.22777 2.18063 7.01973L3.8783 4.35195C3.99303 4.17167 4.1919 4.0625 4.40559 4.0625H15.5944C15.8081 4.0625 16.007 4.17167 16.1217 4.35195L17.8194 7.01973C17.9518 7.22777 17.8023 7.5 17.5557 7.5H2.44427ZM15.2513 5.3125L15.8479 6.25H4.15209L4.74868 5.3125H15.2513Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M6.25 16.25H13.75V17.5H15.625V16.25H16.875L17.25 12.5H18.75V10.625H17.4375L17.5 10V8.75H2.5V10L2.5625 10.625H1.25V12.5H2.75L3.125 16.25H4.375V17.5H6.25V16.25ZM3.75623 10H16.2438L15.7438 15H4.25623L3.75623 10Z", fill: "currentColor" }))));
});
