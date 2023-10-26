// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const VWAPIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M10.6251 2.5H9.37511V4.375H7.50005V9.0625L8.75005 8.5625V5.625H11.25V7.5L12.5 6.875V4.375H10.6251V2.5Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M14.6781 8.00205C13.6399 9.12668 12.1222 9.95143 10.1977 10.5929C8.37218 11.2014 7.07744 11.9392 6.24055 12.8458C5.42088 13.7338 5.00005 14.8272 5.00005 16.25H3.75005C3.75005 14.5478 4.26672 13.1412 5.32205 11.9979C6.36016 10.8733 7.87792 10.0486 9.80241 9.40707C11.6279 8.79857 12.9227 8.06082 13.7595 7.1542C14.5792 6.26622 15 5.1728 15 3.75H16.25C16.25 5.4522 15.7334 6.85878 14.6781 8.00205Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M9.37511 17.5V15.625H7.50005V13.059L8.75005 12.375V14.375H11.25V11.4375L12.5 10.875V15.625H10.6251V17.5H9.37511Z", fill: "currentColor" }))));
});
