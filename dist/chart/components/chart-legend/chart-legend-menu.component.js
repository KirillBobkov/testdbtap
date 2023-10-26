import React, { memo } from 'react';
import { useUIOverrideComponent } from '../../ui-overrides';
import { LegendsSettingsContent } from '../chart-settings/chart-settings-legend/chart-settings-legend.component';
import { RCMenuPopover } from '../../../chart-kit/Popover/popover-menu-generic';
export const LegendMenu = memo(props => {
    const { position, isOpened, onClose, onSettingsChange, chartCoreVolumesVisible, settings } = props;
    const content = useUIOverrideComponent(['rightClickMenus', 'legendMenu']) ?? (React.createElement(LegendsSettingsContent, { onSettingsChange: onSettingsChange, settings: settings, chartCoreVolumesVisible: chartCoreVolumesVisible }));
    return (React.createElement(RCMenuPopover, { opened: isOpened, onRequestClose: onClose, customPosition: position }, content));
});
