import React, { ReactNode } from 'react';
export interface AccordionProps {
    readonly wrapper: ReactNode;
    readonly children?: ReactNode;
    readonly skipAnimation?: boolean;
    readonly className?: string;
    readonly isSelected?: boolean;
    readonly isHidden?: boolean;
    readonly isFocused?: boolean;
}
export declare const Accordion: React.NamedExoticComponent<AccordionProps>;
