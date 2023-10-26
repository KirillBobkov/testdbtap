import React from 'react';
import { CKButtonProps } from './default/Button.component';
import { ReactNode } from 'react';
export interface CKButtonIconProps extends CKButtonProps {
    readonly icon: ReactNode;
    readonly children?: ReactNode;
    readonly onMouseEnter?: (e: React.MouseEvent) => void;
    readonly onMouseLeave?: (e: React.MouseEvent) => void;
}
export declare const ButtonIcon: React.FC<CKButtonIconProps>;
