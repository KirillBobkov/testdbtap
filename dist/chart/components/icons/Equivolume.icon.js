// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const EquivolumeIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("mask", { id: "path-1-inside-1_1380_8197", fill: "white" },
                React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M11.3333 2V7.33333L7.33331 7.33334V11.3333H3.33331V18H8.66665V12.6667L12.6666 12.6667L12.6666 8.66667H16.6666V2H11.3333ZM15.3333 3.33333H12.6666V7.33333H15.3333V3.33333ZM7.33331 12.6667H4.66665V16.6667H7.33331V12.6667Z" })),
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M11.3333 2V7.33333L7.33331 7.33334V11.3333H3.33331V18H8.66665V12.6667L12.6666 12.6667L12.6666 8.66667H16.6666V2H11.3333ZM15.3333 3.33333H12.6666V7.33333H15.3333V3.33333ZM7.33331 12.6667H4.66665V16.6667H7.33331V12.6667Z", fill: "currentColor", stroke: "currentColor", strokeWidth: "2.66667", mask: "url(#path-1-inside-1_1380_8197)" }))));
});
