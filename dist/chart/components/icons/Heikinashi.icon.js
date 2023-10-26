// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const HeikinashiIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M7.50021 2.5H6.25021V4.375H4.37521V15.625H9.37521V4.375H7.50021V2.5ZM8.12521 5.625V14.375H5.62521V5.625H8.12521Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M13.7502 5H12.5002V6.875H10.6252V13.125H15.6252V6.875H13.7502V5ZM11.8752 11.875V8.125H14.3752V11.875H11.8752Z", fill: "currentColor" }))));
});
