import React, { memo } from 'react';
import { RCMenuPopover } from '../../../chart-kit/Popover/popover-menu-generic';
import { useUIOverrideComponent } from '../../ui-overrides';
import { BackgroundMenuContent } from './background-menu-content.component';
export const BackgroundMenu = memo(props => {
    const { isOpened, position, onClose } = props;
    const content = useUIOverrideComponent(['rightClickMenus', 'backgroundMenu']) ?? (React.createElement(BackgroundMenuContent, { ...props }));
    return (React.createElement(RCMenuPopover, { opened: isOpened, customPosition: position, onRequestClose: onClose }, content));
});
