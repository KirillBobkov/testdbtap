// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const fheikinashiIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M7.50024 3.125C7.50024 2.77982 7.22042 2.5 6.87524 2.5C6.53007 2.5 6.25024 2.77982 6.25024 3.125V4.375H5.37524C4.82296 4.375 4.37524 4.82272 4.37524 5.375V14.625C4.37524 15.1773 4.82296 15.625 5.37524 15.625H8.37524C8.92753 15.625 9.37524 15.1773 9.37524 14.625V5.375C9.37524 4.82272 8.92753 4.375 8.37524 4.375H7.50024V3.125Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M13.7502 5.625C13.7502 5.27982 13.4704 5 13.1252 5C12.7801 5 12.5002 5.27982 12.5002 5.625V6.875H11.6252C11.073 6.875 10.6252 7.32272 10.6252 7.875V12.125C10.6252 12.6773 11.073 13.125 11.6252 13.125H14.6252C15.1775 13.125 15.6252 12.6773 15.6252 12.125V7.875C15.6252 7.32272 15.1775 6.875 14.6252 6.875H13.7502V5.625Z", fill: "currentColor" }))));
});
