import * as React from 'react';
import { memo, useCallback, useRef } from 'react';
import { SymbolSuggestHighlightStyled, SymbolSuggestListItemColumnStyled, SymbolSuggestListItemRowStyled, SymbolSuggestListItemColumnNameStyled, SymbolSuggestListItemColumnTypeStyled, } from './symbol-suggest-list-item.styled';
export const SymbolSuggestListItem = memo(props => {
    const { value, handleHover, handleClick, symbol, description, type, className, isHovered, elRef } = props;
    const ref = useRef(null);
    if (elRef) {
        elRef.current = ref.current;
    }
    const onMouseEnterHandler = useCallback(() => handleHover(symbol), [handleHover, symbol]);
    const onClickHandler = useCallback(() => handleClick(symbol), [handleClick, symbol]);
    return (React.createElement(SymbolSuggestListItemRowStyled, { isHovered: isHovered, onMouseEnter: onMouseEnterHandler, onClick: onClickHandler, ref: ref, className: className },
        React.createElement(SymbolSuggestListItemColumnNameStyled, null,
            React.createElement(SymbolSuggestHighlightStyled, { search: value }, symbol)),
        React.createElement(SymbolSuggestListItemColumnStyled, null,
            React.createElement(SymbolSuggestHighlightStyled, { search: value }, description ?? '')),
        React.createElement(SymbolSuggestListItemColumnTypeStyled, null, type)));
});
