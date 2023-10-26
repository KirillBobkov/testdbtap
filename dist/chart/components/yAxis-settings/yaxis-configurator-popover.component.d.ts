import { FitType } from '@devexperts/dxcharts-lite/dist/chart/bootstrap';
import React from 'react';
import { ChartSettings } from '../../model/chart.model';
import { PriceAxisType } from '@devexperts/dxcharts-lite/dist/chart/components/labels_generator/numeric-axis-labels.generator';
import { LabelMode, LabelType, YAxisLabelConfig } from '../../view-models/y-axis/y-axis-configurator.view-model';
import { Localization } from '../../../config/localization/localization';
import { YAxisAlign } from '@devexperts/dxcharts-lite/dist/chart/chart.config';
import { PopoverCoordinates } from '../../../chart-kit/Popover/Popover.model';
export interface YAxisConfiguratorPopoverProps {
    readonly isOpened: boolean;
    readonly config: ChartSettings;
    readonly popoverCoordinates: PopoverCoordinates;
    readonly onClose: () => void;
    readonly setFitType: (type: FitType, active: boolean) => void;
    readonly setAutoScale: (active: boolean) => void;
    readonly setAxisType: (type: PriceAxisType) => void;
    readonly labelsConfig: YAxisLabelConfig;
    readonly setLabelMode: (type: LabelType, mode: LabelMode) => void;
    readonly selectDescription: (value: boolean) => void;
    readonly selectCountDownBarClose: (value: boolean) => void;
    readonly yAxisDict: Localization['yAxis'];
    readonly setAxisAlign: (align: YAxisAlign) => void;
    readonly togglePriceScaleInverse: () => void;
    readonly toggleLockPriceToBarRatio: () => void;
}
export declare const YAxisConfiguratorPopover: React.NamedExoticComponent<YAxisConfiguratorPopoverProps>;
export default YAxisConfiguratorPopover;
