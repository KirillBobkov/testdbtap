import * as React from 'react';
interface MultiLineTextToolProps {
    readonly onSubmit: () => void;
    readonly onCancel: () => void;
    readonly onChange: (value: string) => void;
    readonly text: string;
    readonly className?: string;
    readonly isFocused?: boolean;
    readonly fontSize: string;
    readonly background: string;
    readonly color: string;
    readonly lineHeight: number;
    readonly width: number;
    readonly height: number;
}
export declare const MultilineTextTool: React.MemoExoticComponent<(props: MultiLineTextToolProps) => JSX.Element>;
export {};
