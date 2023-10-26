import React from 'react';
import { DrawingFormType } from '../../drawing-popup/drawing-popup.component';
import { TextDrawingType } from '../../../../model/drawing.model';
interface TextDrawingSettingsShortcutsProperties extends DrawingFormType<TextDrawingType> {
    readonly className?: string;
}
export declare const TextDrawingSettingsShortcuts: React.MemoExoticComponent<(props: TextDrawingSettingsShortcutsProperties) => JSX.Element>;
export {};
