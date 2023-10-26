// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const ComparisonIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M10.625 7.5C10.625 7.15482 10.3452 6.875 10 6.875C9.65482 6.875 9.375 7.15482 9.375 7.5V8.75C9.375 9.09518 9.09518 9.375 8.75 9.375H7.5C7.15482 9.375 6.875 9.65482 6.875 10C6.875 10.3452 7.15482 10.625 7.5 10.625H8.75C9.09518 10.625 9.375 10.9048 9.375 11.25V12.5C9.375 12.8452 9.65482 13.125 10 13.125C10.3452 13.125 10.625 12.8452 10.625 12.5V11.25C10.625 10.9048 10.9048 10.625 11.25 10.625H12.5C12.8452 10.625 13.125 10.3452 13.125 10C13.125 9.65482 12.8452 9.375 12.5 9.375H11.25C10.9048 9.375 10.625 9.09518 10.625 8.75V7.5Z", fill: "currentColor" }))));
});
