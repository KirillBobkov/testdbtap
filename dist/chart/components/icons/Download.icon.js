// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const DownloadIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M10.6029 11.013L10.6027 3.49998L9.35267 3.50002L9.35286 11.0129L6.64775 8.30782L5.76387 9.1917L9.9779 13.4057L14.1919 9.1917L13.3081 8.30782L10.6029 11.013Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M5.625 13.125H4.375V16.25H15.625V13.125H14.375V15H5.625V13.125Z", fill: "currentColor" }))));
});
