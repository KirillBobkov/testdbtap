import { Option } from 'fp-ts/Option';
export interface DateInputValue {
    day: Option<number>;
    month: Option<number>;
    year: Option<number>;
}
export declare const isDatesDifferent: (x: DateInputValue, y: DateInputValue) => boolean;
export declare const buildDate: (day: number) => (month: number) => (year: number) => Date;
export declare const buildDateOption: (day: Option<number>) => (month: Option<number>) => (year: Option<number>) => Option<Date>;
export type DateFormatType = 'DMY' | 'MDY';
export declare const ActiveSection: {
    readonly Day: 0;
    readonly Month: 1;
    readonly Year: 2;
};
export type ActiveSectionType = (typeof ActiveSection)[keyof typeof ActiveSection];
export interface DateInputState {
    activeSection?: ActiveSectionType;
    isOpened?: boolean;
}
export declare const toObjectDate: (date: Date) => DateInputValue;
export declare function format(date: Option<number>, section: ActiveSectionType): string;
export declare function decrementMonth(month: number): number;
export declare function decrementMonthOption(month: Option<number>): Option<number>;
export declare function incrementMonth(month: number): number;
export declare function incrementMonthOption(month: Option<number>): Option<number>;
export declare const inc: (value: number) => number;
export declare function checkParentsUpTo(node?: Element | null, checkNode?: Element, upToNode?: Element): boolean;
