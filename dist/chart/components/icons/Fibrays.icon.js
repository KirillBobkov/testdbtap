// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const FibraysIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M17.0036 3.87949L6.33631 14.5468L15.6818 10.367L16.1922 11.5081L3.75563 17.0703C3.69136 17.0991 3.62482 17.1161 3.55842 17.1223C3.48713 17.1291 3.41399 17.1238 3.34212 17.105C3.27311 17.0872 3.20656 17.0573 3.14576 17.0156C3.08409 16.9734 3.03176 16.9213 2.98998 16.8625C2.93578 16.7865 2.90062 16.7012 2.88449 16.613C2.86828 16.5253 2.87068 16.4335 2.894 16.3437C2.90387 16.3053 2.91742 16.2677 2.93467 16.2315L8.49145 3.80737L9.63252 4.31772L5.45311 13.6622L16.1197 2.99561L17.0036 3.87949Z", fill: "currentColor" }))));
});
