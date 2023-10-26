interface PopupBackdropStyledProps {
    readonly isModal?: boolean;
    readonly isOpened: boolean;
    readonly isMobile: boolean;
}
interface PopupHeaderStyledProps {
    readonly dividerVisible?: boolean;
}
export declare const PopupBackdropStyled: import("styled-components").StyledComponent<"div", any, PopupBackdropStyledProps, never>;
export declare const PopupContainerStyled: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const PopupContainerDraggableStyled: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const PopupGridStyled: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const PopupHeaderStyled: import("styled-components").StyledComponent<"header", any, PopupHeaderStyledProps, never>;
export declare const PopupContentStyled: import("styled-components").StyledComponent<"section", any, {}, never>;
export declare const PopupFooterStyled: import("styled-components").StyledComponent<"footer", any, {}, never>;
export interface PopupUIStyledProps {
    readonly zIndex?: number;
}
export declare const PopupUIStyled: import("styled-components").StyledComponent<"div", any, PopupBackdropStyledProps & PopupUIStyledProps, never>;
export {};
