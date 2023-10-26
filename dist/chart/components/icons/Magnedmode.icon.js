// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const MagnedmodeIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M3.75 10.625C3.75 14.0768 6.54822 16.875 10 16.875C13.4518 16.875 16.25 14.0768 16.25 10.625V3.125H12.0833V10.7176C12.0833 11.8682 11.1506 12.8009 10 12.8009C8.84941 12.8009 7.91667 11.8682 7.91667 10.7176V3.125H3.75V10.625ZM6.66667 4.375H5V6.25H6.66667V4.375ZM15 6.25V4.375H13.3333V6.25H15ZM13.3333 7.5V10.7176C13.3333 12.5585 11.8409 14.0509 10 14.0509C8.15905 14.0509 6.66667 12.5585 6.66667 10.7176V7.5H5V10.625C5 13.3864 7.23858 15.625 10 15.625C12.7614 15.625 15 13.3864 15 10.625V7.5H13.3333Z", fill: "currentColor" }))));
});
