import { Component, ReactElement, MouseEvent, TouchEvent, KeyboardEvent } from 'react';
export type InteractionEvent<T> = MouseEvent<T> | TouchEvent<T> | KeyboardEvent<T>;
export interface TRootCloseProps {
    children: ReactElement;
    onRootClose?: (e: InteractionEvent<HTMLElement>) => void;
    ignoreClick?: boolean;
    ignoreKeyUp?: boolean;
}
export declare class RootClose extends Component<TRootCloseProps> {
    private preventMouseRootClose;
    private ignoreMouseUp;
    private currentEvent;
    componentDidMount(): void;
    render(): JSX.Element;
    private onMouseDown;
    private handleClickCapture;
    private handleClick;
    private handleTouchStartCapture;
    private handleTouchStart;
    private handleKeyUp;
}
