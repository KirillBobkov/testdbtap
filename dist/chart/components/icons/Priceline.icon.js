// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const PricelineIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M5.625 10.625V9.375H14.375V10.625H5.625Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M15.3127 8.4375C16.1756 8.4375 16.8752 9.13705 16.8752 10C16.8752 10.8629 16.1756 11.5625 15.3127 11.5625C14.4497 11.5625 13.7502 10.8629 13.7502 10C13.7502 9.13705 14.4497 8.4375 15.3127 8.4375Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M4.68768 8.4375C5.55062 8.4375 6.25018 9.13705 6.25018 10C6.25018 10.8629 5.55062 11.5625 4.68768 11.5625C3.82474 11.5625 3.12518 10.8629 3.12518 10C3.12518 9.13705 3.82474 8.4375 4.68768 8.4375Z", fill: "currentColor" }))));
});
