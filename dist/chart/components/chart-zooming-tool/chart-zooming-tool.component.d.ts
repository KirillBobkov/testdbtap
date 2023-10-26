import { Bounds } from '@devexperts/dxcharts-lite/dist/chart/model/bounds.model';
import React from 'react';
import { Localization } from '../../../config/localization/localization';
import { ButtonsDisabledState } from '../../view-models/chart-zooming-tool.view-model';
import { ChartWithModules } from '../canvas-chart-renderer/chart-with-modules';
export interface ChartZoomingToolProps {
    readonly zoomIn: () => void;
    readonly zoomOut: () => void;
    readonly chart: ChartWithModules;
    readonly buttonsDisabled: ButtonsDisabledState;
    readonly marginBottom: number;
    readonly localization: Localization;
    readonly currentCanvasBounds: Bounds;
}
export declare const ChartZoomingTool: React.NamedExoticComponent<ChartZoomingToolProps>;
