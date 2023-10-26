import React from 'react';
import { ChartSettings } from '../../model/chart.model';
export interface CrosshairTypeProps {
    readonly className?: string;
    readonly onValueChange: (value: ChartSettings, undoable: boolean) => void;
    readonly value: ChartSettings;
}
export declare const CrosshairType: React.MemoExoticComponent<(props: CrosshairTypeProps) => JSX.Element>;
