// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const GannfanIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M8.10442 5.65906L6.19277 12.9234L10.1076 9.0085C10.0382 8.83163 10 8.63902 10 8.4375C10 7.57456 10.6996 6.875 11.5625 6.875C11.764 6.875 11.9566 6.91315 12.1335 6.98262L13.5581 5.55806L14.4419 6.44194L13.0174 7.8665C13.0869 8.04337 13.125 8.23598 13.125 8.4375C13.125 9.30045 12.4254 10 11.5625 10C11.361 10 11.1684 9.96185 10.9915 9.89238L7.07665 13.8072L14.3409 11.8956L14.6591 13.1044L5.17062 15.6014L5.1623 15.6037C5.10951 15.6179 5.05448 15.6253 4.99849 15.6252C4.94453 15.6251 4.89149 15.6179 4.84051 15.6044C4.78833 15.5907 4.73757 15.5701 4.68968 15.5427C4.64134 15.5151 4.59755 15.4815 4.55904 15.4431C4.52007 15.4044 4.48595 15.3602 4.45798 15.3115C4.43085 15.2644 4.41037 15.2144 4.39655 15.1631C4.38229 15.1105 4.37481 15.0557 4.37485 15C4.37482 14.9442 4.38231 14.8893 4.39659 14.8367L4.3986 14.8295L6.89558 5.34094L8.10442 5.65906Z", fill: "currentColor" }))));
});
