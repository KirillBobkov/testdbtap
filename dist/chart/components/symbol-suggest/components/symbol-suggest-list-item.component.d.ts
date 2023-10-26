import { FC, MutableRefObject } from 'react';
export interface SymbolSuggestListItemProps {
    readonly value: string;
    readonly handleHover: (symbol: string) => void;
    readonly handleClick: (symbol: string) => void;
    readonly symbol: string;
    readonly description?: string;
    readonly type: string;
    readonly className?: string;
    readonly isHovered: boolean;
    readonly elRef?: MutableRefObject<HTMLDivElement | null>;
}
export declare const SymbolSuggestListItem: FC<SymbolSuggestListItemProps>;
