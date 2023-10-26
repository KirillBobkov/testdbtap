import React from 'react';
declare const RightClickMenuReorderTypes: {
    readonly bringToFront: "bringToFront";
    readonly sendToBack: "sendToBack";
    readonly moveTo: "moveTo";
};
export type ReorderType = (typeof RightClickMenuReorderTypes)[keyof typeof RightClickMenuReorderTypes];
export interface RightClickMenuReorderBtnsProps {
    readonly onReorder: (value: ReorderType) => void;
}
export declare const RightClickMenuReorderButtons: React.NamedExoticComponent<RightClickMenuReorderBtnsProps>;
export {};
