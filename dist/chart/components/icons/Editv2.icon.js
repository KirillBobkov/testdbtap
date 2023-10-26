// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const Editv2Icon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M12.9488 5.70689L12.3301 6.32561L14.0979 8.09337L14.7166 7.47465C14.9641 7.22714 15.0878 7.10339 15.1342 6.96068C15.175 6.83516 15.175 6.69994 15.1342 6.57441C15.0878 6.43171 14.9641 6.30795 14.7166 6.06044L14.363 5.70689C14.1155 5.45938 13.9918 5.33562 13.8491 5.28926C13.7235 5.24847 13.5883 5.24847 13.4628 5.28926C13.3201 5.33562 13.1963 5.45938 12.9488 5.70689Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M11.4462 7.20989L13.2139 8.9777L7.46869 14.7229L5.25903 15.1648L5.70093 12.9552L11.4462 7.20989Z", fill: "currentColor" }))));
});
