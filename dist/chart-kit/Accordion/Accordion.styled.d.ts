/// <reference types="react" />
export interface AccordionItemsContainerProps {
    readonly maxHeight?: number;
}
export interface AccordionContainerStyledProps {
    isSelected?: boolean;
    isHidden?: boolean;
    skipAnimation?: boolean;
    isFocused?: boolean;
}
export declare const ArrowStyled: import("styled-components").StyledComponent<import("react").FC<import("../IconWrapper/IconWrapper.component").IconWrapperProps>, any, ArrowProps, never>;
export declare const AccordionContainerStyled: import("styled-components").StyledComponent<"div", any, AccordionContainerStyledProps, never>;
export declare const AccordionWrapperContainerStyled: import("styled-components").StyledComponent<"div", any, {}, never>;
interface ArrowProps {
    readonly isCollapsed: boolean;
}
export {};
