// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const Hidev2Icon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M10 11.25C10.6904 11.25 11.25 10.6904 11.25 10C11.25 9.30964 10.6904 8.75 10 8.75C9.30964 8.75 8.75 9.30964 8.75 10C8.75 10.6904 9.30964 11.25 10 11.25Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M16.875 10C16.875 11.25 14.1421 14.375 10 14.375C5.85786 14.375 3.125 11.25 3.125 10C3.125 8.75 5.85786 5.625 10 5.625C14.1421 5.625 16.875 8.75 16.875 10ZM13.125 10C13.125 11.7259 11.7259 13.125 10 13.125C8.27411 13.125 6.875 11.7259 6.875 10C6.875 8.27411 8.27411 6.875 10 6.875C11.7259 6.875 13.125 8.27411 13.125 10Z", fill: "currentColor" }))));
});
