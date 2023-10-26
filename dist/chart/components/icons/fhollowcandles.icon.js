// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const fhollowcandlesIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M6.25024 3.125C6.25024 2.77982 6.53007 2.5 6.87524 2.5C7.22042 2.5 7.50024 2.77982 7.50024 3.125V4.375H8.37524C8.92753 4.375 9.37524 4.82272 9.37524 5.375V14.625C9.37524 15.1773 8.92753 15.625 8.37524 15.625H7.50024V16.875C7.50024 17.2202 7.22042 17.5 6.87524 17.5C6.53007 17.5 6.25024 17.2202 6.25024 16.875V15.625H5.37524C4.82296 15.625 4.37524 15.1773 4.37524 14.625V5.375C4.37524 4.82272 4.82296 4.375 5.37524 4.375H6.25024V3.125Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M13.1252 15C12.7801 15 12.5002 14.7202 12.5002 14.375V13.125H11.6252C11.073 13.125 10.6252 12.6773 10.6252 12.125V7.875C10.6252 7.32272 11.073 6.875 11.6252 6.875H12.5002V5.625C12.5002 5.27982 12.7801 5 13.1252 5C13.4704 5 13.7502 5.27982 13.7502 5.625V6.875H14.6252C15.1775 6.875 15.6252 7.32272 15.6252 7.875V12.125C15.6252 12.6773 15.1775 13.125 14.6252 13.125H13.7502V14.375C13.7502 14.7202 13.4704 15 13.1252 15ZM14.3752 8.625C14.3752 8.34886 14.1514 8.125 13.8752 8.125H12.3752C12.0991 8.125 11.8752 8.34886 11.8752 8.625V11.375C11.8752 11.6511 12.0991 11.875 12.3752 11.875H13.8752C14.1514 11.875 14.3752 11.6511 14.3752 11.375V8.625Z", fill: "currentColor" }))));
});
