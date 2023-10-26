import React, { FC, Ref } from 'react';
import AceEditor from 'react-ace';
export interface CodeEditorFocusHandlerProps {
    readonly autofocus?: boolean;
    readonly editor?: Ref<AceEditor>;
    readonly children?: React.ReactNode;
}
export declare const CodeEditorFocusHandler: FC<CodeEditorFocusHandlerProps>;
