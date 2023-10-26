// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const Chartlayoutv2Icon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M5 3.75C4.30964 3.75 3.75 4.30964 3.75 5V8.125C3.75 8.81536 4.30964 9.375 5 9.375H8.125C8.81536 9.375 9.375 8.81536 9.375 8.125V5C9.375 4.30964 8.81536 3.75 8.125 3.75H5Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M3.75 11.875C3.75 11.1846 4.30964 10.625 5 10.625H8.125C8.81536 10.625 9.375 11.1846 9.375 11.875V15C9.375 15.6904 8.81536 16.25 8.125 16.25H5C4.30964 16.25 3.75 15.6904 3.75 15V11.875ZM5 11.875H8.125V15H5L5 11.875Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M11.875 3.75C11.1846 3.75 10.625 4.30964 10.625 5V8.125C10.625 8.81536 11.1846 9.375 11.875 9.375H15C15.6904 9.375 16.25 8.81536 16.25 8.125V5C16.25 4.30964 15.6904 3.75 15 3.75H11.875ZM15 5H11.875V8.125H15V5Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M10.625 11.875C10.625 11.1846 11.1846 10.625 11.875 10.625H15C15.6904 10.625 16.25 11.1846 16.25 11.875V15C16.25 15.6904 15.6904 16.25 15 16.25H11.875C11.1846 16.25 10.625 15.6904 10.625 15V11.875ZM11.875 11.875H15V15H11.875V11.875Z", fill: "currentColor" }))));
});
