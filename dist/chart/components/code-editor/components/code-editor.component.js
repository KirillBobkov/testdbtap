import React, { forwardRef, memo, useEffect, useState } from 'react';
import AceEditor from 'react-ace';
import { constVoid } from 'fp-ts/function';
import { notEmpty } from '../../../../utils/typeGuards';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-error_marker';
const EDITOR_FONT_SIZE = 12;
const EDITOR_FONT_FAMILY = 'IBM Plex Mono SemiBold, monospace';
const EDITOR_TAB_SIZE = 2;
export const CodeEditor = memo(forwardRef((props, editor) => {
    const { readonly = false, onCodeChange, onCodeRun, code, errors } = props;
    const [markers, setMarkers] = useState([]);
    const [annotations, setAnnotations] = useState([]);
    useEffect(() => {
        if (errors) {
            const newMarkers = errors.map(createErrorMarker);
            const filteredMarkers = newMarkers.filter(notEmpty);
            const codeMarkers = filteredMarkers.map(m => m.marker);
            const gutterAnnotations = filteredMarkers.map(m => m.annotation);
            setMarkers(codeMarkers);
            setAnnotations(gutterAnnotations);
        }
    }, [errors, code]);
    return (React.createElement(AceEditor, { ref: editor, name: "dxScriptEditor", theme: "dxscript", mode: "dxscript", value: code, onChange: onCodeChange, editorProps: { $blockScrolling: true }, setOptions: {
            enableBasicAutocompletion: true,
            enableSnippets: true,
            enableLiveAutocompletion: true,
            tabSize: EDITOR_TAB_SIZE,
            useSoftTabs: true,
            printMargin: false,
            fontSize: EDITOR_FONT_SIZE,
            fontFamily: EDITOR_FONT_FAMILY,
            highlightGutterLine: false,
            highlightActiveLine: false,
            animatedScroll: true,
            cursorStyle: 'smooth',
            readOnly: readonly,
            maxLines: Infinity,
            fixedWidthGutter: true,
        }, width: "100%", height: "100%", commands: [
            {
                name: 'Run',
                bindKey: { win: 'Ctrl-Enter', mac: 'Command-Enter' },
                exec: onCodeRun || constVoid,
            },
        ], markers: markers, annotations: annotations }));
}));
const createErrorMarker = (error) => {
    return {
        marker: {
            startRow: Number(error.region.bounds.beginLine),
            startCol: Number(error.region.bounds.beginChar),
            endRow: Number(error.region.bounds.endLine),
            endCol: Number(error.region.bounds.endChar),
            className: 'dxScriptError',
            type: 'text',
        },
        annotation: {
            row: Number(error.region.bounds.beginLine),
            column: Number(error.region.bounds.beginChar),
            type: 'error',
            text: error.message,
        },
    };
};
