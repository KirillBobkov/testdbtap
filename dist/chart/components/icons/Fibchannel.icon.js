// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const FibchannelIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M3.9019 8.10623L16.4019 4.98123L16.0987 3.76855L3.59873 6.89355L3.9019 8.10623ZM16.4016 8.73124L3.90096 11.8562L3.59781 10.6436L16.0984 7.51856L16.4016 8.73124ZM16.4019 12.4812L3.9019 15.6062L3.59873 14.3936L16.0987 11.2686L16.4019 12.4812Z", fill: "currentColor" }))));
});
