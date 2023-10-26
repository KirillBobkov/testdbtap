// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const SearchIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M12.7958 14.3047C11.7759 15.1304 10.477 15.625 9.0625 15.625C5.78331 15.625 3.125 12.9667 3.125 9.6875C3.125 6.40831 5.78331 3.75 9.0625 3.75C12.3417 3.75 15 6.40831 15 9.6875C15 11.102 14.5054 12.4009 13.6797 13.4208L16.3794 16.1206C16.6235 16.3646 16.6235 16.7604 16.3794 17.0044C16.1354 17.2485 15.7396 17.2485 15.4956 17.0044L12.7958 14.3047ZM4.375 9.6875C4.375 7.09867 6.47367 5 9.0625 5C11.6513 5 13.75 7.09867 13.75 9.6875C13.75 10.9456 13.2544 12.0879 12.4477 12.9299C12.4207 12.9494 12.3949 12.9712 12.3706 12.9956C12.3462 13.0199 12.3244 13.0457 12.3049 13.0727C11.4629 13.8794 10.3206 14.375 9.0625 14.375C6.47367 14.375 4.375 12.2763 4.375 9.6875Z", fill: "currentColor" }))));
});
