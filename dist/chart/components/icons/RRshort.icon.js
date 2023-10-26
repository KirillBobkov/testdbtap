// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const RRshortIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M3.125 5C3.125 4.30964 3.68464 3.75 4.375 3.75H15.625C16.3154 3.75 16.875 4.30964 16.875 5V6.875C16.875 7.56536 16.3154 8.125 15.625 8.125H4.375C3.68464 8.125 3.125 7.56536 3.125 6.875V5ZM4.375 5H15.625V6.875H4.375L4.375 5Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M3.125 10.625C3.125 9.93464 3.68464 9.375 4.375 9.375H15.625C16.3154 9.375 16.875 9.93464 16.875 10.625V15C16.875 15.6904 16.3154 16.25 15.625 16.25H4.375C3.68464 16.25 3.125 15.6904 3.125 15V10.625ZM4.375 10.625H15.625L15.625 15H4.375L4.375 10.625Z", fill: "currentColor" }))));
});
