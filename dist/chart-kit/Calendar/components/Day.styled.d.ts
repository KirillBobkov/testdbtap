export interface DayWrapperProps {
    readonly disabled: boolean;
}
export declare const DayWrapperStyled: import("styled-components").StyledComponent<"div", any, DayWrapperProps, never>;
export interface DayButtonProps {
    readonly isCurrent?: boolean;
    readonly isSelected?: boolean;
    readonly isHidden?: boolean;
}
export declare const CalendarDayStyled: import("styled-components").StyledComponent<"div", any, DayButtonProps, never>;
export declare const CalendarDayButtonStyled: import("styled-components").StyledComponent<"div", any, DayButtonProps, never>;
