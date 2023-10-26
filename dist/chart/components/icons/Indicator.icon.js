// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const IndicatorIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M10.7104 9.375C11.071 6.92445 11.7569 5.7587 12.3495 5.29837C12.6532 5.06248 12.9342 5.0076 13.1771 5.03885C13.4327 5.07175 13.6993 5.20814 13.9331 5.44193L14.375 5.88387L15.2589 4.99999L14.8169 4.55805C14.4257 4.16683 13.9154 3.87356 13.3366 3.79908C12.745 3.72294 12.1341 3.88296 11.5828 4.31117C10.586 5.08533 9.81604 6.70066 9.44784 9.375H6.25V10.625H9.29235C9.13908 11.7263 8.94201 12.5518 8.72308 13.1635C8.459 13.9014 8.17801 14.2865 7.9448 14.482C7.55748 14.8068 7.11904 14.7357 6.52946 14.441L5.97042 14.1615L5.4115 15.2796L5.97054 15.559C6.63097 15.8892 7.73767 16.2869 8.74791 15.4399C9.21349 15.0496 9.59439 14.4386 9.89998 13.5847C10.1682 12.8354 10.39 11.8662 10.5538 10.625H14.375V9.375H10.7104Z", fill: "currentColor" }))));
});
