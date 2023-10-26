// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const OnehourIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M7.69141 14.1172H6.30859V8.60352C6.30859 8.41992 6.31055 8.23633 6.31445 8.05273C6.31836 7.86914 6.32227 7.68945 6.32617 7.51367C6.33398 7.33789 6.34375 7.16992 6.35547 7.00977C6.27344 7.09961 6.17188 7.19727 6.05078 7.30273C5.93359 7.4082 5.80859 7.51758 5.67578 7.63086L4.69141 8.41602L4 7.54297L6.54297 5.55078H7.69141V14.1172Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M12.332 5V7.29102C12.332 7.5293 12.3242 7.76172 12.3086 7.98828C12.2969 8.21484 12.2832 8.39062 12.2676 8.51562H12.3438C12.4805 8.28906 12.6484 8.10352 12.8477 7.95898C13.0469 7.81055 13.2695 7.69922 13.5156 7.625C13.7656 7.55078 14.0312 7.51367 14.3125 7.51367C14.8086 7.51367 15.2305 7.59766 15.5781 7.76562C15.9258 7.92969 16.1914 8.18555 16.375 8.5332C16.5625 8.88086 16.6562 9.33203 16.6562 9.88672V14.1172H15.2793V10.1445C15.2793 9.64062 15.1758 9.26367 14.9688 9.01367C14.7617 8.75977 14.4414 8.63281 14.0078 8.63281C13.5898 8.63281 13.2578 8.7207 13.0117 8.89648C12.7695 9.06836 12.5957 9.32422 12.4902 9.66406C12.3848 10 12.332 10.4102 12.332 10.8945V14.1172H10.9551V5H12.332Z", fill: "currentColor" }))));
});
