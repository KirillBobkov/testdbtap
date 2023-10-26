// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const Unhidev2Icon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M13.0806 6.23435L14.7642 4.55078L15.648 5.43466L5.17351 15.9092L4.28963 15.0253L5.99817 13.3168C4.19007 12.2914 3.125 10.7804 3.125 10C3.125 8.75 5.85786 5.625 10 5.625C11.1436 5.625 12.1797 5.86319 13.0806 6.23435ZM11.8406 7.47432C11.3244 7.09743 10.6882 6.875 10 6.875C8.27411 6.875 6.875 8.27411 6.875 10C6.875 10.6882 7.09743 11.3244 7.47432 11.8406L8.8424 10.4725C8.78283 10.3268 8.75 10.1672 8.75 10C8.75 9.30964 9.30964 8.75 10 8.75C10.1672 8.75 10.3268 8.78283 10.4725 8.8424L11.8406 7.47432Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M8.62036 14.2574C9.05995 14.3334 9.52047 14.3752 9.99987 14.3752C14.142 14.3752 16.8749 11.2502 16.8749 10.0002C16.8749 9.42896 16.3041 8.46609 15.2889 7.58887L13.1159 9.76183C13.1219 9.84052 13.1249 9.92001 13.1249 10.0002C13.1249 11.7261 11.7258 13.1252 9.99987 13.1252C9.91967 13.1252 9.84017 13.1222 9.76149 13.1163L8.62036 14.2574Z", fill: "currentColor" }))));
});
