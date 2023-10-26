import React, { memo } from 'react';
import { RCMenuPopover } from '../../../../chart-kit/Popover/popover-menu-generic';
import { useUIOverrideComponent } from '../../../ui-overrides';
import { StudiesMenuContent } from './studies-menu-content.component';
export const StudiesMenu = memo(props => {
    const { isOpened, position, onClose, items } = props;
    const content = useUIOverrideComponent(['rightClickMenus', 'studiesMenu']) ?? (React.createElement(StudiesMenuContent, { items: items, onClose: onClose }));
    return (React.createElement(RCMenuPopover, { opened: isOpened, customPosition: position, onRequestClose: onClose }, content));
});
