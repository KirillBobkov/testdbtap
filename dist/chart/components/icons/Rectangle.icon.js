// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const RectangleIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("mask", { id: "path-1-inside-1_1169_10500", fill: "white" },
                React.createElement("path", { shapeRendering: svgShapeRendering, d: "M3.125 7C3.125 6.29993 3.125 5.9499 3.28557 5.68251C3.42681 5.44731 3.65219 5.25608 3.92939 5.13624C4.24453 5 4.65707 5 5.48214 5H14.5179C15.3429 5 15.7555 5 16.0706 5.13624C16.3478 5.25608 16.5732 5.44731 16.7144 5.68251C16.875 5.9499 16.875 6.29993 16.875 7V13C16.875 13.7001 16.875 14.0501 16.7144 14.3175C16.5732 14.5527 16.3478 14.7439 16.0706 14.8638C15.7555 15 15.3429 15 14.5179 15H5.48214C4.65707 15 4.24453 15 3.92939 14.8638C3.65219 14.7439 3.42681 14.5527 3.28557 14.3175C3.125 14.0501 3.125 13.7001 3.125 13V7Z" })),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M3.125 7C3.125 6.29993 3.125 5.9499 3.28557 5.68251C3.42681 5.44731 3.65219 5.25608 3.92939 5.13624C4.24453 5 4.65707 5 5.48214 5H14.5179C15.3429 5 15.7555 5 16.0706 5.13624C16.3478 5.25608 16.5732 5.44731 16.7144 5.68251C16.875 5.9499 16.875 6.29993 16.875 7V13C16.875 13.7001 16.875 14.0501 16.7144 14.3175C16.5732 14.5527 16.3478 14.7439 16.0706 14.8638C15.7555 15 15.3429 15 14.5179 15H5.48214C4.65707 15 4.24453 15 3.92939 14.8638C3.65219 14.7439 3.42681 14.5527 3.28557 14.3175C3.125 14.0501 3.125 13.7001 3.125 13V7Z", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", mask: "url(#path-1-inside-1_1169_10500)" }))));
});
