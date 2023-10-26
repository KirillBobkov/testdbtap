// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const GannboxIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M15 3.75C15.6904 3.75 16.25 4.30964 16.25 5V15C16.25 15.6904 15.6904 16.25 15 16.25H5C4.30964 16.25 3.75 15.6904 3.75 15V5C3.75 4.30964 4.30964 3.75 5 3.75H15ZM10.625 5H15V9.375H10.625V5ZM5 9.375V5H9.375V9.375H5ZM5 10.625V15H9.375V10.625H5ZM10.625 15H15V10.625H10.625V15Z", fill: "currentColor" }))));
});
