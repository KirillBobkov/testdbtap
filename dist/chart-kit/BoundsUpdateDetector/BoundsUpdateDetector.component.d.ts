import React from 'react';
export interface TSize {
    width: number;
    height: number;
}
export interface TBoundsUpdateDetectorProps {
    onUpdate: (size: TSize) => void;
    children: any;
}
export declare class BoundsUpdateDetector extends React.Component<TBoundsUpdateDetectorProps> {
    private size;
    componentDidMount(): void;
    getSize(): {
        width: number;
        height: number;
    };
    componentDidUpdate(prevProps: TBoundsUpdateDetectorProps, prevState: TBoundsUpdateDetectorProps): void;
    render(): any;
}
