import React, { ReactNode } from 'react';
import { CKPopoverProps } from '../Popover/Popover.lazy-component';
export type TooltipProps = CKPopoverProps & {
    readonly children: ReactNode | ReactNode[];
};
export declare const Tooltip: React.NamedExoticComponent<TooltipProps>;
