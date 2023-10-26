// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const IndicatortemplateIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M5 3.75C4.30964 3.75 3.75 4.30964 3.75 5V15C3.75 15.6904 4.30964 16.25 5 16.25H15C15.6904 16.25 16.25 15.6904 16.25 15V5C16.25 4.30964 15.6904 3.75 15 3.75H5ZM7.17644 5H5V11.6728C5.8038 10.4445 6.66484 9.52007 7.6803 8.88285C7.32504 7.78854 7.13997 6.50445 7.17644 5ZM8.42683 5C8.3924 6.30226 8.53782 7.39558 8.81288 8.31651C10.4884 7.67169 12.4788 7.67816 15 8.06737V5H8.42683ZM8.16213 10.0616C7.11374 10.7799 6.19437 11.9407 5.23897 13.732L5 14.1801V15H15V14.6397C13.2765 14.3055 11.2791 13.6432 9.72667 12.1725C9.11311 11.5912 8.58018 10.8944 8.16213 10.0616ZM15 13.3645C13.4526 13.0389 11.8278 12.4412 10.5864 11.265C10.0813 10.7866 9.62854 10.2016 9.26926 9.48025C10.671 8.94304 12.4486 8.92364 15 9.33277V13.3645Z", fill: "currentColor" }))));
});
