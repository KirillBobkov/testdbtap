// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const ScaleIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M12.5 12.5V2.5H17.5V17.5H2.5V12.5H12.5ZM13.75 3.75H16.25V15.3661L13.75 12.8661V3.75ZM12.8661 13.75H3.75V16.25H15.3661L12.8661 13.75Z", fill: "currentColor" }))));
});
