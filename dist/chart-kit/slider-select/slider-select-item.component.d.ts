import { ReactNode } from 'react';
export interface SliderSelectItemProps<T> {
    readonly value: T;
    readonly isActive: boolean;
    readonly icon?: JSX.Element;
    readonly onItemSelect: (value: T) => void;
    readonly children?: ReactNode;
    readonly className?: string;
}
export declare const SliderSelectItem: <T extends string | number>(props: SliderSelectItemProps<T>) => JSX.Element;
