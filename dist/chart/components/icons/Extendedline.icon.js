// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const ExtendedlineIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M10.6261 7.8125C10.6261 6.94955 11.3257 6.25 12.1886 6.25C13.0516 6.25 13.7511 6.94955 13.7511 7.8125C13.7511 8.67544 13.0516 9.375 12.1886 9.375C11.3257 9.375 10.6261 8.67544 10.6261 7.8125Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M6.25113 12.1875C6.25113 11.3246 6.95068 10.625 7.81363 10.625C8.67657 10.625 9.37612 11.3246 9.37612 12.1875C9.37612 13.0504 8.67657 13.75 7.81363 13.75C6.95068 13.75 6.25113 13.0504 6.25113 12.1875Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M15.4443 5.44189L14.5605 4.56299L4.55811 14.5581L5.43945 15.4443L15.4443 5.44189Z", fill: "currentColor" }))));
});
