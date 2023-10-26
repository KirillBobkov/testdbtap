import React from 'react';
export declare const lineEndTypes: readonly ["arrow", "line"];
export type LineEndType = (typeof lineEndTypes)[number];
export interface LineEndSelectboxLocalization {
    arrow: string;
    none: string;
}
export interface LineEndSelectboxProps {
    readonly reversed?: boolean;
    readonly selectedType: LineEndType;
    readonly onTypeSelect: (type: LineEndType) => void;
    readonly localization: LineEndSelectboxLocalization;
    readonly className?: string;
    readonly parentEventTarget?: HTMLElement;
}
export declare const LineEndSelectbox: React.FC<LineEndSelectboxProps>;
