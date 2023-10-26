import React, { memo, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { IconsOverridingContext } from '../../../utils/icons-overriding-context';
import { ToolbarButtonStyled } from '../chart-toolbar/chart-toolbar-button-with-tooltip.styled';
import { checkForPresetsIsOverflowMaxSize } from '../../view-models/timeframe-presets.view-model';
import { TimeframePresetItemDancing } from './timeframe-preset-dancing/timeframe-preset-dancing.component';
import { TimeframePresetItem } from './timeframe-preset/timeframe-preset.component';
import { EditButtonActiveIconWrapper, EditButtonIconWrapper, TimeframePresetsContainer, TimeframeScrollableContainer, } from './timeframe-presets.styled';
import { TimeframeAggregationSelectorComponent } from './timeframe-and-aggregation-selector/timeframe-and-aggregation-selector.component';
import { useA11yListboxArrowsFocusController } from '../../../chart-kit/accessibility/use-a11y-listbox-arrows-focus-controller';
import { MultiChartComponentContext } from '../multi-chart/multi-chart-context';
import { ChartReactAppContext } from '../../defaults';
export const TimeframePresets = memo((props) => {
    const { onSelect, periods, timeframes, onPeriodChange, selectedTimeframePeriod, onTimeframeChange, selectedCustomTimeframe, saveCustomPeriodTimeframe, presets, onDeletePreset, selectedTimeframePreset, } = props;
    const { config: chartReactConfig } = useContext(ChartReactAppContext);
    const iconsConfig = useContext(IconsOverridingContext);
    const { localization } = useContext(MultiChartComponentContext);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const editPresetsHandler = useCallback(() => {
        setIsEditing(!isEditing);
        setIsAdding(false);
    }, [isEditing]);
    const containerRef = useRef(null);
    const anchorRef = useRef(null);
    useA11yListboxArrowsFocusController({
        wrapperRef: containerRef,
        childrenSelector: 'button',
        direction: 'horizontal',
        autoFocus: true,
        deps: [isEditing, presets],
        anchorRef,
    });
    const highlightedPreset = useMemo(() => presets.find(p => p === selectedTimeframePreset), [selectedTimeframePreset, presets]);
    const addMorePresets = (React.createElement(TimeframeAggregationSelectorComponent, { isOpened: isAdding, onOpenedChange: setIsAdding, periods: periods, timeframes: timeframes, onPeriodChange: onPeriodChange, selectedCustomPeriod: selectedTimeframePeriod, selectedCustomTimeframe: selectedCustomTimeframe, onTimeframeChange: onTimeframeChange, saveCustomPeriodTimeframe: saveCustomPeriodTimeframe }));
    const finishEditPresetsBtn = (React.createElement(ToolbarButtonStyled, { "aria-label": localization.timeframePresets.a11y_toggle_edit, ref: anchorRef, icon: React.createElement(EditButtonActiveIconWrapper, null, iconsConfig.layout.tick), onClick: editPresetsHandler }));
    const editPresetsBtn = presets.length > 1 && (React.createElement(ToolbarButtonStyled, { "aria-label": localization.timeframePresets.a11y_toggle_edit, ref: anchorRef, icon: React.createElement(EditButtonIconWrapper, null, iconsConfig.layout.edit), onClick: editPresetsHandler }));
    const editOrFinishEditingPresets = isEditing ? finishEditPresetsBtn : editPresetsBtn;
    const timeframePresetFull = (React.createElement(React.Fragment, null,
        !isEditing && !checkForPresetsIsOverflowMaxSize(presets) && addMorePresets,
        !isAdding && editOrFinishEditingPresets));
    return (React.createElement(TimeframeScrollableContainer, { visible: false },
        React.createElement(TimeframePresetsContainer, { "aria-label": localization.timeframePresets.a11y_presets_list, ref: containerRef }, isEditing
            ? presets
                // don't show the last preset, which should always be an "All" preset to prevent removing it
                .slice(0, -1)
                .map(preset => (React.createElement(TimeframePresetItemDancing, { key: `${preset.aggregation.duration}${preset.aggregation.durationType}${preset.timeframe.label}`, onDeletePreset: onDeletePreset, preset: preset })))
            : presets.map(preset => (React.createElement(TimeframePresetItem, { isSelected: preset === highlightedPreset, onSelect: onSelect, preset: preset, key: `${preset.aggregation.duration}
									${preset.aggregation.durationType}
									${preset.timeframe.label}` }, preset.timeframe.label)))),
        chartReactConfig.timeframePresets.mode === 'full' && timeframePresetFull));
});
