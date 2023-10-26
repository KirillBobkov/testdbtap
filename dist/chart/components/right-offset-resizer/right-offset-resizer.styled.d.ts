/// <reference types="react" />
interface ResizerContainerProps {
    right: number;
}
interface ResizerChildrenContainerStyledProps {
    canvasHeight: number;
    showHighlight: boolean;
}
export declare const DraggableAxis: import("styled-components").StyledComponent<"div", any, {
    canvasHeight: number;
}, never>;
export declare const ResizerChildrenContainerStyled: import("styled-components").StyledComponent<"div", any, ResizerChildrenContainerStyledProps, never>;
export declare const ResizerContainerStyled: import("styled-components").StyledComponent<"div", any, ResizerContainerProps, never>;
export declare const ResizerStyled: import("styled-components").StyledComponent<import("react").FC<import("../../../chart-kit/Button/ButtonIcon.component").CKButtonIconProps>, any, {}, never>;
export {};
