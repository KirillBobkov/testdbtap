// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const SmallsettingsIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M8.53081 12.1417C8.95478 12.425 9.45323 12.5762 9.96314 12.5762C10.3027 12.5796 10.6395 12.5153 10.9538 12.3869C11.2682 12.2586 11.5537 12.0688 11.7938 11.8287C12.0339 11.5886 12.2237 11.3031 12.352 10.9887C12.4804 10.6744 12.5447 10.3376 12.5413 9.99805C12.5413 9.48814 12.3901 8.98969 12.1068 8.56572C11.8235 8.14175 11.4208 7.8113 10.9497 7.61617C10.4787 7.42104 9.96028 7.36998 9.46017 7.46946C8.96006 7.56894 8.50068 7.81448 8.14013 8.17504C7.77957 8.5356 7.53403 8.99497 7.43455 9.49508C7.33507 9.99519 7.38613 10.5136 7.58126 10.9847C7.77639 11.4557 8.10684 11.8584 8.53081 12.1417ZM9.29919 8.39935C9.51011 8.31485 9.73598 8.27401 9.96314 8.2793C10.1903 8.27401 10.4162 8.31485 10.6271 8.39935C10.838 8.48385 11.0296 8.61026 11.1903 8.77093C11.3509 8.93159 11.4773 9.12318 11.5618 9.3341C11.6463 9.54502 11.6872 9.77089 11.6819 9.99805C11.6872 10.2252 11.6463 10.4511 11.5618 10.662C11.4773 10.8729 11.3509 11.0645 11.1903 11.2252C11.0296 11.3858 10.838 11.5122 10.6271 11.5967C10.4162 11.6812 10.1903 11.7221 9.96314 11.7168C9.73598 11.7221 9.51011 11.6812 9.29919 11.5967C9.08827 11.5122 8.89668 11.3858 8.73601 11.2252C8.57535 11.0645 8.44894 10.8729 8.36444 10.662C8.27993 10.4511 8.23909 10.2252 8.24439 9.99805C8.23909 9.77089 8.27993 9.54502 8.36444 9.3341C8.44894 9.12318 8.57535 8.93159 8.73601 8.77093C8.89668 8.61026 9.08827 8.48385 9.29919 8.39935Z", fill: "currentColor" }),
            React.createElement("path", { shapeRendering: svgShapeRendering, fillRule: "evenodd", clipRule: "evenodd", d: "M14.69 10.3252L15.5022 11.0685C15.6521 11.1999 15.7516 11.3794 15.7837 11.5762C15.8159 11.7729 15.7786 11.9747 15.6783 12.147L14.6986 13.8658C14.6233 13.9963 14.5149 14.1047 14.3845 14.1801C14.254 14.2555 14.106 14.2953 13.9553 14.2955C13.8619 14.2962 13.769 14.2817 13.6803 14.2525L12.6404 13.9002C12.4587 14.02 12.2692 14.1276 12.0732 14.2224L11.8541 15.3052C11.8148 15.5031 11.7072 15.6808 11.5501 15.8072C11.393 15.9337 11.1964 16.0009 10.9947 15.997H8.96661C8.76495 16.0009 8.56836 15.9337 8.41125 15.8072C8.25414 15.6808 8.14652 15.5031 8.10723 15.3052L7.88809 14.2224C7.69352 14.1276 7.50547 14.02 7.3252 13.9002L6.28106 14.2525C6.19234 14.2817 6.09945 14.2962 6.00606 14.2955C5.85536 14.2953 5.70734 14.2555 5.57687 14.1801C5.4464 14.1047 5.33805 13.9963 5.2627 13.8658L4.24864 12.147C4.14375 11.973 4.10389 11.7675 4.13614 11.5669C4.16839 11.3663 4.27067 11.1837 4.42481 11.0513L5.23692 10.3295V9.67203L4.42481 8.92867C4.2749 8.79724 4.17535 8.61778 4.14321 8.42102C4.11107 8.22427 4.14834 8.02246 4.24864 7.85016L5.2627 6.13141C5.33805 6.0009 5.4464 5.89249 5.57687 5.81708C5.70734 5.74166 5.85536 5.70187 6.00606 5.70172C6.09852 5.69543 6.19138 5.70414 6.28106 5.7275L7.30371 6.09703C7.48546 5.97721 7.67494 5.86956 7.8709 5.77477L8.09004 4.69195C8.12933 4.49413 8.23696 4.31643 8.39407 4.18995C8.55118 4.06348 8.74776 3.99629 8.94942 4.00016H10.9604C11.162 3.99629 11.3586 4.06348 11.5157 4.18995C11.6728 4.31643 11.7804 4.49413 11.8197 4.69195L12.0389 5.77477C12.2334 5.86958 12.4215 5.97724 12.6018 6.09703L13.6459 5.74469C13.7346 5.71552 13.8275 5.701 13.9209 5.70172C14.0716 5.70187 14.2196 5.74166 14.3501 5.81708C14.4806 5.89249 14.5889 6.0009 14.6643 6.13141L15.6783 7.85016C15.7847 8.02272 15.8267 8.22733 15.7968 8.42783C15.7669 8.62833 15.6671 8.81182 15.515 8.94586L14.69 9.66774V10.3252ZM12.4471 12.9377L13.9209 13.4361L14.935 11.7173L13.7662 10.656C13.8457 10.2112 13.8457 9.75588 13.7662 9.3111L14.935 8.27985L13.9209 6.5611L12.4428 7.04235C12.0966 6.75409 11.7044 6.52604 11.2826 6.36774L10.9775 4.84235H8.94942L8.64434 6.38492C8.21921 6.53886 7.8249 6.7673 7.47989 7.05953L6.00606 6.5611L4.992 8.27985L6.16075 9.34117C6.0813 9.78596 6.0813 10.2413 6.16075 10.6861L4.992 11.7173L6.00606 13.4361L7.48418 12.9548C7.83039 13.2431 8.22257 13.4711 8.64434 13.6295L8.94942 15.1548H10.9775L11.2826 13.6123C11.7078 13.4583 12.1021 13.2299 12.4471 12.9377Z", fill: "currentColor" }))));
});