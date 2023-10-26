export interface TRadioButton<T> {
    readonly name: string;
    readonly type: T;
    readonly ariaLabel?: string;
    readonly ariaDescribedby?: string;
}
export interface ButtonsRadioGroupProps<T> {
    readonly buttons: TRadioButton<T>[];
    readonly selected?: T;
    readonly onSelect: (type: T) => void;
    readonly isDisabled?: boolean;
    readonly className?: string;
    readonly ariaLabel?: string;
    readonly ariaDescribedby?: string;
}
declare function ButtonsRadioGroupRaw<T extends string | number>(props: ButtonsRadioGroupProps<T>): JSX.Element;
export declare const ButtonsRadioGroup: typeof ButtonsRadioGroupRaw;
export {};
