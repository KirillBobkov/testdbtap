// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const RegressiontrendIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M3.75014 12.7408V16.25L16.2501 12.5V3.75L3.75014 7.5V11.4249L3.74756 11.4258V12.7417L3.75014 12.7408ZM5.00014 11.0085V8.43004L15.0001 5.43004V7.67712L5.00014 11.0085ZM5.00014 12.3242L15.0001 8.99084V11.57L5.00014 14.57V12.3242Z", fill: "currentColor" }))));
});
