import { createMockChartSettings } from '../mock/chart.model.mock';
import { chartSettingsPriceAxisFit, chartSettingsAutoScalePriceAxis, setChartSettingsAutoScalePriceAxisToFalseIfNoFitSelected, resetChartSettingsPriceAxisFitToDefaultIfAutoScale, setChartSettingsAutoScalePriceAxisToTrueIfFitSelected, } from '../chart.model';
import { pipe } from 'fp-ts/function';
describe('chart.model', () => {
    const fit = {
        orders: true,
        positions: false,
        studies: false,
    };
    const noFit = {
        orders: false,
        positions: false,
        studies: false,
    };
    const autoScaleFit = pipe(createMockChartSettings(), chartSettingsAutoScalePriceAxis.set(true), chartSettingsPriceAxisFit.set(fit));
    const autoScaleNoFit = pipe(createMockChartSettings(), chartSettingsAutoScalePriceAxis.set(true), chartSettingsPriceAxisFit.set(noFit));
    const noAutoScaleNoFit = pipe(createMockChartSettings(), chartSettingsAutoScalePriceAxis.set(false), chartSettingsPriceAxisFit.set(noFit));
    const noAutoScaleFit = pipe(createMockChartSettings(), chartSettingsAutoScalePriceAxis.set(false), chartSettingsPriceAxisFit.set(fit));
    describe('setChartSettingsAutoScalePriceAxisToFalseIfNoFitSelected', () => {
        it('set AutoScalePriceAxis to `false` if PriceAxisFit have changed and now all are `false`', () => {
            const resultAutoScale = pipe(setChartSettingsAutoScalePriceAxisToFalseIfNoFitSelected(autoScaleFit)(autoScaleNoFit), chartSettingsAutoScalePriceAxis.get);
            expect(resultAutoScale).toBe(false);
        });
        it('do nothing if AutoScalePriceAxis is already `false`', () => {
            const resultSettings = setChartSettingsAutoScalePriceAxisToFalseIfNoFitSelected(autoScaleFit)(noAutoScaleFit);
            expect(resultSettings).toBe(noAutoScaleFit);
        });
        it('do nothing if all PriceAxisFit not changed to all `false`', () => {
            const resultSettings = setChartSettingsAutoScalePriceAxisToFalseIfNoFitSelected(autoScaleNoFit)(autoScaleNoFit);
            expect(resultSettings).toBe(autoScaleNoFit);
        });
    });
    describe('setChartSettingsAutoScalePriceAxisToTrueIfFitSelected', () => {
        it('set AutoScalePriceAxis to `true` if not already `true` and some PriceAxisFit changed to `true`', () => {
            const resultAutoScale = pipe(setChartSettingsAutoScalePriceAxisToTrueIfFitSelected(noAutoScaleNoFit)(noAutoScaleFit), chartSettingsAutoScalePriceAxis.get);
            expect(resultAutoScale).toBe(true);
        });
        it('do nothing if AutoScalePriceAxis is already `true`', () => {
            const resultSettings = setChartSettingsAutoScalePriceAxisToTrueIfFitSelected(noAutoScaleFit)(autoScaleFit);
            expect(resultSettings).toBe(autoScaleFit);
        });
        it('do nothing if some PriceAxisFit was already `true`', () => {
            const resultSettings = setChartSettingsAutoScalePriceAxisToTrueIfFitSelected(noAutoScaleFit)(noAutoScaleFit);
            expect(resultSettings).toBe(noAutoScaleFit);
        });
    });
    describe('resetChartSettingsPriceAxisFitToDefaultIfAutoScale', () => {
        it("do nothing if AutoScalePriceAxis didn't changed to `true`", () => {
            const resultSettings = resetChartSettingsPriceAxisFitToDefaultIfAutoScale(autoScaleNoFit)(autoScaleNoFit);
            expect(resultSettings).toBe(autoScaleNoFit);
        });
        it('do nothing if some PriceAxisFit is `true`', () => {
            const resultSettings = resetChartSettingsPriceAxisFitToDefaultIfAutoScale(noAutoScaleNoFit)(autoScaleFit);
            expect(resultSettings).toBe(autoScaleFit);
        });
    });
});
