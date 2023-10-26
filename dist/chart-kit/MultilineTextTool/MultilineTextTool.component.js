import * as React from 'react';
import { memo, useCallback, useEffect, useLayoutEffect, useMemo } from 'react';
import { MultilineTextToolContainerStyled, MultilineTextToolTextareaStyled } from './MultilineTextTool.styled';
import { EventListener } from '../EventListener/EventListener.component';
import { RootClose } from '../RootClose/RootClose';
export const MultilineTextTool = memo((props) => {
    const { text, className, isFocused = false, onCancel, onSubmit, onChange, fontSize = '12pt', background, color, lineHeight, width, height, } = props;
    const textAreaRefHook = React.useRef(null);
    const setFocus = useCallback(() => {
        if (!textAreaRefHook.current) {
            return;
        }
        const { length } = textAreaRefHook.current.value;
        // the hack, because something steals the focus from textArea after textArea.focus()
        // needs further research
        // but for now, hack is ok
        setTimeout(() => textAreaRefHook.current && textAreaRefHook.current.focus(), 0);
        textAreaRefHook.current.setSelectionRange(length, length);
    }, [textAreaRefHook]);
    useLayoutEffect(() => {
        if (!textAreaRefHook.current) {
            return;
        }
        textAreaRefHook.current.style.height = `${height}px`;
    }, [height]);
    useEffect(() => {
        isFocused && setFocus();
    }, [isFocused, setFocus]);
    const onSubmitHandler = useCallback(() => {
        if (!textAreaRefHook || !textAreaRefHook.current) {
            return;
        }
        onSubmit();
    }, [onSubmit]);
    const onKeyPressed = useCallback((event) => {
        event.stopPropagation();
        const { code, ctrlKey, metaKey } = event;
        if (code === 'Escape') {
            onCancel();
        }
        if ((ctrlKey && code === 'Enter') || (metaKey && code === 'Enter') || code === 'Tab') {
            onSubmitHandler();
        }
    }, [onCancel, onSubmitHandler]);
    const onBlurHandler = useCallback(() => {
        onSubmitHandler();
    }, [onSubmitHandler]);
    const onClickHandler = useCallback((event) => {
        if (event.target instanceof HTMLElement) {
            const node = event.target.tagName.toLowerCase();
            switch (node) {
                case 'textarea':
                case 'p':
                    break;
                default:
                    setFocus();
                    break;
            }
        }
    }, [setFocus]);
    const onChangeHandler = useCallback((e) => {
        if (!textAreaRefHook || !textAreaRefHook.current) {
            return;
        }
        const { value } = e.currentTarget;
        onChange(value.replace(/[\/\|\\?:<>"]/g, ''));
        if (value.length - text.length > 20) {
            // Hack to avoid random height
            onBlurHandler();
        }
    }, [onChange, text.length, onBlurHandler]);
    const textAreaRef = useCallback((value) => (textAreaRefHook.current = value), []);
    const getFontSizeNumber = useMemo(() => {
        return Number(fontSize.slice(0, fontSize.length - 2));
    }, [fontSize]);
    return (React.createElement(RootClose, { onRootClose: onBlurHandler },
        React.createElement(MultilineTextToolContainerStyled, { onClick: onClickHandler, className: className, background: background },
            React.createElement(EventListener, { target: "document", onKeyDown: onKeyPressed, children: [] }),
            React.createElement(MultilineTextToolTextareaStyled, { value: text, onKeyUp: onKeyPressed, width: width, height: height, ref: textAreaRef, onInput: onChangeHandler, fontSize: getFontSizeNumber, color: color, lineheight: lineHeight, spellCheck: 'false' }))));
});
