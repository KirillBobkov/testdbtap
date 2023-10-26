// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const ZoomoutIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M6.5625 8.4375H11.5625V9.6875H6.5625V8.4375Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M12.7958 13.6797C11.7759 14.5054 10.477 15 9.0625 15C5.78331 15 3.125 12.3417 3.125 9.0625C3.125 5.78331 5.78331 3.125 9.0625 3.125C12.3417 3.125 15 5.78331 15 9.0625C15 10.477 14.5054 11.7759 13.6797 12.7958L16.3794 15.4956C16.6235 15.7396 16.6235 16.1354 16.3794 16.3794C16.1354 16.6235 15.7396 16.6235 15.4956 16.3794L12.7958 13.6797ZM4.375 9.0625C4.375 6.47367 6.47367 4.375 9.0625 4.375C11.6513 4.375 13.75 6.47367 13.75 9.0625C13.75 10.3206 13.2544 11.4629 12.4477 12.3049C12.4207 12.3244 12.3949 12.3462 12.3706 12.3706C12.3462 12.3949 12.3244 12.4207 12.3049 12.4477C11.4629 13.2544 10.3206 13.75 9.0625 13.75C6.47367 13.75 4.375 11.6513 4.375 9.0625Z", fill: "currentColor" }))));
});
