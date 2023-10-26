// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const LayersIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M15.7148 6.13671L10.1678 2.60676C10.0654 2.54162 9.93458 2.54162 9.83222 2.60676L3.53929 6.61135C3.34632 6.73415 3.34632 7.01584 3.53929 7.13864L9.83222 11.1432C9.93459 11.2084 10.0654 11.2084 10.1678 11.1432L15.7148 7.61328V6.13671L16.2929 6.875L16.4607 7.13864C16.6537 7.01584 16.6537 6.73415 16.4607 6.61135L15.7148 6.13671ZM9.99999 9.76836L14.5467 6.875L14.5418 6.87186L14.543 6.87109L10.0039 3.98047L10.001 3.9823L9.99999 3.98163L5.45328 6.875L9.99999 9.76836Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M3.42844 10.5359L9.67844 14.2859C9.87637 14.4047 10.1236 14.4047 10.3216 14.2859L16.5716 10.5359C16.8676 10.3583 16.9635 9.97443 16.7859 9.67844C16.6083 9.38245 16.2244 9.28647 15.9284 9.46407L10 13.0211L4.07156 9.46407C3.77557 9.28648 3.39166 9.38245 3.21407 9.67844C3.03648 9.97443 3.13246 10.3583 3.42844 10.5359Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M3.42844 13.6609L9.67844 17.4109C9.87637 17.5297 10.1236 17.5297 10.3216 17.4109L16.5716 13.6609C16.8676 13.4833 16.9635 13.0994 16.7859 12.8034C16.6083 12.5075 16.2244 12.4115 15.9284 12.5891L10 16.1461L4.07156 12.5891C3.77557 12.4115 3.39166 12.5075 3.21407 12.8034C3.03648 13.0994 3.13246 13.4833 3.42844 13.6609Z", fill: "currentColor" }))));
});
