// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const FibretracementsIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M3.12509 6.875H12.4641L9.75574 9.37501H3.12509V10.625H8.40157L5.69323 13.125H3.1257V14.375H16.8751V13.125H7.53613L10.2445 10.625H16.8751V9.37501H11.5986L14.307 6.875H16.8757V5.625H3.12509V6.875Z", fill: "currentColor" }))));
});
