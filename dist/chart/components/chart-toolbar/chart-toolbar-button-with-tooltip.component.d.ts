import React, { ReactNode } from 'react';
import { CKButtonIconProps } from '../../../chart-kit/Button/ButtonIcon.component';
import { WithTooltipProps } from '../../../chart-kit/Tooltip/WithTooltip';
interface ChartToolbarButtonWithTooltipProps extends Omit<CKButtonIconProps, 'icon'>, Omit<WithTooltipProps, 'children' | 'disabled'> {
    readonly className?: string;
    readonly ariaLabel?: string;
    readonly ariaExpanded?: boolean;
    readonly ariaHaspopup?: boolean;
    readonly ariaControls?: string;
    readonly disableTooltip?: boolean;
    readonly disabled?: boolean;
    readonly icon?: ReactNode;
}
export declare const ChartToolbarButtonWithTooltip: React.FC<ChartToolbarButtonWithTooltipProps>;
export {};
