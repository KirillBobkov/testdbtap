import React from 'react';
import { TextDrawingData } from '../../view-models/drawings/text-drawing.view-model';
export interface TextNoteProps {
    readonly container: HTMLElement;
    readonly data: TextDrawingData;
    readonly onChange: (value: string) => void;
    readonly onSubmit: () => void;
    readonly onCancel: () => void;
}
export declare const TextNote: React.NamedExoticComponent<TextNoteProps>;
