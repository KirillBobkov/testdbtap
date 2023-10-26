import React, { AriaAttributes, CSSProperties, PropsWithChildren } from 'react';
export interface ChartLayersCommonItemProps extends AriaAttributes {
    readonly id: string;
    readonly className?: string;
    readonly testId?: string;
    readonly style?: CSSProperties;
    readonly locked?: boolean;
    readonly visible?: boolean;
    readonly toggleVisibility: (id: string, visible: boolean) => void;
    readonly toggleLocked: (id: string, lock: boolean) => void;
    readonly onClickHandle: (selectedItems: string[] | ((selectedItems: string[]) => string[])) => void;
    readonly isSelected: boolean;
}
export declare const ChartLayersCommonItem: React.MemoExoticComponent<(props: PropsWithChildren<ChartLayersCommonItemProps>) => JSX.Element>;
