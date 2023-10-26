// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const CycleIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M17.5 13.75C17.5 11.7609 16.7098 9.85322 15.3033 8.4467C13.8968 7.04018 11.9891 6.25 10 6.25C8.01088 6.25 6.10322 7.04018 4.6967 8.4467C3.29018 9.85322 2.5 11.7609 2.5 13.75H3.74223C3.74223 12.0903 4.40153 10.4986 5.57509 9.32508C6.74865 8.15152 8.34034 7.49223 10 7.49223C11.6597 7.49223 13.2514 8.15152 14.4249 9.32509C15.5985 10.4986 16.2578 12.0903 16.2578 13.75H17.5Z", fill: "currentColor" }))));
});
