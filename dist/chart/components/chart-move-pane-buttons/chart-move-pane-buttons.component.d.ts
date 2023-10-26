import { Option } from 'fp-ts/Option';
import React from 'react';
import { PanesData } from '../../view-models/chart-pane.view-model';
export interface ChartMovePaneButtonsProps {
    readonly panesData: PanesData;
    readonly hoveredPane: Option<string>;
    readonly tradingOEEnabled: boolean;
    readonly movePaneUp: (uuid: string) => void;
    readonly movePaneDown: (uuid: string) => void;
}
export declare const ChartMovePaneButtons: React.NamedExoticComponent<ChartMovePaneButtonsProps>;
