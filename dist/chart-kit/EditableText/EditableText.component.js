import { memo, forwardRef, useState, useCallback, useRef, useEffect, useMemo, } from 'react';
import * as React from 'react';
import { EditableTextFieldStyled, EditableTextStyled } from './EditableText.styled';
import { useMultipleTouch } from '../utils/useMultipleTouch';
import { getTextWidth } from '../../utils/script-title.utils';
export const EditableText = memo(forwardRef((props, forwardedRef) => {
    const { disabled, value, onValueChange, className, maxWidth = 100, fontParams = 'normal normal 400 12px Open Sans', children, } = props;
    const editableInputRef = useRef(null);
    const [editable, setEditable] = useState(false);
    const [inputValue, setInputValue] = useState(value);
    useEffect(() => {
        editable && editableInputRef.current?.select();
    }, [editable]);
    const textWidth = useMemo(() => {
        const width = Math.round(getTextWidth(`${inputValue}*`, fontParams));
        return width < maxWidth && editable ? `${width}px` : `${maxWidth}px`;
    }, [inputValue, editable]);
    const saveText = useCallback(() => {
        const text = inputValue.trim();
        if (text.length > 0 && text !== value) {
            onValueChange(text);
            setInputValue(text);
        }
        else {
            setInputValue(value);
        }
    }, [inputValue, value, onValueChange]);
    const toggleEdit = useCallback((edit) => {
        if (!disabled) {
            setEditable(edit);
        }
    }, [disabled]);
    const onBlur = useCallback(() => {
        toggleEdit(false);
        saveText();
    }, [saveText, toggleEdit]);
    const onChange = useCallback((event) => {
        const eventValue = event.target.value;
        setInputValue(eventValue);
    }, []);
    const onClickHandler = useCallback((e) => editable && e.stopPropagation(), [editable]);
    const onDoubleClickHandler = useCallback((e) => {
        e.stopPropagation();
        toggleEdit(true);
    }, [toggleEdit]);
    const onDoubleTouchHandler = useMultipleTouch((e) => {
        e.stopPropagation();
        toggleEdit(true);
    }, [toggleEdit]);
    const onKeyDownHandler = useCallback((e) => {
        // eslint-disable-next-line deprecation/deprecation
        if (e.code === 'Enter' && !e.shiftKey) {
            e.stopPropagation();
            editable && saveText();
            toggleEdit(!editable);
        }
        if (e.code === 'Backspace' || e.code === 'Delete') {
            e.stopPropagation();
        }
    }, [editable, saveText, toggleEdit]);
    return (React.createElement(EditableTextStyled, { onClick: onClickHandler, onDoubleClick: onDoubleClickHandler, onTouchEnd: onDoubleTouchHandler, onKeyDown: onKeyDownHandler, ref: forwardedRef, tabIndex: 0, maxWidth: textWidth, disabled: disabled, className: className }, editable ? (React.createElement(EditableTextFieldStyled, { tabIndex: -1, type: "text", ref: editableInputRef, value: inputValue, onBlur: onBlur, onChange: onChange })) : (children || value)));
}));
