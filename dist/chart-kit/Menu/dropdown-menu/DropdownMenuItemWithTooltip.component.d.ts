import { FC } from 'react';
import { DropdownMenuItemProps } from './DropdownMenuItem.component';
import { WithTooltipProps } from '../../Tooltip/WithTooltip';
export interface DropdownMenuItemWithTooltipProps extends DropdownMenuItemProps, Omit<WithTooltipProps, 'children' | 'disabled' | 'label'> {
    readonly disableTooltip: boolean;
}
export declare const DropdownMenuItemWithTooltip: FC<DropdownMenuItemWithTooltipProps>;
