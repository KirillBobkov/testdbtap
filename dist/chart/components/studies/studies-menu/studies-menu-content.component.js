import React, { memo, useCallback } from 'react';
import { StudiesMenuGroup } from './studies-menu-group.component';
export const StudiesMenuContent = memo(props => {
    const { items, onClose } = props;
    const handleItemSelect = useCallback((value, groupIdx) => {
        const selectedItem = items[groupIdx].find(i => i.key === value);
        selectedItem && selectedItem.onItemSelect();
        onClose();
    }, [items]);
    return (React.createElement(React.Fragment, null, items.map((group, idx) => (React.createElement(StudiesMenuGroup, { onItemSelect: handleItemSelect, groupIdx: idx, items: group, showDivider: idx !== items.length - 1 })))));
});
