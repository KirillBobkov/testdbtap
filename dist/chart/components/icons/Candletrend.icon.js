// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const CandletrendIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M6.25018 2.5H7.50018V4.375H9.37518V15.625H7.50018V17.5H6.25018V15.625H4.37518V4.375H6.25018V2.5Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M12.5002 15V13.125H10.6252V6.875H12.5002V5H13.7502V6.875H15.6252V13.125H13.7502V15H12.5002ZM11.8752 8.125V11.875H14.3752V8.125H11.8752Z", fill: "currentColor" }))));
});
