// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const TimelineIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M8.43775 4.6875C8.43775 3.82455 9.1373 3.125 10.0002 3.125C10.8632 3.125 11.5627 3.82455 11.5627 4.6875C11.5627 5.32823 11.1771 5.87888 10.6252 6.11999V13.88C11.1771 14.1211 11.5627 14.6718 11.5627 15.3125C11.5627 16.1754 10.8632 16.875 10.0002 16.875C9.1373 16.875 8.43774 16.1754 8.43774 15.3125C8.43774 14.6718 8.8234 14.1211 9.37524 13.88V6.11998C8.8234 5.87887 8.43775 5.32822 8.43775 4.6875Z", fill: "currentColor" }))));
});
