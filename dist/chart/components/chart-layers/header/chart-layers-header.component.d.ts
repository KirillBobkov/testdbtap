import { Lazy } from 'fp-ts/function';
import React from 'react';
interface ChartLayersHeaderProps {
    readonly onClose: Lazy<void>;
    readonly className?: string;
}
export declare const ChartLayersHeader: React.NamedExoticComponent<ChartLayersHeaderProps>;
export {};
