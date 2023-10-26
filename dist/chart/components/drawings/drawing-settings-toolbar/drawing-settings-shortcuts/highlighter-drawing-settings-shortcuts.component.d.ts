import React from 'react';
import { DrawingFormType } from '../../drawing-popup/drawing-popup.component';
interface HighlighterDrawingShortcutsProperties extends DrawingFormType<'highlighter'> {
    readonly className?: string;
}
export declare const HighlighterDrawingSettingsShortcuts: React.MemoExoticComponent<(props: HighlighterDrawingShortcutsProperties) => JSX.Element>;
export {};
