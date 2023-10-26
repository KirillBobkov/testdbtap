// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const RRlongIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M3.125 5C3.125 4.30964 3.68464 3.75 4.375 3.75H15.625C16.3154 3.75 16.875 4.30964 16.875 5V9.375C16.875 10.0654 16.3154 10.625 15.625 10.625H4.375C3.68464 10.625 3.125 10.0654 3.125 9.375V5ZM4.375 5H15.625L15.625 9.375H4.375L4.375 5Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M3.125 13.125C3.125 12.4346 3.68464 11.875 4.375 11.875H15.625C16.3154 11.875 16.875 12.4346 16.875 13.125V15C16.875 15.6904 16.3154 16.25 15.625 16.25H4.375C3.68464 16.25 3.125 15.6904 3.125 15V13.125ZM4.375 13.125H15.625V15H4.375L4.375 13.125Z", fill: "currentColor" }))));
});
