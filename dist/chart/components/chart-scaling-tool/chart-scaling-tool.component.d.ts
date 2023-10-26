import React from 'react';
import { ToolbarDictionary } from '../../../config/localization/toolbar';
export interface ChartScalingToolProps {
    readonly zoomIn: () => void;
    readonly zoomOut: () => void;
    readonly isZoomBtnEnabled: boolean;
    readonly localization: ToolbarDictionary;
}
export declare const ChartScalingTool: React.MemoExoticComponent<(props: ChartScalingToolProps) => JSX.Element | null>;
