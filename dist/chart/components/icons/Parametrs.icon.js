// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const ParametrsIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M5 3.125C5 2.77982 5.27982 2.5 5.625 2.5C5.97018 2.5 6.25 2.77982 6.25 3.125V9.375H5V3.125ZM6.25 13.125H6.875C7.22018 13.125 7.5 12.8452 7.5 12.5V11.25C7.5 10.9048 7.22018 10.625 6.875 10.625H4.375C4.02982 10.625 3.75 10.9048 3.75 11.25V12.5C3.75 12.8452 4.02982 13.125 4.375 13.125H5V16.875C5 17.2202 5.27982 17.5 5.625 17.5C5.97018 17.5 6.25 17.2202 6.25 16.875V13.125ZM10 2.5C9.65482 2.5 9.375 2.77982 9.375 3.125V5H10.625V3.125C10.625 2.77982 10.3452 2.5 10 2.5ZM8.75 8.75H9.375V16.875C9.375 17.2202 9.65482 17.5 10 17.5C10.3452 17.5 10.625 17.2202 10.625 16.875V8.75H11.25C11.5952 8.75 11.875 8.47018 11.875 8.125V6.875C11.875 6.52982 11.5952 6.25 11.25 6.25H8.75C8.40482 6.25 8.125 6.52982 8.125 6.875V8.125C8.125 8.47018 8.40482 8.75 8.75 8.75ZM13.75 11.875H13.125C12.7798 11.875 12.5 11.5952 12.5 11.25V10C12.5 9.65482 12.7798 9.375 13.125 9.375H15.625C15.9702 9.375 16.25 9.65482 16.25 10V11.25C16.25 11.5952 15.9702 11.875 15.625 11.875H15V16.875C15 17.2202 14.7202 17.5 14.375 17.5C14.0298 17.5 13.75 17.2202 13.75 16.875V11.875ZM13.75 3.125C13.75 2.77982 14.0298 2.5 14.375 2.5C14.7202 2.5 15 2.77982 15 3.125V8.125H13.75V3.125Z", fill: "currentColor" }))));
});
