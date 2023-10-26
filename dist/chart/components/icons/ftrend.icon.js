// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const ftrendIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M13.7502 3.125C13.7502 2.77982 13.4704 2.5 13.1252 2.5C12.7801 2.5 12.5002 2.77982 12.5002 3.125V4.375H11.6252C11.073 4.375 10.6252 4.82272 10.6252 5.375V14.625C10.6252 15.1773 11.073 15.625 11.6252 15.625H12.5002V16.875C12.5002 17.2202 12.7801 17.5 13.1252 17.5C13.4704 17.5 13.7502 17.2202 13.7502 16.875V15.625H14.6252C15.1775 15.625 15.6252 15.1773 15.6252 14.625V5.375C15.6252 4.82272 15.1775 4.375 14.6252 4.375H13.7502V3.125Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M6.25024 13.125V14.375C6.25024 14.7202 6.53007 15 6.87524 15C7.22042 15 7.50024 14.7202 7.50024 14.375V13.125H8.37524C8.92753 13.125 9.37524 12.6773 9.37524 12.125V7.875C9.37524 7.32272 8.92753 6.875 8.37524 6.875H7.50024V5.625C7.50024 5.27982 7.22042 5 6.87524 5C6.53007 5 6.25024 5.27982 6.25024 5.625V6.875H5.37524C4.82296 6.875 4.37524 7.32272 4.37524 7.875V12.125C4.37524 12.6773 4.82296 13.125 5.37524 13.125H6.25024ZM6.12524 11.875C5.8491 11.875 5.62524 11.6511 5.62524 11.375V8.625C5.62524 8.34886 5.8491 8.125 6.12524 8.125H7.62524C7.90139 8.125 8.12524 8.34886 8.12524 8.625V11.375C8.12524 11.6511 7.90139 11.875 7.62524 11.875H6.12524Z", fill: "currentColor" }))));
});
