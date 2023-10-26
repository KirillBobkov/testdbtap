/// <reference types="react" />
interface CodeEditorPopupStyledProps {
}
export declare const CodeEditorPopupUIStyled: import("styled-components").StyledComponent<import("react").MemoExoticComponent<import("react").ForwardRefExoticComponent<import("../../../chart-kit/Popup/PopupUI.component").CKPopupUIProps & import("react").RefAttributes<HTMLDivElement>>>, any, CodeEditorPopupStyledProps, never>;
interface FlexContainerProps {
    readonly justifyContent: 'space-between' | 'space-around' | 'space-evenly' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
    readonly alignItems: 'center' | 'baseline' | 'flex-start' | 'flex-end' | 'stretch';
}
export declare const CodeEditorPopupFlexContainer: import("styled-components").StyledComponent<"div", any, FlexContainerProps, never>;
export declare const CodeEditorPopupIWStyled: import("styled-components").StyledComponent<"div", any, {}, never>;
export interface CodeEditorPopupInfoProps {
    isEmpty: boolean;
}
export interface CodeEditorPopupEditorContainerProps {
    isEmpty: boolean;
}
export declare const CodeEditorPopupEditorContainerStyled: import("styled-components").StyledComponent<"div", any, CodeEditorPopupEditorContainerProps, never>;
export declare const CodeEditorPopupInfoStyled: import("styled-components").StyledComponent<"div", any, CodeEditorPopupInfoProps, never>;
export declare const CodeEditorPopupPendingStatusStyled: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const CodeEditorPopupErrorsContainerStyled: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const CodeEditorPopupFreeAreaFocusHandlerStyled: import("styled-components").StyledComponent<"div", any, {}, never>;
export {};
