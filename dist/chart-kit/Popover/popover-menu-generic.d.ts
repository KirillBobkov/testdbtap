/// <reference types="react" />
import { PopoverCoordinates } from './Popover.model';
export interface RCMenuProps {
    readonly isOpened: boolean;
    readonly onClose: () => void;
    readonly position: PopoverCoordinates;
}
export declare const RCMenuPopover: import("styled-components").StyledComponent<import("react").FC<import("react").PropsWithChildren<import("./Popover.component").CKPopoverProps>>, any, {}, never>;
