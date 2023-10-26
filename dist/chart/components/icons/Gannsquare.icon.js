// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const GannsquareIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("mask", { id: "path-1-inside-1_1169_10456", fill: "white" },
                React.createElement("path", { shapeRendering: svgShapeRendering, d: "M5.25 16H14.75C15.4404 16 16 15.4404 16 14.75V5.25C16 4.55964 15.4404 4 14.75 4H5.25C4.55964 4 4 4.55964 4 5.25V14.75C4 15.4404 4.55964 16 5.25 16Z" })),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M5 15L4.45132 14.7007L3.43375 16.5662L5.29928 15.5487L5 15ZM5.29928 15.5487L15.6118 9.92368L15.0132 8.82631L4.70072 14.4513L5.29928 15.5487ZM5.54868 15.2993L11.1737 4.98678L10.0763 4.38822L4.45132 14.7007L5.54868 15.2993ZM5.25 17.25H14.75V14.75H5.25V17.25ZM14.75 17.25C16.1307 17.25 17.25 16.1307 17.25 14.75H14.75V17.25ZM17.25 14.75V5.25H14.75V14.75H17.25ZM17.25 5.25C17.25 3.86929 16.1307 2.75 14.75 2.75V5.25H17.25ZM14.75 2.75H5.25V5.25H14.75V2.75ZM5.25 2.75C3.86928 2.75 2.75 3.86929 2.75 5.25H5.25V5.25V2.75ZM2.75 5.25V14.75H5.25V5.25H2.75ZM2.75 14.75C2.75 16.1307 3.86929 17.25 5.25 17.25V14.75H5.25H2.75Z", fill: "currentColor", mask: "url(#path-1-inside-1_1169_10456)" }))));
});
