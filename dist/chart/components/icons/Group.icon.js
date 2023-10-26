// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const GroupIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M8.75 5.625C8.75 5.27982 9.02982 5 9.375 5H14.375C14.7202 5 15 5.27982 15 5.625V10.625C15 10.9702 14.7202 11.25 14.375 11.25H9.375C9.02982 11.25 8.75 10.9702 8.75 10.625V5.625Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M6.25 8.75H7.5V12.5H11.25V13.75C11.25 14.4404 10.6904 15 10 15H6.25C5.55964 15 5 14.4404 5 13.75V10C5 9.30964 5.55964 8.75 6.25 8.75Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M5 2.5C3.61929 2.5 2.5 3.61929 2.5 5V15C2.5 16.3807 3.61929 17.5 5 17.5H15C16.3807 17.5 17.5 16.3807 17.5 15V5C17.5 3.61929 16.3807 2.5 15 2.5H5ZM15 3.125H5C3.96447 3.125 3.125 3.96447 3.125 5V15C3.125 16.0355 3.96447 16.875 5 16.875H15C16.0355 16.875 16.875 16.0355 16.875 15V5C16.875 3.96447 16.0355 3.125 15 3.125Z", fill: "currentColor" }))));
});
