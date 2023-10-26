import { YAxisAlign } from '@devexperts/dxcharts-lite/dist/chart/chart.config';
interface OrderEntryContainerProps {
    readonly align: YAxisAlign;
    readonly padding: number;
}
export declare const OrderEntryContainerStyled: import("styled-components").StyledComponent<"div", any, OrderEntryContainerProps, never>;
export declare const OrderEntryBtnContainerStyled: import("styled-components").StyledComponent<"div", any, {
    opened: boolean;
}, never>;
interface OrderEntryAnimatedContainerProps {
    align: YAxisAlign;
    padding: number;
}
export declare const OrderEntryAnimatedContainer: import("styled-components").StyledComponent<"div", any, OrderEntryAnimatedContainerProps, never>;
export {};
