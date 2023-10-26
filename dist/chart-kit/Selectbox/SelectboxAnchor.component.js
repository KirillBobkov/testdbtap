import React, { memo, forwardRef, useRef, useEffect } from 'react';
import { SelectboxAnchorContentStyled, SelectboxAnchorTextStyled, SelectboxAnchorStyled, SelectboxAnchorCaretStyled, SelectboxAnchorPrefixStyled, } from './SelectboxAnchor.styled';
import { MENU_ID } from '../Menu/Menu.component';
export const SelectboxAnchor = memo(forwardRef((props, forwardedRef) => {
    const { isOpened, hasMenu, caretIcon, valueText, onClick, onKeyDown, children, className, prefixIcon, testId, tabIndex, ariaLabel, ariaDescription, } = props;
    const ref = useRef(null);
    // TODO remove when migrate to React 18 - https://github.com/facebook/react/issues/21035
    // TODO replace with useSyncedRef, get rid of forwardRef if possible
    useEffect(() => {
        if (forwardedRef !== null) {
            if (typeof forwardedRef === 'function') {
                forwardedRef(ref.current);
            }
            else {
                // @ts-ignore
                forwardedRef['current'] = ref.current;
            }
        }
        if (ref.current && ariaDescription !== undefined) {
            // @ts-ignore
            ref.current.ariaDescription = ariaDescription;
        }
    });
    return (React.createElement(SelectboxAnchorStyled, { hasMenu: hasMenu, tabIndex: tabIndex ?? 0, ref: ref, onClick: onClick, onKeyDown: onKeyDown, className: className, testId: testId, "aria-label": ariaLabel, "aria-expanded": "false", "aria-haspopup": isOpened, "aria-controls": MENU_ID },
        React.createElement(SelectboxAnchorContentStyled, null,
            React.createElement(SelectboxAnchorPrefixStyled, null, prefixIcon),
            React.createElement(SelectboxAnchorTextStyled, null, valueText),
            React.createElement(SelectboxAnchorCaretStyled, null, caretIcon)),
        children));
}));
