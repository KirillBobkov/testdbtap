// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const BaselineIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M13.4376 3.80362L9.24567 7.99556L10.1295 8.87944L13.4376 5.57139L16.7457 8.87944L17.6295 7.99556L13.4376 3.80362Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M2.50011 10H17.5001V11.25H2.50011V10Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M2.37067 13.2544L3.25455 12.3706L5.93761 15.0536L8.62067 12.3706L9.50455 13.2544L5.93761 16.8214L2.37067 13.2544Z", fill: "currentColor" }))));
});
