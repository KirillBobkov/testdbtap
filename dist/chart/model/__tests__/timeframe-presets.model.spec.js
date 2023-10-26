import { day, week, month, year, serializeTimeframePreset, timeframePresetArrayEq, parseTimeframePresetFromString, } from '../timeframe-presets.model';
import * as S from 'fp-ts/string';
import { getEq } from 'fp-ts/Array';
import { option, array } from 'fp-ts';
import { flow, pipe } from 'fp-ts/function';
describe('timeframe-presets.model', () => {
    const timeframePresetsFixture = [
        {
            timeframe: { label: '1D', value: day },
            aggregation: {
                duration: 1,
                durationType: 'm',
            },
        },
        {
            timeframe: { label: '1W', value: week },
            aggregation: {
                duration: 5,
                durationType: 'm',
            },
        },
        {
            timeframe: { label: '1M', value: month },
            aggregation: {
                duration: 30,
                durationType: 'm',
            },
        },
        {
            timeframe: { label: '1Y', value: year },
            aggregation: {
                duration: 1,
                durationType: 'd',
            },
        },
    ];
    const serializedTimeframePresetsFixture = ['1D-1m', '1W-5m', '1M-30m', '1Y-1d'];
    const E = getEq(S.Eq);
    it('Timeframe Presets compare equality function works correct', () => {
        const isEqual = timeframePresetArrayEq.equals(timeframePresetsFixture, timeframePresetsFixture);
        expect(isEqual).toBe(true);
    });
    it('Timeframe Presets serialize function works correct', () => {
        const serializedTimeframePresets = timeframePresetsFixture.map(serializeTimeframePreset);
        const isEqual = E.equals(serializedTimeframePresets, serializedTimeframePresetsFixture);
        expect(isEqual).toBe(true);
    });
    it('Timeframe Presets deserialize function works correct', () => {
        const parsedTimeframePresets = pipe(option.some(serializedTimeframePresetsFixture), option.fold(() => [], flow(array.filterMap(parseTimeframePresetFromString))));
        const isEqual = timeframePresetArrayEq.equals(parsedTimeframePresets, timeframePresetsFixture);
        expect(isEqual).toBe(true);
    });
});
