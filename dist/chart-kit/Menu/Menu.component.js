import React, { useMemo } from 'react';
import { MenuStyled } from './Menu.styled';
import { namedMemoRef } from '../../utils/named-memo';
import { useSyncedRef } from '../utils/react/use-synced-ref';
import { useA11yListboxArrowsFocusController } from '../accessibility/use-a11y-listbox-arrows-focus-controller';
// ID for any menu in chart-react, used in a11y for aria-controls linking
// TODO ID is currently non-unique, but it should be
export const MENU_ID = 'menu_id';
export const Menu = namedMemoRef('Menu', (props, ref) => {
    const { children, onItemSelect, onTouchStart, className, style, testId, ariaLabel, navigateWithArrows = true, } = props;
    const menuRef = useSyncedRef(ref);
    // handling the case of deleting/adding an element
    const childLength = useMemo(() => React.Children.count(children), [children]);
    // the hook sets all menu items except the first or active tabindexes to -1 so it's not possible to tabulate between them
    navigateWithArrows &&
        useA11yListboxArrowsFocusController({
            wrapperRef: menuRef,
            direction: 'vertical',
            deps: [childLength],
        });
    return (React.createElement(MenuStyled, { "aria-label": ariaLabel, "data-test-id": testId, role: "listbox", id: MENU_ID, className: className, style: style, ref: menuRef }, React.Children.map(children, child => {
        if (!React.isValidElement(child)) {
            return child;
        }
        return React.cloneElement(child, {
            onSelect: onItemSelect,
            onTouchStart,
        });
    })));
});
