import { observable } from 'fp-ts-rxjs';
import { pipe } from 'fp-ts/function';
import { distinctUntilChanged, map, switchMap, take, withLatestFrom } from 'rxjs/operators';
import { context } from '../../../context/context2';
import { filterMapOption } from '../../../utils/monad-functions';
export const keepSameTimestampRangeOnInstrumentEffect = context.combine(context.key()('chartDataViewModel'), context.key()('chart'), context.key()('timeFrameViewModel'), context.key()('chartConfiguratorViewModel'), context.key()('timeframePresetsViewModel'), (chartDataViewModel, chart, timeFrameVM, chartConfigVM, timeframePresetsViewModel) => pipe(filterMapOption(chartDataViewModel.instrument), observable.map(i => i.symbol), distinctUntilChanged(), 
// remember timestamp range and selected TimeframePreset before candles are set
withLatestFrom(timeFrameVM.timestampRange, timeframePresetsViewModel.selectedTimeframePreset), switchMap(([, timestampRange, selectedPreset]) => pipe(chartDataViewModel.historicalCandlesUpdated, take(1), map(() => [timestampRange, selectedPreset]))), map(([timestampRange, selectedPreset]) => {
    const configStrategy = chartConfigVM.state.getValue().settings.chartReact.timeframeChangeStrategy.instrument;
    if (selectedPreset === null) {
        if (configStrategy === 'smart') {
            chart.chartModel.setTimestampRange(...timestampRange);
            // value range for instruments can vary (for instance, AAPL and EUR/USD)
            // in order not to show empty chart we do auto scale
            chart.scale.doAutoScale(true);
        }
        else {
            chart.chartModel.doBasicScale();
        }
    }
    else {
        // if preset is selected, then reselect it
        timeframePresetsViewModel.selectPreset(selectedPreset);
    }
    return selectedPreset;
})));
