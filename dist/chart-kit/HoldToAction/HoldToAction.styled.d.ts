export interface CKAnimationWrapperProps {
    readonly longPressStarted: boolean;
    readonly delay: number;
}
export declare const HoldToActionText: import("styled-components").StyledComponent<"span", any, {}, never>;
export declare const HoldToActionTextContainer: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const HoldToActionHideWrapper: import("styled-components").StyledComponent<"div", any, Omit<CKAnimationWrapperProps, "delay">, never>;
export declare const AnimationWrapper: import("styled-components").StyledComponent<"div", any, CKAnimationWrapperProps, never>;
export declare const HoldToActionContainer: import("styled-components").StyledComponent<"div", any, {}, never>;
