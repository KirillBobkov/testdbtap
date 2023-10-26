import React from 'react';
import { LabelMode, LabelType, YAxisLabelConfig } from '../../view-models/y-axis/y-axis-configurator.view-model';
import { Localization } from '../../../config/localization/localization';
import { PopoverAlign, PopoverPosition } from '../../../chart-kit/Popover/Popover.model';
export interface YAxisConfiguratorPopoverProps {
    readonly isOpened: boolean;
    readonly onClose: () => void;
    readonly labelsConfig: YAxisLabelConfig;
    readonly changeLabelMode: (type: LabelType, mode: LabelMode) => void;
    readonly selectDescription: (value: boolean) => void;
    readonly selectCountDownBarClose: (value: boolean) => void;
    readonly yAxisDict: Localization['yAxis'];
    readonly position: PopoverPosition;
    readonly align: PopoverAlign;
    readonly labelsPopoverRef: ReactRef;
    readonly selectorRef?: ReactRef;
}
export declare const YAxisLabelsPopover: React.NamedExoticComponent<YAxisConfiguratorPopoverProps>;
