import { DEFAULT_SETTINGS_TABS_WITH_ICON, removeSettingsTab } from '../../chart/ui-overrides/settings';
describe('component-overriding-context', () => {
    describe('removeSettingsTab', () => {
        it('should remove ChartTradingTab', () => {
            const result = removeSettingsTab(DEFAULT_SETTINGS_TABS_WITH_ICON, 'ChartTradingTab');
            const expected = [
                'ChartGeneralTab',
                'ChartLegendTab',
                'ChartScalesTab',
                'ChartMarketTab',
                'ChartColorsTab',
                'ChartEventsTab',
                'ChartPaddingsTab',
            ];
            expect(result).toEqual(expected);
        });
    });
});
