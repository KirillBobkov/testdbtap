import React, { ComponentType, ReactElement } from 'react';
export interface ChartToolbarProps {
    readonly loadedPercentage?: number;
    readonly container: Element | null;
    readonly className?: string;
    readonly buttons: ReactElement[];
    readonly MainInstrumentComponent?: ComponentType<Record<string, any>>;
}
export declare const ChartToolbar: React.MemoExoticComponent<(props: ChartToolbarProps) => JSX.Element>;
