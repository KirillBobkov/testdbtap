import React from 'react';
export type LoadingState = 'initial' | 'started' | 'done';
export type ChartLoadingState = Record<string, LoadingState>;
export interface ChartLoadingProps {
    loadingState: ChartLoadingState;
    hidden?: boolean;
}
export declare const ChartLoading: React.NamedExoticComponent<ChartLoadingProps>;
