import React from 'react';
import { ReactElement, EventHandler, MouseEvent } from 'react';
import { Lazy } from 'fp-ts/function';
export interface HoldableChildProps {
    readonly onMouseDown: EventHandler<MouseEvent<Element>>;
    readonly onMouseUp: EventHandler<MouseEvent<Element>>;
    readonly onMouseLeave: EventHandler<MouseEvent<Element>>;
}
export interface HoldableProps {
    readonly children: ReactElement<HoldableChildProps>;
    readonly onHold: Lazy<void>;
    readonly delay?: number;
    readonly interval?: number;
    readonly isDisabled?: boolean;
    readonly disableMouseLeave?: boolean;
}
export declare const Holdable: React.NamedExoticComponent<HoldableProps>;
