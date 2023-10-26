import React, { RefObject } from 'react';
import { IconsPoolNames, IconsPool } from '../../../../config/icons-pool';
export interface IconsDrawingPopoverProps {
    readonly className?: string;
    readonly icons: IconsPool;
    readonly parentRef: RefObject<HTMLElement>;
    readonly isOpened: boolean;
    readonly onRequestClose?: () => void;
    readonly onSelectIcon: (icon: IconsPoolNames) => void;
    readonly onMouseLeave?: (e: React.MouseEvent) => void;
}
export declare const IconsDrawingPopover: React.MemoExoticComponent<React.ForwardRefExoticComponent<IconsDrawingPopoverProps & React.RefAttributes<HTMLDivElement>>>;
