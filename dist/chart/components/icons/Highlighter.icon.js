// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const HighlighterIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M16.2502 16.25H3.75018V17.5H16.2502V16.25Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M15.8752 6.875C16.3752 6.375 16.3752 5.625 15.8752 5.125L13.6252 2.875C13.1252 2.375 12.3752 2.375 11.8752 2.875L3.75018 11V15H7.75018L15.8752 6.875ZM12.7502 3.75L15.0002 6L13.1252 7.875L10.8752 5.625L12.7502 3.75ZM5.00018 13.75V11.5L10.0002 6.5L12.2502 8.75L7.25018 13.75H5.00018Z", fill: "currentColor" }))));
});
