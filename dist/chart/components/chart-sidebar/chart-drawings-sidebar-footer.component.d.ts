import React from 'react';
import { ButtonsState, SidebarFooterButtonType } from './chart-sidebar.model';
export interface DrawingsSidebarFooterProps {
    readonly buttonsState: ButtonsState;
    readonly expanded: boolean;
    readonly disabled?: boolean;
    readonly onButtonClick: (type: SidebarFooterButtonType) => void;
}
export declare const DrawingsSidebarFooter: React.NamedExoticComponent<DrawingsSidebarFooterProps>;
