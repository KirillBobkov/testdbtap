import { Ref, PropsWithChildren } from 'react';
import * as React from 'react';
import { ControlProps } from '../Control/Control';
export interface CKEditableTextProps extends ControlProps<string> {
    readonly disabled?: boolean;
    readonly ref?: Ref<HTMLDivElement>;
    readonly className?: string;
    readonly fontParams?: string;
    readonly maxWidth?: number;
}
export declare const EditableText: React.NamedExoticComponent<PropsWithChildren<CKEditableTextProps>>;
