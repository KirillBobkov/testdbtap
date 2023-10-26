// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const UnderlineIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M6.90641 13.0936C7.72688 13.9141 8.83968 14.375 10 14.375C11.1603 14.375 12.2731 13.9141 13.0936 13.0936C13.9141 12.2731 14.375 11.1603 14.375 10V3.125H13.125V10C13.125 10.8288 12.7958 11.6237 12.2097 12.2097C11.6237 12.7958 10.8288 13.125 10 13.125C9.1712 13.125 8.37634 12.7958 7.79029 12.2097C7.20424 11.6237 6.875 10.8288 6.875 10V3.125H5.625V10C5.625 11.1603 6.08594 12.2731 6.90641 13.0936ZM2.5 17.5V16.25H17.5V17.5H2.5Z", fill: "currentColor" }))));
});
