// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const IconIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10ZM18.75 10C18.75 14.8325 14.8325 18.75 10 18.75C5.16751 18.75 1.25 14.8325 1.25 10C1.25 5.16751 5.16751 1.25 10 1.25C14.8325 1.25 18.75 5.16751 18.75 10ZM13.2476 11.875C12.9218 12.4393 12.4546 12.909 11.892 13.2377C11.3294 13.5665 10.6908 13.743 10.0393 13.7498C9.3877 13.7566 8.7456 13.5935 8.17624 13.2766C7.60689 12.9597 7.12993 12.5 6.79238 11.9426L5.72318 12.5901C6.17324 13.3333 6.80918 13.9463 7.56832 14.3689C8.32746 14.7914 9.1836 15.0088 10.0524 14.9997C10.9211 14.9906 11.7725 14.7553 12.5226 14.317C13.2728 13.8786 13.8957 13.2524 14.3301 12.5L13.2476 11.875ZM8.75 8.4375C8.75 9.30044 8.05045 10 7.1875 10C6.32455 10 5.625 9.30044 5.625 8.4375C5.625 7.57455 6.32455 6.875 7.1875 6.875C8.05045 6.875 8.75 7.57455 8.75 8.4375ZM15 8.125H11.25V9.375H15V8.125Z", fill: "currentColor" }))));
});
