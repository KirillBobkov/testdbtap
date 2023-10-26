// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const fbaselineIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M14.1448 4.51072C13.7543 4.1202 13.1211 4.1202 12.7306 4.51072L9.68767 7.55362C9.44359 7.79769 9.44359 8.19342 9.68767 8.4375C9.93175 8.68158 10.3275 8.68158 10.5716 8.4375L13.0841 5.92494C13.2794 5.72967 13.596 5.72967 13.7912 5.92494L16.3038 8.4375C16.5479 8.68158 16.9436 8.68158 17.1877 8.4375C17.4317 8.19342 17.4317 7.79769 17.1877 7.55362L14.1448 4.51072Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M2.50017 10.625C2.50017 10.2798 2.77999 10 3.12517 10H16.8752C17.2203 10 17.5002 10.2798 17.5002 10.625C17.5002 10.9702 17.2203 11.25 16.8752 11.25H3.12517C2.77999 11.25 2.50017 10.9702 2.50017 10.625Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M2.81267 13.6964C2.56859 13.4523 2.56859 13.0566 2.81267 12.8125C3.05675 12.5684 3.45247 12.5684 3.69655 12.8125L5.58412 14.7001C5.77938 14.8953 6.09596 14.8953 6.29122 14.7001L8.17879 12.8125C8.42286 12.5684 8.81859 12.5684 9.06267 12.8125C9.30675 13.0566 9.30675 13.4523 9.06267 13.6964L6.64478 16.1143C6.25425 16.5048 5.62109 16.5048 5.23056 16.1143L2.81267 13.6964Z", fill: "currentColor" }))));
});
