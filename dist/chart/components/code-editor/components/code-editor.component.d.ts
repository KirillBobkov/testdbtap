import { FC, Ref } from 'react';
import AceEditor from 'react-ace';
import { ScriptError } from '../../../../providers/dx-script-provider';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-error_marker';
export interface CodeEditorProps {
    readonly readonly?: boolean;
    readonly code: string;
    readonly onCodeChange: (code: string) => void;
    readonly ref?: Ref<AceEditor>;
    readonly onCodeRun?: () => void;
    readonly errors?: ScriptError[];
    readonly autofocus?: boolean;
}
export declare const CodeEditor: FC<CodeEditorProps>;
