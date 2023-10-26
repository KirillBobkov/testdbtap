// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const LockIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M9.6875 4.375C8.47938 4.375 7.5 5.35438 7.5 6.5625C7.5 6.90768 7.77982 7.1875 8.125 7.1875C8.47018 7.1875 8.75 6.90768 8.75 6.5625C8.75 6.04473 9.16973 5.625 9.6875 5.625H10.4464C11.0628 5.625 11.5624 6.12466 11.5624 6.74102L11.5625 8.75H7.9375C7.23743 8.75 6.8874 8.75 6.62001 8.88624C6.38481 9.00608 6.19358 9.19731 6.07374 9.43251C5.9375 9.6999 5.9375 10.0499 5.9375 10.75V13C5.9375 13.7001 5.9375 14.0501 6.07374 14.3175C6.19358 14.5527 6.38481 14.7439 6.62001 14.8638C6.8874 15 7.23743 15 7.9375 15H12.0625C12.7626 15 13.1126 15 13.38 14.8638C13.6152 14.7439 13.8064 14.5527 13.9263 14.3175C14.0625 14.0501 14.0625 13.7001 14.0625 13V10.75C14.0625 10.0499 14.0625 9.6999 13.9263 9.43251C13.8064 9.19731 13.6152 9.00608 13.38 8.88624C13.2315 8.81061 13.0576 8.77696 12.8125 8.76199L12.8124 6.741C12.8124 5.43429 11.7531 4.375 10.4464 4.375H9.6875Z", fill: "currentColor" }))));
});
