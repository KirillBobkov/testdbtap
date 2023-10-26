import React from 'react';
import { ChartLayersContentProps } from './chart-layers-content.component';
import { Bounds, PopoverCoordinates } from '../../../../chart-kit/Popover/Popover.model';
export interface ChartLayersPopoverProps extends ChartLayersContentProps {
    readonly bounds: Bounds;
    readonly anchorRef: React.RefObject<HTMLButtonElement>;
    readonly isOpened: boolean;
    readonly updatePopoverCustomPosition?: (position: PopoverCoordinates) => void;
    readonly customPosition: PopoverCoordinates;
}
export declare const ChartLayersPopover: React.NamedExoticComponent<ChartLayersPopoverProps>;
export default ChartLayersPopover;
