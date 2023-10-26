declare const layouts: readonly ["1x1", "2x2", "2x1", "1x2", "3x1", "1x3"];
export type MultiChartLayoutType = typeof layouts[number];
export declare const isChartVisibleInMultiChartLayout: (layout: MultiChartLayoutType, chartId: number) => boolean;
export {};
