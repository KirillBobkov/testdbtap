import React from 'react';
export interface ChartLegendItemProps {
    readonly name: string;
    readonly value?: string;
    readonly valueColor?: string;
    readonly ChartLegendItemRef: React.RefObject<HTMLDivElement>;
}
export declare const ChartLegendItem: React.FC<ChartLegendItemProps>;
