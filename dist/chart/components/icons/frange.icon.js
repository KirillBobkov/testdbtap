// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const frangeIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M10 3.75H7.875C7.32272 3.75 6.875 4.19772 6.875 4.75V15.25C6.875 15.8023 6.42729 16.25 5.875 16.25H3.75M16.25 5.625H14.125C13.5727 5.625 13.125 6.07272 13.125 6.625V10.625M13.125 10.625V16.25M13.125 10.625H10", stroke: "currentColor", strokeWidth: "1.25", strokeLinecap: "round" }))));
});
