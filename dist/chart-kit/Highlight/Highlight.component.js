import React, { memo, useCallback } from 'react';
import { HighlightContainerStyled, HighlightMarkStyled } from './Highlight.styled';
import { split } from '../../utils/string.utils';
export const Highlight = memo(props => {
    const { search, children, ...rest } = props;
    const highlight = useCallback(() => {
        let result;
        if (!search) {
            result = children;
        }
        else {
            const splitted = split(children, search, false);
            result = splitted.reduce((acc, el, i) => {
                if (el.trim() !== '') {
                    acc.push(i % 2 ? React.createElement(HighlightMarkStyled, { key: i }, el) : el);
                }
                return acc;
            }, []);
        }
        return result;
    }, [children, search]);
    const result = highlight();
    return React.createElement(HighlightContainerStyled, { ...rest }, result);
});
