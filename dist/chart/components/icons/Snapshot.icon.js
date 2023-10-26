// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const SnapshotIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M13.125 10C13.125 11.7259 11.7259 13.125 10 13.125C8.27411 13.125 6.875 11.7259 6.875 10C6.875 8.27411 8.27411 6.875 10 6.875C11.7259 6.875 13.125 8.27411 13.125 10ZM11.875 10C11.875 11.0355 11.0355 11.875 10 11.875C8.96447 11.875 8.125 11.0355 8.125 10C8.125 8.96447 8.96447 8.125 10 8.125C11.0355 8.125 11.875 8.96447 11.875 10Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M12.5 3.75L15 5.625H16.875C17.5654 5.625 18.125 6.18464 18.125 6.875V14.375C18.125 15.0654 17.5654 15.625 16.875 15.625H3.125C2.43464 15.625 1.875 15.0654 1.875 14.375V6.875C1.875 6.18464 2.43464 5.625 3.125 5.625H5L7.5 3.75H12.5ZM7.91667 5H12.0833L14.5833 6.875H16.875V14.375H3.125L3.125 6.875H5.41667L7.91667 5Z", fill: "currentColor" }))));
});
