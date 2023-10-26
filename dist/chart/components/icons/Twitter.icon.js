// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const TwitterIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M7.45 15.5875C8.50571 15.5942 9.55224 15.3911 10.5289 14.9902C11.5055 14.5892 12.3928 13.9984 13.1393 13.2518C13.8858 12.5053 14.4767 11.618 14.8777 10.6414C15.2786 9.66475 15.4816 8.61822 15.475 7.56251C15.475 7.43751 15.475 7.31876 15.475 7.19376C16.0222 6.79282 16.4959 6.30012 16.875 5.73751C16.3597 5.96288 15.8144 6.11235 15.2563 6.18126C15.8481 5.82862 16.2921 5.27355 16.5063 4.61876C15.9547 4.94966 15.3499 5.18228 14.7188 5.30626C14.2937 4.85336 13.7313 4.55317 13.1184 4.45213C12.5056 4.35108 11.8765 4.45482 11.3286 4.74729C10.7806 5.03977 10.3444 5.50467 10.0873 6.07006C9.83014 6.63545 9.76652 7.26982 9.90625 7.87501C8.78502 7.81998 7.68794 7.5294 6.68647 7.0222C5.685 6.515 4.80159 5.80256 4.09375 4.93126C3.73683 5.55074 3.62864 6.28271 3.7911 6.97896C3.95356 7.67521 4.37452 8.28371 4.96875 8.68126C4.53038 8.66435 4.10216 8.54445 3.71875 8.33126V8.36251C3.71485 9.00991 3.93295 9.63908 4.33669 10.1452C4.74043 10.6513 5.30542 11.0037 5.9375 11.1438C5.52977 11.2534 5.10268 11.2705 4.6875 11.1938C4.87049 11.7459 5.2198 12.2279 5.68753 12.5736C6.15526 12.9194 6.71849 13.112 7.3 13.125C6.30576 13.9253 5.07006 14.3659 3.79375 14.375C3.56997 14.3685 3.34672 14.3498 3.125 14.3188C4.41685 15.1418 5.91825 15.5758 7.45 15.5688", fill: "currentColor" }))));
});
