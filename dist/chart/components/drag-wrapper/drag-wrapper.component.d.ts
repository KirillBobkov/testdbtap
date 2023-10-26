import * as React from 'react';
import { ToolbarPosition } from '../../view-models/drawings/drawing.view-model';
export interface DragWrapperProps {
    readonly position: ToolbarPosition;
    readonly drag: (position: ToolbarPosition) => void;
    readonly handle: string;
    readonly children: React.ReactNode;
    readonly bounds?: {
        left?: number;
        right?: number;
        top?: number;
        bottom?: number;
    };
}
declare const DragWrapper: React.MemoExoticComponent<(props: DragWrapperProps) => JSX.Element>;
export default DragWrapper;
