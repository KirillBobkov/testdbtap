import { Lazy } from 'fp-ts/function';
import React, { ComponentType, ReactNode } from 'react';
import { Suggest } from './symbol-suggest.model';
export interface SymbolSuggestProps {
    readonly children?: ReactNode;
    readonly className?: string;
    readonly testId?: string;
    readonly ariaDescribedBy?: string;
    readonly data: Suggest[];
    readonly selectedInstrument?: string;
    readonly disabled?: boolean;
    readonly placeholder?: string;
    readonly initialFocus?: boolean;
    readonly clearAfterSelect?: boolean;
    readonly onCloseRequest: Lazy<void>;
    readonly onEnter: (suggest: Suggest) => void;
    readonly onBlur?: Lazy<void>;
    readonly onFocus?: Lazy<void>;
    readonly searchInstruments: (value: string) => void;
    readonly DataStateNoData?: ComponentType;
    readonly DataStatePending?: ComponentType;
    readonly DataStateSuccessWrapper?: ComponentType;
    readonly noData?: boolean;
}
export declare const SymbolSuggest: React.MemoExoticComponent<React.ForwardRefExoticComponent<SymbolSuggestProps & React.RefAttributes<HTMLDivElement>>>;
export interface SymbolSuggestWithPopoverProps extends SymbolSuggestProps {
    readonly opened: boolean;
}
export declare const SymbolSuggestWithPopover: React.NamedExoticComponent<SymbolSuggestWithPopoverProps>;
