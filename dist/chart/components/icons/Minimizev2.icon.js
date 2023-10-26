// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const Minimizev2Icon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M12.4464 8.4375L17.4419 3.44194L16.558 2.55806L11.5625 7.55362V5H10.3125V9.6875H15V8.4375H12.4464Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M7.5536 11.5625L2.55804 16.5581L3.44193 17.4419L8.43749 12.4464V15H9.68749V10.3125H4.99999V11.5625H7.5536Z", fill: "currentColor" }))));
});
