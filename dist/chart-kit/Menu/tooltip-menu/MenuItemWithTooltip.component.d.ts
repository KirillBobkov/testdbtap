import React from 'react';
import { WithTooltipProps } from '../../Tooltip/WithTooltip';
import { CKMenuItemProps } from '../MenuItem.component';
export interface CKMenuItemWithTooltipProps extends CKMenuItemProps, Omit<WithTooltipProps, 'children' | 'disabled'> {
    readonly disableTooltip: boolean;
}
export declare const MenuItemWithTooltip: React.NamedExoticComponent<CKMenuItemWithTooltipProps>;
