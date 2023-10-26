export declare const RangeSide: {
    readonly From: 0;
    readonly To: 1;
};
export type RangeSideType = (typeof RangeSide)[keyof typeof RangeSide];
export interface DateRangeValue {
    readonly from: Date | undefined;
    readonly to: Date | undefined;
}
