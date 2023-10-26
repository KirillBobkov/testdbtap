// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const FibextensionIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M16.8751 5.62516V6.87516H12.2236L14.9319 9.37516H16.8751V10.6252H8.26303L6.51303 13.1252H16.8751V14.3752H3.12512V13.1252H4.98721L6.73721 10.6252H3.12512V9.37516H7.61221L9.36221 6.87516H3.12512V5.62516H16.8751ZM10.6889 7.15964L13.089 9.37516H9.13803L10.6889 7.15964Z", fill: "currentColor" }))));
});
