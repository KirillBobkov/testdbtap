// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const LayoutIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M3.125 5C3.125 4.30964 3.68464 3.75 4.375 3.75H15.625C16.3154 3.75 16.875 4.30964 16.875 5V13.125C16.875 13.8154 16.3154 14.375 15.625 14.375H4.375C3.68464 14.375 3.125 13.8154 3.125 13.125V5ZM4.375 5H9.375V8.4375H4.375V5ZM4.375 9.6875L4.375 13.125H9.375V9.6875H4.375ZM10.625 13.125H15.625V5H10.625V13.125Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M15.625 16.25H4.375V17.1875H15.625V16.25Z", fill: "currentColor" }))));
});
