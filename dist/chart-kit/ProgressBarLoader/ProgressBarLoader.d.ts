import React from 'react';
export type LoadingState = 'initial' | 'started' | 'done';
export type ChartLoadingState = Record<string, LoadingState>;
export interface ProgressBarLoaderProps {
    readonly loadingState: ChartLoadingState;
}
export declare const ProgressBarLoader: React.NamedExoticComponent<ProgressBarLoaderProps>;
