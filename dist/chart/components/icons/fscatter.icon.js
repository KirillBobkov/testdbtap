// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const fscatterIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M8.4375 6.25C8.4375 7.11294 7.73795 7.8125 6.875 7.8125C6.01206 7.8125 5.3125 7.11294 5.3125 6.25C5.3125 5.38706 6.01206 4.6875 6.875 4.6875C7.73795 4.6875 8.4375 5.38706 8.4375 6.25Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M5.3125 10C5.3125 10.8629 4.61294 11.5625 3.75 11.5625C2.88706 11.5625 2.1875 10.8629 2.1875 10C2.1875 9.13705 2.88706 8.4375 3.75 8.4375C4.61294 8.4375 5.3125 9.13705 5.3125 10Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M10 11.5625C10.8629 11.5625 11.5625 10.8629 11.5625 10C11.5625 9.13705 10.8629 8.4375 10 8.4375C9.13705 8.4375 8.4375 9.13705 8.4375 10C8.4375 10.8629 9.13705 11.5625 10 11.5625Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M14.6875 13.75C14.6875 14.6129 13.9879 15.3125 13.125 15.3125C12.2621 15.3125 11.5625 14.6129 11.5625 13.75C11.5625 12.8871 12.2621 12.1875 13.125 12.1875C13.9879 12.1875 14.6875 12.8871 14.6875 13.75Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M16.25 11.5625C17.1129 11.5625 17.8125 10.8629 17.8125 10C17.8125 9.13705 17.1129 8.4375 16.25 8.4375C15.3871 8.4375 14.6875 9.13705 14.6875 10C14.6875 10.8629 15.3871 11.5625 16.25 11.5625Z", fill: "currentColor" }))));
});
