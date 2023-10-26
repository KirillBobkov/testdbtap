// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const MultiplechartsIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M5 3.75C4.30964 3.75 3.75 4.30964 3.75 5V15C3.75 15.6904 4.30964 16.25 5 16.25H15C15.6904 16.25 16.25 15.6904 16.25 15V5C16.25 4.30964 15.6904 3.75 15 3.75H5ZM15 5H10.625V15H15V5ZM5 10.625V15H9.375V10.625H5ZM9.375 9.375V5H5V9.375H9.375Z", fill: "currentColor" }))));
});
