export interface CKInputContainerStyledProps {
    readonly isFocused?: boolean;
    readonly isDisabled?: boolean;
    readonly isReadOnly?: boolean;
    readonly isHasError?: boolean;
    readonly keyboardModeEnabled: boolean;
}
export declare const InputStyled: import("styled-components").StyledComponent<"input", any, {}, never>;
export declare const InputContainerStyled: import("styled-components").StyledComponent<"div", any, CKInputContainerStyledProps, never>;
export declare const InputErrorStyled: import("styled-components").StyledComponent<"div", any, {}, never>;
