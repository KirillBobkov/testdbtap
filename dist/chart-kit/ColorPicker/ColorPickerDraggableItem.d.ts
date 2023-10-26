import React, { FC } from 'react';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
export interface ColorPickerDraggableItemProps {
    provided: DraggableProvided;
    snapshot: DraggableStateSnapshot;
    portal: HTMLElement;
    children: React.ReactNode;
}
export declare const ColorPickerDraggableItem: FC<ColorPickerDraggableItemProps>;
