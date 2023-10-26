import { createElement } from 'react';
import { context } from '../../context/context2';
import { namedMemo } from '../../utils/named-memo';
import { useObservable } from '../../utils/react.utils';
import { useProperty } from '../../utils/use-property';
import { TimeframePresets } from '../components/chart-timeframe-presets/timeframe-presets.component';
import { pipe } from 'fp-ts/function';
export const TimeframePresetsContainer = context.combine(context.key()('timeframePresetsViewModel'), context.key()('chartReactConfig'), (timeframePresetsViewModel, chartReactConfig) => namedMemo('TimeframePresetsContainer', () => {
    const selectedTimeframePreset = useProperty(timeframePresetsViewModel.selectedTimeframePreset);
    const selectedTimeframePeriod = useProperty(timeframePresetsViewModel.selectedTimeframePeriod);
    const selectedCustomTimeframe = useProperty(timeframePresetsViewModel.selectedCustomTimeframe);
    const periods = useProperty(timeframePresetsViewModel.timeframePeriods);
    const timeframes = useObservable(timeframePresetsViewModel.customTimeframes, []);
    const presets = useProperty(timeframePresetsViewModel.presets);
    const saveAndSelectCustomPeriodTimeframe = (aggregation, _timeframe) => pipe(timeframePresetsViewModel.saveCustomPeriodTimeframe(aggregation, _timeframe), timeframePresetsViewModel.selectPreset);
    return chartReactConfig.timeframePresets.mode === 'none'
        ? null
        : createElement(TimeframePresets, {
            onSelect: timeframePresetsViewModel.selectPreset,
            periods,
            selectedTimeframePeriod,
            onPeriodChange: timeframePresetsViewModel.changeSelectedTimeframePeriod,
            timeframes,
            selectedCustomTimeframe,
            onTimeframeChange: timeframePresetsViewModel.changeSelectedCustomTimeframe,
            saveCustomPeriodTimeframe: saveAndSelectCustomPeriodTimeframe,
            presets,
            onDeletePreset: timeframePresetsViewModel.deletePreset,
            selectedTimeframePreset,
        });
}));
