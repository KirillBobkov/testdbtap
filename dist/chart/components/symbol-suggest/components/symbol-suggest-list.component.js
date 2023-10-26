import * as React from 'react';
import { memo, useCallback, useLayoutEffect, useRef, useState } from 'react';
import { SymbolSuggestListItem } from './symbol-suggest-list-item.component';
import { SymbolListAdditionalStyled, SymbolListScrollableStyled, SymbolSuggestMenuStyled, SymbolSuggestTbodyStyled, } from './symbol-suggest-list.styled';
import { Scrollable } from '../../../../chart-kit/Scrollable/Scrollable';
import { isKeyCode } from '../../../../chart-kit/Control/Control';
export const SymbolSuggestList = memo(props => {
    const { data, value, children, onChange, handleBlur, onCloseRequest, className, hoveredSuggest, setHoveredSuggest, } = props;
    const [scrollTop, setScrollTop] = useState(0);
    const scrollableRef = useRef(null);
    const hoveredElRef = useRef(null);
    // used during up/down keys navigation to the scroll menu
    const applyOffset = useCallback(() => {
        if (hoveredElRef.current && scrollableRef.current) {
            const hoveredElBottom = hoveredElRef.current.offsetHeight + hoveredElRef.current.offsetTop;
            const scrollBottom = scrollableRef.current.offsetHeight + scrollableRef.current.scrollTop;
            const diff = hoveredElBottom - scrollBottom;
            if (diff > 0) {
                setScrollTop(prev => prev + diff);
            }
            const hoveredElTop = hoveredElRef.current.offsetTop;
            const scrollTop = scrollableRef.current.scrollTop;
            const diffTop = scrollTop - hoveredElTop;
            if (diffTop > 0) {
                setScrollTop(prev => prev - diffTop);
            }
        }
    }, []);
    const handleKeyDown = useCallback((e) => {
        if (isKeyCode(e.code)) {
            switch (e.code) {
                case 'Enter': {
                    if (hoveredSuggest) {
                        onChange(hoveredSuggest);
                    }
                    break;
                }
                case 'Escape':
                    onCloseRequest();
                    return;
                case 'Tab':
                    handleBlur?.();
                    return;
                case 'ArrowDown': {
                    e.preventDefault();
                    const hoveredIdIndex = data.findIndex(item => item.symbol === hoveredSuggest);
                    if (hoveredIdIndex === -1 && data.length) {
                        setHoveredSuggest(data[0].symbol);
                    }
                    else if (data.length - 1 !== hoveredIdIndex && data.length) {
                        setHoveredSuggest(data[hoveredIdIndex + 1].symbol);
                    }
                    applyOffset();
                    break;
                }
                case 'ArrowUp': {
                    e.preventDefault();
                    const hoveredIdIndex = data.findIndex(item => item.symbol === hoveredSuggest);
                    if (hoveredIdIndex === -1 && data.length) {
                        setHoveredSuggest(data[data.length - 1].symbol);
                    }
                    else if (hoveredIdIndex !== 0 && data.length) {
                        setHoveredSuggest(data[hoveredIdIndex - 1].symbol);
                    }
                    applyOffset();
                    break;
                }
            }
        }
    }, [onCloseRequest, handleBlur, hoveredSuggest, onChange, data, applyOffset, setHoveredSuggest]);
    useLayoutEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);
    const handleScroll = useCallback((left, top) => {
        setScrollTop(top);
    }, [setScrollTop]);
    const handleClick = useCallback((suggestId) => {
        onChange(suggestId);
    }, [onChange]);
    const handleMouseLeave = useCallback(() => setHoveredSuggest(null), [setHoveredSuggest]);
    return data.length ? (React.createElement(Scrollable, { containerRef: scrollableRef, scrollTop: scrollTop, onScroll: handleScroll },
        React.createElement(SymbolListScrollableStyled, null,
            React.createElement(SymbolSuggestMenuStyled, null,
                React.createElement(SymbolSuggestTbodyStyled, { onMouseLeave: handleMouseLeave }, data.map(({ symbol, description, type }) => (React.createElement(SymbolSuggestListItem, { isHovered: symbol === hoveredSuggest, elRef: symbol === hoveredSuggest ? hoveredElRef : undefined, key: symbol, symbol: symbol, description: description, type: type, value: value, handleClick: handleClick, handleHover: setHoveredSuggest, className: className }))))),
            React.createElement(SymbolListAdditionalStyled, null, children)))) : null;
});
