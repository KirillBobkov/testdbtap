// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const Chartlayoutv3Icon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M15.625 5.625H10.3125L8.41322 4.5397C8.22435 4.43177 8.01058 4.375 7.79304 4.375H4.375C3.68464 4.375 3.125 4.93464 3.125 5.625V14.375C3.125 15.0654 3.68464 15.625 4.375 15.625H15.625C16.3154 15.625 16.875 15.0654 16.875 14.375V6.875C16.875 6.18464 16.3154 5.625 15.625 5.625ZM9.98054 6.875H15.625V8.125H4.375V5.625L7.79304 5.625L9.98054 6.875ZM4.375 9.375L4.375 14.375H15.625V9.375H4.375Z", fill: "currentColor" }))));
});
