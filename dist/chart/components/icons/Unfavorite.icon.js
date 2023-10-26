// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const UnfavoriteIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M9.03166 7.53881L10 4.53624L10.9683 7.53881L11.5632 7.34697L10.9683 7.53881C11.1185 8.00439 11.5523 8.31957 12.0415 8.3185L15.1963 8.31161L12.64 10.1604C12.2436 10.4471 12.0779 10.957 12.2301 11.422L13.2115 14.4203L10.6632 12.5603C10.2681 12.2719 9.73189 12.2719 9.33675 12.5603L6.78849 14.4203L7.76994 11.422C7.92213 10.957 7.75643 10.4471 7.36003 10.1604L4.80366 8.31161L7.9585 8.3185C8.44769 8.31957 8.88151 8.00439 9.03166 7.53881Z", stroke: "currentColor", strokeWidth: "1.25" }))));
});
