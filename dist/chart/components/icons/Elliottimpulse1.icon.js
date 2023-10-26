// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const Elliottimpulse1Icon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M12.6296 5.49562L12.1877 5.05371L11.7458 5.49559L7.81209 9.42871L3.879 5.49562L2.99512 6.37951L7.37012 10.7545L7.81203 11.1964L8.25397 10.7545L12.1876 6.82142L13.3082 7.94201L14.1921 7.05812L12.6296 5.49562ZM15.7542 13.8165H16.4417V12.879H15.7542V9.28919H14.6409L12.137 12.9767V13.8165H14.5745V15.0001H15.7542V13.8165ZM14.5745 11.9103V12.879H13.1995L14.2464 11.297C14.3818 11.0939 14.4977 10.8855 14.594 10.672H14.6253C14.6175 10.7215 14.6071 10.8999 14.594 11.2072C14.581 11.5144 14.5745 11.7488 14.5745 11.9103Z", fill: "currentColor" }))));
});
