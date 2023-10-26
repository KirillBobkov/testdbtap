// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const CalendarIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M5.625 9.375V5.625H18.125V10.625H14.375V14.375H1.875V9.375H5.625ZM6.875 6.875H9.375V9.375H6.875V6.875ZM9.375 13.125V10.625H6.875V13.125H9.375ZM10.625 13.125H13.125V10.625H10.625V13.125ZM10.625 9.375H13.125V6.875H10.625V9.375ZM16.875 9.375H14.375V6.875H16.875V9.375ZM5.625 10.625H3.125V13.125H5.625V10.625Z", fill: "currentColor" }))));
});
