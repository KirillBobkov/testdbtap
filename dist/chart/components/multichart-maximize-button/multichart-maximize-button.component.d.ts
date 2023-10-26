import React from 'react';
import { ToolbarDictionary } from '../../../config/localization/toolbar';
export interface MaximizeChartButtonProps {
    readonly onClick: () => void;
    readonly isMaximized: boolean;
    readonly className?: string;
    readonly localization: ToolbarDictionary;
}
export declare const MaximizeChartButton: React.MemoExoticComponent<(props: MaximizeChartButtonProps) => JSX.Element>;
