// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const LabelandlineIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M10.11 13.4113L10.11 13.4113L7.84326 11.8056C7.32101 11.4357 7.01837 11.2213 6.87007 11H4.5C4.22386 11 4 10.7761 4 10.5C4 10.2239 4.22386 10 4.5 10H6.87007C7.01836 9.77866 7.32101 9.56428 7.84326 9.19436L10.11 7.58872C10.4187 7.37009 10.573 7.26078 10.7414 7.18324C10.8909 7.11444 11.0483 7.06434 11.2101 7.03409C11.3923 7 11.5815 7 11.9597 7H15.4C15.9601 7 16.2401 7 16.454 7.10899C16.6422 7.20487 16.7951 7.35785 16.891 7.54601C17 7.75992 17 8.03995 17 8.6V12.4C17 12.9601 17 13.2401 16.891 13.454C16.7951 13.6422 16.6422 13.7951 16.454 13.891C16.2401 14 15.9601 14 15.4 14L11.9597 14C11.5815 14 11.3923 14 11.2101 13.9659C11.0483 13.9357 10.8909 13.8856 10.7415 13.8168C10.573 13.7392 10.4187 13.6299 10.11 13.4113Z", fill: "currentColor" }))));
});
