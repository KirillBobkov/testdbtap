// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const OffChartIndicatorIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M3.125 6.875H5.625V8.125H3.125V6.875Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M6.875 6.875H9.375V8.125H6.875V6.875Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M13.125 6.875H10.625V8.125H13.125V6.875Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M14.375 6.875H16.875V8.125H14.375V6.875Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M11.842 11.4965C12.5812 11.1269 13.4031 11.1761 14.1384 11.4769C14.8881 11.7836 15.4596 12.3168 15.691 12.7795L16.809 12.2205C16.4154 11.4332 15.5806 10.7164 14.6116 10.32C13.6281 9.91763 12.4188 9.81059 11.283 10.3785C10.2405 10.8997 9.69184 11.6804 9.24703 12.3134L9.17689 12.413C8.71281 13.0705 8.3441 13.539 7.61486 13.7821C6.1465 14.2715 4.85495 13.3124 4.30902 12.2205L3.19098 12.7795C3.89505 14.1876 5.7285 15.7285 8.01014 14.9679C9.1559 14.586 9.72469 13.8045 10.1981 13.1339L10.2378 13.0776C10.6994 12.4231 11.0865 11.8743 11.842 11.4965Z", fill: "currentColor" }))));
});
