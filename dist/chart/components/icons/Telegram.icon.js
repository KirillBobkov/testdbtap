// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const TelegramIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M16.5405 4.67459L14.1501 14.6188C14.0376 15.0872 13.5173 15.3285 13.0908 15.1061L10.0677 13.5308L8.63812 15.8914C8.2491 16.5348 7.26482 16.2557 7.26482 15.5035V12.8732C7.26482 12.6697 7.34919 12.4758 7.49449 12.3338L13.3861 6.65682C13.3814 6.58586 13.3064 6.52436 13.2314 6.5764L6.20087 11.5154L3.8386 10.2854C3.28553 9.9968 3.30897 9.18783 3.88078 8.93709L15.5281 3.81358C16.0858 3.56757 16.6858 4.07377 16.5405 4.67459Z", fill: "currentColor" }))));
});
