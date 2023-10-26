// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const ElliottimpulseAIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M12.1881 5.05365L7.81253 9.42865L3.87944 5.49556L2.99556 6.37944L7.81247 11.1964L12.1881 6.82136L13.3087 7.94194L14.1926 7.05806L12.1881 5.05365Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M14.0859 10.7305C14.3359 10.3867 14.6888 10.2148 15.1445 10.2148C15.3529 10.2148 15.5651 10.2526 15.7813 10.3281C15.9974 10.4036 16.2122 10.4922 16.4258 10.5938L16.8164 9.60938C16.2565 9.34115 15.6992 9.20703 15.1445 9.20703C14.6003 9.20703 14.125 9.32683 13.7188 9.56641C13.3151 9.80339 13.0052 10.1458 12.7891 10.5938C12.5729 11.0391 12.4648 11.5586 12.4648 12.1523C12.4648 13.0951 12.6849 13.819 13.125 14.3242C13.5651 14.8268 14.2005 15.0781 15.0313 15.0781C15.6094 15.0781 16.1328 14.9805 16.6016 14.7852V13.7695C16.0313 13.9701 15.5456 14.0703 15.1445 14.0703C14.1888 14.0703 13.7109 13.4336 13.7109 12.1602C13.7109 11.5482 13.8359 11.0716 14.0859 10.7305Z", fill: "currentColor" }))));
});
