import * as React from 'react';
import { CSSProperties } from 'react';
import { ReactNode } from 'react';
interface DemoCardProps {
    title?: string;
    children: ReactNode;
    style?: CSSProperties;
}
export declare const DemoCard: React.NamedExoticComponent<DemoCardProps>;
export {};
