// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const BinIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M12.8125 2.5H7.1875V3.75H12.8125V2.5Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M7.8125 8.125H9.0625V15H7.8125V8.125Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M12.1875 8.125H10.9375V15H12.1875V8.125Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M3.4375 5H16.5625V6.25H15.3125V16.25C15.3125 17.2855 14.473 18.125 13.4375 18.125H6.5625C5.52697 18.125 4.6875 17.2855 4.6875 16.25V6.25H3.4375V5ZM5.9375 6.25H14.0625V16.25C14.0625 16.5952 13.7827 16.875 13.4375 16.875H6.5625C6.21732 16.875 5.9375 16.5952 5.9375 16.25V6.25Z", fill: "currentColor" }))));
});
