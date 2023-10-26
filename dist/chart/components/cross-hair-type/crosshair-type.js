import React, { memo, useCallback } from 'react';
import { CrosshairTypeDropdown } from './crosshair-type-dropdown.component';
import { Lens } from 'monocle-ts';
import { mapChartSettingsToType, mapTypeToChartSettings, } from './crosshair-type.model';
export const CrosshairType = memo((props) => {
    const { value, onValueChange, className } = props;
    const crossToolType = Lens.fromPath()(['chartCore', 'components', 'crossTool', 'type']).get(value);
    const createHandler = useCallback(lens => b => onValueChange(lens.set(b)(value), false), [onValueChange, value]);
    const changeCrossTool = useCallback(createHandler(Lens.fromPath()(['chartCore', 'components', 'crossTool'])), [createHandler]);
    const handleSelectType = useCallback((type) => {
        const visible = mapTypeToChartSettings(type);
        const newSettings = {
            ...Lens.fromPath()(['chartCore', 'components', 'crossTool']).get(value),
            visible,
        };
        changeCrossTool(newSettings);
    }, [changeCrossTool, value]);
    return (React.createElement(CrosshairTypeDropdown, { className: className, selectedType: mapChartSettingsToType(crossToolType), onTypeSelect: handleSelectType }));
});
