import React from 'react';
export interface OpacitySelectorProps {
    readonly color?: string;
    readonly value: number;
    readonly onChange: (value: number) => void;
    readonly isDisabled?: boolean;
    readonly className?: string;
}
export declare const OpacitySelector: React.NamedExoticComponent<OpacitySelectorProps>;
