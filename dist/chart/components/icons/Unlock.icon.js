// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const UnlockIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M10 4.375C8.61929 4.375 7.5 5.49429 7.5 6.875V8.75175C7.07809 8.75747 6.82481 8.78189 6.62001 8.88624C6.38481 9.00608 6.19358 9.19731 6.07374 9.43251C5.9375 9.6999 5.9375 10.0499 5.9375 10.75V13C5.9375 13.7001 5.9375 14.0501 6.07374 14.3175C6.19358 14.5527 6.38481 14.7439 6.62001 14.8638C6.8874 15 7.23744 15 7.9375 15H12.0625C12.7626 15 13.1126 15 13.38 14.8638C13.6152 14.7439 13.8064 14.5527 13.9263 14.3175C14.0625 14.0501 14.0625 13.7001 14.0625 13V10.75C14.0625 10.0499 14.0625 9.6999 13.9263 9.43251C13.8064 9.19731 13.6152 9.00608 13.38 8.88624C13.2316 8.81061 13.0576 8.77696 12.8125 8.76199L12.8125 6.87495C12.8124 5.49426 11.6931 4.375 10.3125 4.375H10ZM11.5625 8.75L11.5625 6.87498C11.5624 6.18463 11.0028 5.625 10.3125 5.625H10C9.30964 5.625 8.75 6.18464 8.75 6.875V8.75H11.5625Z", fill: "currentColor" }))));
});
