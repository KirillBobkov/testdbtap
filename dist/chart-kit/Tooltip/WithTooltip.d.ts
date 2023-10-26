import React, { ReactNode } from 'react';
import { PopoverAlign, PopoverPosition } from '../Popover/Popover.model';
export interface WithTooltipProps {
    readonly children: ReactNode;
    readonly label: string;
    /**
     * Disable `Tooltip`.
     */
    readonly disabled?: boolean;
    /**
     * Force `Tooltip` to be visible.
     * @see
     * `disabled` property has higher priority over `force`.
     */
    readonly force?: boolean;
    readonly align?: PopoverAlign;
    readonly position?: PopoverPosition;
    readonly onMouseEnter?: (e: React.MouseEvent) => void;
    readonly onMouseLeave?: (e: React.MouseEvent) => void;
    readonly className?: string;
}
export declare const WithTooltip: React.NamedExoticComponent<WithTooltipProps>;
