// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const CreatescriptIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M10 16.8681C13.7719 16.8681 16.875 13.765 16.875 9.9931C16.875 6.22116 13.7719 3.125 10 3.125C6.22806 3.125 3.125 6.22116 3.125 9.9931C3.125 13.765 6.22806 16.8681 10 16.8681ZM10 13.125C9.55178 13.125 9.375 12.7376 9.375 12.2825V10.625H7.61409C7.15898 10.625 6.875 10.4482 6.875 10C6.875 9.54488 7.15208 9.375 7.61409 9.375H9.375V7.64857C9.375 7.19346 9.55178 6.875 10 6.875C10.4482 6.875 10.625 7.18656 10.625 7.64857V9.375H12.3859C12.8479 9.375 13.125 9.54488 13.125 10C13.125 10.4482 12.8341 10.625 12.3859 10.625H10.625V12.2825C10.625 12.7445 10.4482 13.125 10 13.125Z", fill: "currentColor" }))));
});
