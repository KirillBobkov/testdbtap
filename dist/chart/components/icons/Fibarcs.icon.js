// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const FibarcsIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M18.1251 8.125H1.87506L1.87506 6.875L18.1251 6.875L18.1251 8.125Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M7.73858 10.3865C8.27148 10.9194 9.04464 11.25 10.0001 11.25C10.9555 11.25 11.7287 10.9194 12.2616 10.3865C12.7945 9.85359 13.1251 9.08043 13.1251 8.125H14.3751C14.3751 9.37872 13.9353 10.4806 13.1454 11.2704C12.3556 12.0602 11.2538 12.5 10.0001 12.5C8.74635 12.5 7.64451 12.0602 6.8547 11.2704C6.06488 10.4806 5.62507 9.37872 5.62507 8.125H6.87507C6.87507 9.08043 7.20568 9.85359 7.73858 10.3865Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M10.0001 15C13.4208 15 16.8751 12.3836 16.8751 8.125H15.6251C15.6251 11.5984 12.8293 13.75 10.0001 13.75C7.1708 13.75 4.37506 11.5984 4.37506 8.125H3.12506C3.12506 12.3836 6.57933 15 10.0001 15Z", fill: "currentColor" }))));
});
