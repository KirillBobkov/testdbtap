// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const fareaIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M7.73039 8.51961L3.58211 12.6679C2.95214 13.2979 3.39831 14.375 4.28921 14.375H15.875C16.4273 14.375 16.875 13.9273 16.875 13.375V6.78921C16.875 5.89831 15.7979 5.45214 15.1679 6.08211L11.6446 9.60539C11.2541 9.99592 10.6209 9.99592 10.2304 9.60539L9.14461 8.51961C8.75408 8.12908 8.12092 8.12908 7.73039 8.51961Z", fill: "currentColor" }))));
});
