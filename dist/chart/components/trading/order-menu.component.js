import React, { memo } from 'react';
import { RCMenuPopover } from '../../../chart-kit/Popover/popover-menu-generic';
import { useUIOverrideComponent } from '../../ui-overrides';
export const OrderMenu = memo(props => {
    const { isOpened, position, onClose } = props;
    const content = useUIOverrideComponent(['rightClickMenus', 'orderMenu']) ?? React.createElement(React.Fragment, null);
    return (React.createElement(RCMenuPopover, { opened: isOpened, customPosition: position, onRequestClose: onClose }, content));
});