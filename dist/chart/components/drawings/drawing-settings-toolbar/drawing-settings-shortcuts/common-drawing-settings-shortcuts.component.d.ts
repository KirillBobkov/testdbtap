import React from 'react';
import { DrawingFormType } from '../../drawing-popup/drawing-popup.component';
import { PlainDrawingType } from '../../../../model/drawing.model';
import { LineStyle } from '../../../../../chart-kit/LineStylePicker/LineStylePicker.component';
interface CommonDrawingShortcutsProperties extends DrawingFormType<PlainDrawingType> {
    readonly className?: string;
    readonly onColorChange: (color: string) => void;
    readonly onLinePickerChange: (line: LineStyle) => void;
}
export declare const CommonDrawingSettingsShortcuts: React.MemoExoticComponent<(props: CommonDrawingShortcutsProperties) => JSX.Element>;
export {};
