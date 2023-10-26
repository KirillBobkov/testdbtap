// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const LegendIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M5 5.625C4.65482 5.625 4.375 5.90482 4.375 6.25V10C4.375 10.3452 4.65482 10.625 5 10.625H7.5C7.84518 10.625 8.125 10.3452 8.125 10V6.25C8.125 5.90482 7.84518 5.625 7.5 5.625H5Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M15 3.75H5C3.61929 3.75 2.5 4.86929 2.5 6.25V13.75C2.5 15.1307 3.61929 16.25 5 16.25H15C16.3807 16.25 17.5 15.1307 17.5 13.75V6.25C17.5 4.86929 16.3807 3.75 15 3.75ZM3.75 6.25C3.75 5.55964 4.30964 5 5 5H15C15.6904 5 16.25 5.55964 16.25 6.25V13.75C16.25 14.4404 15.6904 15 15 15H5C4.30964 15 3.75 14.4404 3.75 13.75V6.25Z", fill: "currentColor" }))));
});
