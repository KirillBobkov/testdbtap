import { option } from 'fp-ts';
import { constVoid, pipe } from 'fp-ts/function';
import React, { forwardRef, memo, useCallback, useEffect, useRef, useState, useContext, } from 'react';
import { findDOMNode } from 'react-dom';
import { isKeyCode } from '../../../chart-kit/Control/Control';
import { SymbolSuggestList } from './components/symbol-suggest-list.component';
import { SuggestContainerStyled, SymbolSuggestContainerStyled, SymbolSuggestInputStyled, SymbolSuggestPopoverStyled, } from './symbol-suggest.styled';
import { useSyncedRef } from '../../../chart-kit/utils/react/use-synced-ref';
import { ChartReactAppContext } from '../../defaults';
const setSelectionRange = (elem, pos, length) => {
    try {
        elem.setSelectionRange(pos, pos + length);
    }
    catch (e) { }
};
export const SymbolSuggest = memo(forwardRef((props, forwardedRef) => {
    const { data, selectedInstrument = '', disabled, placeholder = 'Search...', initialFocus = false, className, clearAfterSelect, testId, ariaDescribedBy, children, DataStateSuccessWrapper = React.Fragment, onBlur, DataStateNoData = React.Fragment, searchInstruments, onEnter, onFocus, onCloseRequest, noData, } = props;
    const [inputValue, setInputValue] = useState(selectedInstrument);
    const [hoveredSuggest, setHoveredSuggest] = useState(null);
    const containerRef = useSyncedRef(forwardedRef);
    useEffect(() => {
        setInputValue(selectedInstrument);
    }, [selectedInstrument]);
    const handleValueChange = useCallback((value = '') => setInputValue(value.toUpperCase()), []);
    useEffect(() => {
        searchInstruments(inputValue);
    }, [handleValueChange, inputValue, searchInstruments]);
    const onChange = useCallback((symbol) => {
        const hoveredSuggest = option.fromNullable(data.find(s => s.symbol === symbol));
        pipe(hoveredSuggest, option.filterMap(suggest => {
            if (suggest.symbol === selectedInstrument) {
                setInputValue(suggest.symbol);
            }
            return option.fromNullable(suggest);
        }), option.fold(constVoid, suggest => onEnter(suggest)));
        const element = findDOMNode(containerRef.current);
        if (element instanceof Element) {
            const inputElement = element.querySelector('input');
            if (inputElement) {
                inputElement.blur();
            }
        }
    }, [data, onEnter, containerRef, selectedInstrument]);
    const handleKeyDown = useCallback((e) => {
        if (isKeyCode(e.code)) {
            const code = e.code;
            switch (code) {
                case 'Enter': {
                    if (clearAfterSelect) {
                        onChange('');
                    }
                    break;
                }
                case 'Escape':
                    onCloseRequest();
                    break;
                case 'Tab':
                    if (e.shiftKey) {
                        onCloseRequest();
                    }
                    break;
            }
        }
    }, [clearAfterSelect, onChange, onCloseRequest]);
    const handleFocus = useCallback((e) => {
        const inputElement = e?.target;
        if (containerRef.current && inputElement && inputElement instanceof HTMLInputElement) {
            setSelectionRange(inputElement, 0, inputValue.length);
        }
        onFocus?.();
    }, [containerRef, onFocus, inputValue.length]);
    const handleBlurInput = useCallback((e) => {
        if (hoveredSuggest === null) {
            setInputValue(selectedInstrument);
        }
        // handling case: blur event while keyboard navigation
        if (e.relatedTarget?.id !== 'scrollable-id') {
            setInputValue(selectedInstrument);
        }
    }, [hoveredSuggest, selectedInstrument]);
    const handleTouchStart = useCallback(() => {
        handleFocus();
    }, [handleFocus]);
    return (React.createElement(React.Fragment, null,
        React.createElement(SymbolSuggestContainerStyled, { className: className },
            React.createElement(SymbolSuggestInputStyled, { onTouchStart: handleTouchStart, ariaDescribedby: ariaDescribedBy, value: inputValue, autofocus: initialFocus, onFocus: handleFocus, onValueChange: handleValueChange, onBlur: handleBlurInput, isDisabled: disabled, placeholder: selectedInstrument ? placeholder : '', onKeyDown: handleKeyDown, ref: containerRef, testId: testId, role: "textbox" }),
            React.createElement(SuggestContainerStyled, null,
                React.createElement(DataStateSuccessWrapper, null,
                    React.createElement(SymbolSuggestList, { setHoveredSuggest: setHoveredSuggest, hoveredSuggest: hoveredSuggest, data: data, value: inputValue, onChange: onChange, handleBlur: onBlur, onCloseRequest: onCloseRequest }, children)))),
        noData && React.createElement(DataStateNoData, null)));
}));
export const SymbolSuggestWithPopover = memo(props => {
    const { data, DataStateNoData, onBlur, opened, ...rest } = props;
    const anchorRef = useRef(null);
    const { rootElement } = useContext(ChartReactAppContext);
    const handleBlur = useCallback(() => onBlur?.(), [onBlur]);
    const wrapDataStateWithPopover = useCallback((props) => (React.createElement(SymbolSuggestPopoverStyled, { ...props, noData: data.length === 0, onRequestClose: handleBlur, align: "start", position: "bottom", opened: opened, 
        // parentEventTarget is needed here, because for some reason without it - first click in suggest triggers clickAwayHandler in Popover.component
        // and inside it e.target is <body>, but we click on <input>
        parentEventTarget: rootElement, anchorRef: anchorRef }, props.children)), [handleBlur, data.length, opened]);
    return (React.createElement(React.Fragment, null,
        React.createElement(SymbolSuggest, { ...rest, data: data, onBlur: handleBlur, ref: anchorRef, DataStateNoData: DataStateNoData, DataStateSuccessWrapper: wrapDataStateWithPopover, noData: data.length === 0 && opened })));
});
