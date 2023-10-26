// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const Binv2Icon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M8.35978 7.51774L8.67228 14.3927L9.45272 14.3573L9.14022 7.48226L8.35978 7.51774Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M10.5473 14.3573L10.8598 7.48226L11.6402 7.51774L11.3277 14.3927L10.5473 14.3573Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M6.875 5V4.375C6.875 3.33947 7.71447 2.5 8.75 2.5H11.25C12.2855 2.5 13.125 3.33947 13.125 4.375V5H15.625V6.25H14.3336L13.7243 15.1284C13.6568 16.1118 12.8394 16.875 11.8537 16.875H8.14632C7.16061 16.875 6.34321 16.1118 6.27572 15.1284L5.66642 6.25H4.375V5H6.875ZM8.125 4.375C8.125 4.02982 8.40482 3.75 8.75 3.75H11.25C11.5952 3.75 11.875 4.02982 11.875 4.375V5H8.125V4.375ZM6.91936 6.25H13.0806L12.4772 15.0428C12.4547 15.3706 12.1822 15.625 11.8537 15.625H8.14632C7.81775 15.625 7.54529 15.3706 7.52279 15.0428L6.91936 6.25Z", fill: "currentColor" }))));
});
