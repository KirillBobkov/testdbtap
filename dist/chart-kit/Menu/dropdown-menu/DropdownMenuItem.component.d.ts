import React, { FC } from 'react';
import { CKMenuItemProps } from '../MenuItem.component';
export interface DropdownMenuItemProps extends CKMenuItemProps {
    readonly icon?: React.ReactNode;
    readonly label: string;
    readonly className?: string;
    readonly testId?: string;
}
export declare const DropdownMenuItem: FC<DropdownMenuItemProps>;
