// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const Labelv2Icon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M12.9394 6.71282C12.6131 6.44868 12.4499 6.31661 12.2679 6.22267C12.1063 6.13932 11.9342 6.07838 11.7562 6.04154C11.5556 6 11.3457 6 10.9259 6L5.6 6C5.03995 6 4.75992 6 4.54601 6.10899C4.35785 6.20487 4.20487 6.35785 4.10899 6.54601C4 6.75992 4 7.03995 4 7.6L4 12.4C4 12.9601 4 13.2401 4.10899 13.454C4.20487 13.6422 4.35785 13.7951 4.54601 13.891C4.75992 14 5.03995 14 5.6 14L10.9259 14C11.3457 14 11.5556 14 11.7562 13.9585C11.9342 13.9216 12.1064 13.8607 12.2679 13.7773C12.4499 13.6834 12.6131 13.5513 12.9394 13.2872L15.4638 11.2436C15.9896 10.8179 16.2525 10.6051 16.3479 10.3486C16.4316 10.1237 16.4316 9.87626 16.3479 9.65137C16.2525 9.39492 15.9896 9.18208 15.4638 8.75641L12.9394 6.71282Z", fill: "currentColor" }))));
});
