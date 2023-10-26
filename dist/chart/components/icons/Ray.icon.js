// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const RayIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M12.5006 5.9375C12.5006 5.07455 13.2002 4.375 14.0631 4.375C14.9261 4.375 15.6256 5.07455 15.6256 5.9375C15.6256 6.80044 14.9261 7.5 14.0631 7.5C13.8616 7.5 13.669 7.46185 13.4921 7.39238L11.4555 9.429C11.525 9.60587 11.5631 9.79847 11.5631 9.99999C11.5631 10.8629 10.8636 11.5625 10.0006 11.5625C9.79913 11.5625 9.60652 11.5243 9.42965 11.4549L5.4426 15.4419L4.55872 14.558L8.54577 10.571C8.4763 10.3941 8.43815 10.2015 8.43815 9.99999C8.43815 9.13705 9.13771 8.43749 10.0006 8.43749C10.2022 8.43749 10.3948 8.47564 10.5716 8.54511L12.6083 6.50849C12.5388 6.33162 12.5006 6.13902 12.5006 5.9375Z", fill: "currentColor" }))));
});
