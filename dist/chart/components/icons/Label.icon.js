// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const LabelIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M8.11004 13.4113C8.41869 13.6299 8.57302 13.7392 8.74145 13.8168C8.89093 13.8856 9.04833 13.9357 9.21008 13.9659C9.39233 14 9.58145 14 9.9597 14L15.4 14C15.9601 14 16.2401 14 16.454 13.891C16.6422 13.7951 16.7951 13.6422 16.891 13.454C17 13.2401 17 12.9601 17 12.4L17 8.6C17 8.03995 17 7.75992 16.891 7.54601C16.7951 7.35785 16.6422 7.20487 16.454 7.10899C16.2401 7 15.9601 7 15.4 7L9.95969 7C9.58145 7 9.39233 7 9.21008 7.03409C9.04833 7.06434 8.89093 7.11444 8.74145 7.18324C8.57302 7.26078 8.41869 7.37009 8.11004 7.58872L5.84326 9.19436C5.22226 9.63423 4.91176 9.85417 4.80206 10.1274C4.70605 10.3665 4.70605 10.6335 4.80206 10.8726C4.91176 11.1458 5.22226 11.3658 5.84326 11.8056L8.11004 13.4113Z", fill: "currentColor" }))));
});
