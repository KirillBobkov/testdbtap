import { MultiChartLayoutType } from '../../model/multichart.model';
interface MultiChartContainerStyledProps {
    readonly layout: MultiChartLayoutType;
    readonly maximized: boolean;
}
interface MultiChartChartStyledProps {
    maximized: boolean;
    selected?: boolean;
    hidden: boolean;
}
export declare const MultiChartContainerStyled: import("styled-components").StyledComponent<"div", any, MultiChartContainerStyledProps, never>;
export declare const MultiChartSnapshotCanvas: import("styled-components").StyledComponent<"canvas", any, {}, never>;
export declare const ChartMainAreaStyled: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const MultiChartComponentStyled: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const MultiChartChartStyled: import("styled-components").StyledComponent<"div", any, MultiChartChartStyledProps, never>;
export {};
