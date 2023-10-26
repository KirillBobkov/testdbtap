import React from 'react';
export interface DrawingsSidebarHeaderProps {
    readonly expanded: boolean;
    readonly onToggleExpanded: (expanded: boolean) => void;
}
export declare const DrawingsSidebarHeader: React.NamedExoticComponent<DrawingsSidebarHeaderProps>;
