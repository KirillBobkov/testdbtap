import * as React from 'react';
import { HTMLAttributes } from 'react';
export interface IconWrapperProps extends HTMLAttributes<HTMLElement> {
    readonly className?: string;
    readonly width?: number;
    readonly height?: number;
    readonly testId?: string;
}
export declare const IconWrapper: React.FC<IconWrapperProps>;
