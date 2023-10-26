// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const FibtimeextensionIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M15.625 3.75H16.875V16.25H15.625V3.75Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M11.875 3.75H13.125V16.25H11.875V3.75Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M9.375 3.75H8.125V9.45376C8.32476 9.40235 8.53419 9.375 8.75 9.375C8.96581 9.375 9.17524 9.40235 9.375 9.45376V3.75Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M9.375 14.2962C9.17524 14.3477 8.96581 14.375 8.75 14.375C8.53419 14.375 8.32476 14.3477 8.125 14.2962V16.25H9.375V14.2962Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M10 11.875C10 12.5654 9.44036 13.125 8.75 13.125C8.05964 13.125 7.5 12.5654 7.5 11.875C7.5 11.1846 8.05964 10.625 8.75 10.625C9.44036 10.625 10 11.1846 10 11.875Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M6.25 7.5C6.25 8.53554 5.41053 9.375 4.375 9.375C3.33947 9.375 2.5 8.53554 2.5 7.5C2.5 6.46447 3.33947 5.625 4.375 5.625C5.41053 5.625 6.25 6.46447 6.25 7.5Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M8.65774 10.895L5.80125 8.05947L4.75808 8.76659L7.67757 11.6861L8.65774 10.895Z", fill: "currentColor" }))));
});
