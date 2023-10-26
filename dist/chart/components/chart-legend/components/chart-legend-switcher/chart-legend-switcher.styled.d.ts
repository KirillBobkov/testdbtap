export declare const ChartSwitcherContent: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const ChartLegendScrollIconStyled: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const ChartLegendInstrumentStyled: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const ChartLegendPeriodStyled: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const ChartLegendTimeStyled: import("styled-components").StyledComponent<"div", any, {}, never>;
export interface ChartLegendSwitcherButtonStyledProps {
    readonly isOpened: boolean;
    readonly duration: number;
    readonly isDisabled: boolean;
}
export declare const ChartLegendSwitcherButtonStyled: import("styled-components").StyledComponent<"button", any, ChartLegendSwitcherButtonStyledProps, never>;
export interface ChartLegendSwitcherIconStyledProps {
    isOpened: boolean;
    duration: number;
}
export declare const ChartLegendSwitcherIconStyled: import("styled-components").StyledComponent<"div", any, ChartLegendSwitcherIconStyledProps, never>;
interface ChartLegendSwitcherStyledProps {
    readonly isOpened: boolean;
    readonly x: number;
    readonly y: number;
}
export declare const ChartLegendSwitcherStyled: import("styled-components").StyledComponent<"div", any, {
    'data-opened': boolean;
} & ChartLegendSwitcherStyledProps, "data-opened">;
export declare const ChartLegendSwitcherDropdownContainerStyled: import("styled-components").StyledComponent<"div", any, {}, never>;
export interface ChartLegendSwitcherDropdownStyledProps {
    isOpened: boolean;
    duration: number;
    height: number;
}
export declare const ChartLegendSwitcherDropdownStyled: import("styled-components").StyledComponent<"div", any, ChartLegendSwitcherDropdownStyledProps, never>;
export {};
