// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const EditscriptIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M11.834 6.78498C11.9569 6.46242 11.795 6.10131 11.4725 5.97843C11.1499 5.85555 10.7888 6.01742 10.6659 6.33999L8.16593 12.9025C8.04305 13.2251 8.20492 13.5862 8.52749 13.709C8.85005 13.8319 9.21116 13.67 9.33404 13.3475L11.834 6.78498Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M7.434 6.59548C7.58837 6.90421 7.46323 7.27963 7.15449 7.434L5.14753 8.43749L7.15449 9.44097C7.46323 9.59534 7.58837 9.97076 7.434 10.2795C7.27963 10.5882 6.90421 10.7134 6.59548 10.559L3.58228 9.0524C3.07556 8.79904 3.07556 8.07593 3.58228 7.82257L6.59548 6.31597C6.90421 6.1616 7.27963 6.28674 7.434 6.59548Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M12.566 9.72048C12.4116 10.0292 12.5367 10.4046 12.8455 10.559L14.8524 11.5625L12.8455 12.566C12.5367 12.7203 12.4116 13.0958 12.566 13.4045C12.7203 13.7132 13.0958 13.8384 13.4045 13.684L16.4177 12.1774C16.9244 11.924 16.9244 11.2009 16.4177 10.9476L13.4045 9.44097C13.0958 9.2866 12.7203 9.41174 12.566 9.72048Z", fill: "currentColor" }))));
});
