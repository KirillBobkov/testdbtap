// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const Removev2Icon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M6.04671 16H13.9533C14.6355 16 15.1461 15.8305 15.4851 15.4916C15.8284 15.157 16 14.6529 16 13.9794V6.02064C16 5.34709 15.8284 4.84302 15.4851 4.50842C15.1461 4.16947 14.6355 4 13.9533 4H6.04671C5.36448 4 4.85171 4.16947 4.50842 4.50842C4.16947 4.84302 4 5.34709 4 6.02064V13.9794C4 14.6529 4.16947 15.157 4.50842 15.4916C4.85171 15.8305 5.36448 16 6.04671 16ZM7.70885 12.8322C7.56111 12.8322 7.43509 12.78 7.3308 12.6757C7.22651 12.5671 7.17436 12.4367 7.17436 12.2846C7.17436 12.1369 7.22651 12.0109 7.3308 11.9066L9.24063 9.99674L7.3308 8.08691C7.22651 7.98262 7.17436 7.8566 7.17436 7.70885C7.17436 7.55676 7.22651 7.43074 7.3308 7.3308C7.43509 7.22651 7.56111 7.17436 7.70885 7.17436C7.86529 7.17436 7.99131 7.22651 8.08691 7.3308L10.0033 9.24063L11.9392 7.32428C12.0435 7.21564 12.1673 7.16133 12.3107 7.16133C12.4584 7.16133 12.5845 7.21347 12.6888 7.31776C12.793 7.42205 12.8452 7.54807 12.8452 7.69582C12.8452 7.83922 12.793 7.96741 12.6888 8.08039L10.7724 9.99674L12.6822 11.9001C12.7865 12.013 12.8387 12.1412 12.8387 12.2846C12.8387 12.4367 12.7865 12.5671 12.6822 12.6757C12.5779 12.78 12.4498 12.8322 12.2977 12.8322C12.1543 12.8322 12.0261 12.7778 11.9131 12.6692L10.0033 10.7594L8.10646 12.6692C7.99783 12.7778 7.86529 12.8322 7.70885 12.8322Z", fill: "currentColor" }))));
});
