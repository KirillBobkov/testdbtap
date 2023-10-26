// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const fcandlesIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M7.50012 2.9C7.50012 2.67909 7.32104 2.5 7.10012 2.5H6.65012C6.42921 2.5 6.25012 2.67909 6.25012 2.9V4.375H4.77512C4.55421 4.375 4.37512 4.55409 4.37512 4.775V15.225C4.37512 15.4459 4.55421 15.625 4.77512 15.625H6.25012V17.1C6.25012 17.3209 6.42921 17.5 6.65012 17.5H7.10012C7.32104 17.5 7.50012 17.3209 7.50012 17.1V15.625H8.97512C9.19604 15.625 9.37512 15.4459 9.37512 15.225V4.775C9.37512 4.55409 9.19604 4.375 8.97512 4.375H7.50012V2.9Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M12.5001 13.125V14.6C12.5001 14.8209 12.6792 15 12.9001 15H13.3501C13.571 15 13.7501 14.8209 13.7501 14.6V13.125H15.2251C15.446 13.125 15.6251 12.9459 15.6251 12.725V7.275C15.6251 7.05409 15.446 6.875 15.2251 6.875H13.7501V5.4C13.7501 5.17909 13.571 5 13.3501 5H12.9001C12.6792 5 12.5001 5.17909 12.5001 5.4V6.875H11.0251C10.8042 6.875 10.6251 7.05409 10.6251 7.275V12.725C10.6251 12.9459 10.8042 13.125 11.0251 13.125H12.5001Z", fill: "currentColor" }))));
});
