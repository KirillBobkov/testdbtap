// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const LoadingIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M14.8756 10C15.4966 10 16.0107 10.5077 15.895 11.1178C15.7056 12.1163 15.2645 13.0567 14.6052 13.8461C13.704 14.9251 12.4526 15.6534 11.0692 15.904C9.68589 16.1545 8.2585 15.9113 7.03615 15.2169C5.8138 14.5224 4.87412 13.4208 4.38108 12.1042C3.88805 10.7877 3.87297 9.33979 4.33848 8.01326C4.80398 6.68672 5.72052 5.56577 6.92814 4.84601C8.13576 4.12625 9.55777 3.85339 10.946 4.07505C11.9616 4.23721 12.912 4.65651 13.7106 5.28497C14.1986 5.669 14.1445 6.38951 13.6763 6.7974C13.2081 7.20529 12.5028 7.13755 11.9748 6.81065C11.5554 6.55098 11.0858 6.37461 10.5915 6.29568C9.72352 6.15709 8.83446 6.32768 8.07945 6.77768C7.32444 7.22768 6.75141 7.92851 6.46037 8.75787C6.16933 9.58723 6.17876 10.4925 6.48701 11.3156C6.79526 12.1387 7.38276 12.8274 8.14698 13.2616C8.9112 13.6958 9.80361 13.8478 10.6685 13.6912C11.5334 13.5346 12.3158 13.0792 12.8792 12.4046C13.2001 12.0204 13.4383 11.5789 13.584 11.1076C13.7674 10.5144 14.2546 10 14.8756 10Z", fill: "url(#paint0_angular_1169_10442)" }),
            React.createElement("defs", null,
                React.createElement("radialGradient", { id: "paint0_angular_1169_10442", cx: "0", cy: "0", r: "1", gradientUnits: "userSpaceOnUse", gradientTransform: "translate(10 10) scale(6.75)" },
                    React.createElement("stop", { "stop-color": "white" }),
                    React.createElement("stop", { offset: "0.942708", "stop-color": "currentColor", "stop-opacity": "0" }))))));
});
