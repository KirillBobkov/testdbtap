// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const ScriptIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M9.02952 5.87153C9.33825 5.71716 9.46339 5.34174 9.30902 5.03301C9.15466 4.72427 8.77924 4.59913 8.4705 4.7535L4.85466 6.56142C4.33873 6.81938 4.33873 7.55565 4.85466 7.81361L8.4705 9.62153C8.77924 9.7759 9.15466 9.65076 9.30902 9.34202C9.46339 9.03329 9.33825 8.65787 9.02952 8.5035L6.39755 7.18751L9.02952 5.87153Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M10.9705 11.4965C10.6618 11.3422 10.5366 10.9667 10.691 10.658C10.8454 10.3493 11.2208 10.2241 11.5295 10.3785L15.1454 12.1864C15.6613 12.4444 15.6613 13.1806 15.1454 13.4386L11.5295 15.2465C11.2208 15.4009 10.8454 15.2758 10.691 14.967C10.5366 14.6583 10.6618 14.2829 10.9705 14.1285L13.6025 12.8125L10.9705 11.4965Z", fill: "currentColor" }))));
});
