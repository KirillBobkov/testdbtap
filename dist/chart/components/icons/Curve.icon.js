// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const CurveIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M7.5 6.875C8.36295 6.875 9.0625 6.17544 9.0625 5.3125C9.0625 4.44956 8.36295 3.75 7.5 3.75C6.63705 3.75 5.9375 4.44956 5.9375 5.3125C5.9375 5.38385 5.94228 5.45408 5.95154 5.52289C5.66688 5.80017 5.40846 6.10478 5.18032 6.43304C4.65526 7.1885 4.30345 8.05057 4.15003 8.95769C3.9966 9.86482 4.04533 10.7946 4.29273 11.6807C4.44224 12.2162 4.66207 12.7278 4.9453 13.2024C4.78236 13.4491 4.6875 13.7447 4.6875 14.0625C4.6875 14.9254 5.38705 15.625 6.25 15.625C6.56776 15.625 6.86337 15.5301 7.11006 15.3672C7.32267 15.4941 7.54313 15.6085 7.7704 15.7097C8.61087 16.0839 9.52358 16.2679 10.4434 16.2486C11.3632 16.2294 12.2674 16.0073 13.0915 15.5982C13.4762 15.4072 13.839 15.1777 14.1747 14.9139C14.3353 14.9697 14.5079 15 14.6875 15C15.5504 15 16.25 14.3004 16.25 13.4375C16.25 12.5746 15.5504 11.875 14.6875 11.875C13.8246 11.875 13.125 12.5746 13.125 13.4375C13.125 13.6538 13.169 13.8599 13.2484 14.0472C13.0239 14.2101 12.7856 14.3545 12.5357 14.4786C11.8764 14.8058 11.1531 14.9835 10.4172 14.9989C9.68137 15.0143 8.95119 14.8671 8.27882 14.5677C8.11163 14.4933 7.94904 14.4099 7.7917 14.3181C7.80538 14.2349 7.8125 14.1495 7.8125 14.0625C7.8125 13.1996 7.11294 12.5 6.25 12.5C6.16297 12.5 6.0776 12.5071 5.99445 12.5208C5.77956 12.1527 5.61198 11.7575 5.49669 11.3446C5.29876 10.6357 5.25978 9.89186 5.38252 9.16616C5.50526 8.44046 5.78671 7.7508 6.20675 7.14643C6.33723 6.95871 6.48007 6.78065 6.63412 6.61334C6.88197 6.77864 7.17973 6.875 7.5 6.875Z", fill: "currentColor" }))));
});