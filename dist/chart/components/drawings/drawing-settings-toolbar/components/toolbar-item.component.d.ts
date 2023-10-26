import React, { ReactNode } from 'react';
export interface ToolbarItemProps {
    readonly padding?: boolean;
    readonly margin?: boolean;
    readonly children?: ReactNode;
    readonly className?: string;
}
export declare const ToolbarItem: React.NamedExoticComponent<ToolbarItemProps>;
