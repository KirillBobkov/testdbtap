import React, { ButtonHTMLAttributes, Ref } from 'react';
export interface CKButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
    readonly isFlat?: boolean;
    readonly isPrimary?: boolean;
    readonly isExtra?: boolean;
    readonly isFlatPrimary?: boolean;
    readonly isActive?: boolean;
    readonly ref?: Ref<HTMLButtonElement>;
    readonly hasMenu?: boolean;
    readonly testId?: string;
    readonly className?: string;
}
export declare const Button: React.NamedExoticComponent<CKButtonProps>;
