/// <reference types="react" />
import { ChartSettingsPopoverMeasurements } from './chart-settings.model';
interface ChartSettingsPopoverStyledProps {
    readonly popoverMeasurements: ChartSettingsPopoverMeasurements;
    readonly dividerOffset: number;
}
export declare const ChartSettingsPopoverStyled: import("styled-components").StyledComponent<import("react").FC<import("react").PropsWithChildren<import("../../../chart-kit/Popover/Popover.component").CKPopoverProps>>, any, ChartSettingsPopoverStyledProps, never>;
export declare const ChartSettingsContainer: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const ChartSettingsTabsStyled: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const ChartSettingsTabContentStyled: import("styled-components").StyledComponent<"div", any, {}, never>;
interface ChartSettingsTabButtonStyledProps {
    readonly isActive: boolean;
}
export declare const ChartSettingsTabButtonStyled: import("styled-components").StyledComponent<"button", any, ChartSettingsTabButtonStyledProps, never>;
export declare const ChartSettingsTabItemIconStyled: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const ChartSettingsTabItemLabelStyled: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const ChartSettingsTabItemContainerStyled: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const ChartSettingsTabContainer: import("styled-components").StyledComponent<"div", any, {}, never>;
export {};
