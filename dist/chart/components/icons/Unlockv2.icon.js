// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const Unlockv2Icon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M9.58333 3.125C8.08756 3.125 6.875 4.33756 6.875 5.83333V8.125H6.5625C5.69956 8.125 5 8.82456 5 9.6875V14.6875C5 15.5504 5.69955 16.25 6.5625 16.25H13.4375C14.3004 16.25 15 15.5504 15 14.6875V9.6875C15 8.82456 14.3004 8.125 13.4375 8.125H13.125V5.83333C13.125 4.33756 11.9124 3.125 10.4167 3.125H9.58333ZM11.875 8.125V5.83333C11.875 5.02792 11.2221 4.375 10.4167 4.375H9.58333C8.77792 4.375 8.125 5.02792 8.125 5.83333V8.125H11.875Z", fill: "currentColor" }))));
});
