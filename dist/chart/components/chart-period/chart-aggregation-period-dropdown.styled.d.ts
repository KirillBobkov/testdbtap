/// <reference types="react" />
import { CKMenuItemProps } from '../../../chart-kit/Menu/MenuItem.component';
export declare const adaptivePopoverStyles: {
    top: number;
};
interface AggregationPeriodItemContentProps {
    readonly active: boolean;
}
export declare const AggregationPeriodItemContent: import("styled-components").StyledComponent<"div", any, AggregationPeriodItemContentProps, never>;
export declare const AggregationPeriodDeleteButton: import("styled-components").StyledComponent<import("react").NamedExoticComponent<import("../../../chart-kit/Menu/action-button/MenuItemActionButton.component").MenuItemActionButtonProps>, any, {}, never>;
export interface AggregationPeriodItemProps extends CKMenuItemProps {
    readonly keyboardModeEnabled?: boolean;
}
export declare const AggregationMenuItem: import("styled-components").StyledComponent<import("react").MemoExoticComponent<import("react").ForwardRefExoticComponent<CKMenuItemProps & import("react").RefAttributes<HTMLLIElement>>>, any, AggregationPeriodItemProps, never>;
export declare const AggregationPeriodActions: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const AdaptivePopoverStyled: import("styled-components").StyledComponent<import("react").FC<import("react").PropsWithChildren<import("../../../chart-kit/Popover/Popover.component").CKPopoverProps>>, any, {}, never>;
export {};
