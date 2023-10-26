// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const KnowledgeIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M9.20497 2.50004C7.54185 2.50004 6.06428 3.55658 5.54925 5.116C5.02071 5.22349 4.52143 5.4408 4.08465 5.75348C3.64787 6.06615 3.2836 6.46701 3.01607 6.92939C2.18196 8.35167 2.37243 10.1397 3.48987 11.3587C3.14488 12.3798 3.26328 13.4972 3.81425 14.4218C4.64325 15.8491 6.3113 16.5806 7.94359 16.2402C8.30097 16.6382 8.74024 16.9563 9.23211 17.1736C9.72398 17.3908 10.2571 17.5021 10.796 17.5C12.4592 17.5 13.9367 16.4434 14.4518 14.884C15.5227 14.6655 16.4444 14.0051 16.9798 13.0706C17.819 11.6483 17.6286 9.86034 16.5113 8.64127V8.63623C16.6817 8.13152 16.741 7.59673 16.685 7.06762C16.6291 6.53851 16.4593 6.02729 16.1869 5.56814C15.3578 4.14586 13.6895 3.41421 12.0625 3.75457C11.7035 3.35767 11.2631 3.04058 10.7704 2.82431C10.2778 2.60803 9.74418 2.4975 9.20497 2.50004ZM9.20497 3.4754L9.19987 3.48044C9.86924 3.48044 10.5129 3.70903 11.0277 4.13074C11.0071 4.14082 10.9659 4.1662 10.9351 4.1815L7.90765 5.90346C7.75312 5.98985 7.66044 6.15238 7.66044 6.33021V10.3735L6.35782 9.63193V6.28953C6.35753 5.54398 6.65723 4.8288 7.19108 4.30111C7.72493 3.77342 8.44927 3.47637 9.20497 3.47522V3.4754ZM12.8519 4.65253C13.3536 4.65158 13.8467 4.78131 14.2813 5.02862C14.7159 5.27592 15.0766 5.63203 15.3269 6.06095C15.6564 6.62989 15.7799 7.29531 15.6666 7.94039C15.646 7.92509 15.605 7.90493 15.5791 7.88964L12.5516 6.16246C12.4755 6.11997 12.3895 6.09764 12.302 6.09764C12.2145 6.09764 12.1285 6.11997 12.0523 6.16246L8.50477 8.1841V6.70081L11.4344 5.02961C11.8651 4.78324 12.354 4.65312 12.8519 4.65235V4.65253ZM5.36407 6.18784V9.73848C5.36407 9.91631 5.45675 10.0738 5.61128 10.1652L9.15353 12.1818L7.84562 12.9284L4.92111 11.2623C4.26755 10.8886 3.79098 10.2743 3.59601 9.55436C3.40104 8.83437 3.50361 8.06748 3.8812 7.42202C4.21429 6.85242 4.73889 6.41573 5.36407 6.18766V6.18784ZM12.1501 7.06655L15.0797 8.7327C16.4442 9.5099 16.9074 11.2268 16.1196 12.573L16.1247 12.578C15.7901 13.1469 15.2649 13.5838 14.6419 13.8073V10.2565C14.6419 10.0787 14.5492 9.91613 14.3947 9.82992L10.8473 7.8081L12.1501 7.06655ZM9.99786 8.29083L11.4911 9.14416V10.8458L9.99786 11.6991L8.50477 10.8458V9.14416L9.99786 8.29083ZM12.3457 9.63193L13.6483 10.3735V13.7108C13.6483 15.2652 12.3714 16.525 10.8011 16.525V16.5199C10.1369 16.5199 9.48812 16.2913 8.97838 15.8698C8.999 15.8597 9.04534 15.8342 9.07106 15.8189L12.0985 14.0969C12.253 14.0105 12.3508 13.848 12.3455 13.6702L12.3457 9.63193ZM11.4961 11.8161V13.2992L8.56644 14.9654C7.20197 15.7375 5.46168 15.2803 4.6739 13.9392H4.67901C4.34442 13.3753 4.22583 12.7049 4.33913 12.0598C4.35974 12.0751 4.40097 12.0953 4.4267 12.1106L7.4541 13.8377C7.53026 13.8802 7.61627 13.9026 7.70377 13.9026C7.79127 13.9026 7.87728 13.8802 7.95344 13.8377L11.4961 11.8161Z", fill: "currentColor" }))));
});
