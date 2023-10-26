// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const HollowcandlesIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M6.87518 12.5H7.50018V11.875H6.87518V11.25H7.50018V10.625H6.87518V10H7.50018V9.375H6.87518V8.75H7.50018V8.125H6.87518V7.5H7.50018V6.875H6.87518V6.25H6.25018V6.875H6.87518V7.5H6.25018V8.125H6.87518V8.75H6.25018V9.375H6.87518V10H6.25018V10.625H6.87518V11.25H6.25018V11.875H6.87518V12.5Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M6.87518 12.5H6.25018V13.125H6.87518V12.5ZM6.87518 13.125H7.50018V13.75H6.87518V13.125Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M6.25018 2.5H7.50018V4.375H9.37518V15.625H7.50018V17.5H6.25018V15.625H4.37518V4.375H6.25018V2.5ZM6.87518 14.375H7.50018V13.75H8.12518V13.125H7.50018V12.5H8.12518V11.875H7.50018V11.25H8.12518V10.625H7.50018V10H8.12518V9.375H7.50018V8.75H8.12518V8.125H7.50018V7.5H8.12518V6.875H7.50018V6.25H8.12518V5.625H7.50018V6.25H6.87518V5.625H6.25018V6.25H5.62518V6.875H6.25018V7.5H5.62518V8.125H6.25018V8.75H5.62518V9.375H6.25018V10H5.62518V10.625H6.25018V11.25H5.62518V11.875H6.25018V12.5H5.62518V13.125H6.25018V13.75H5.62518V14.375H6.25018V13.75H6.87518V14.375Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M12.5002 15V13.125H10.6252V6.875H12.5002V5H13.7502V6.875H15.6252V13.125H13.7502V15H12.5002ZM14.3752 8.125H11.8752V11.875H14.3752V8.125Z", fill: "currentColor" }))));
});
