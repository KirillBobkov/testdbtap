import { newSink } from '../../context/sink2';
import { merge } from 'rxjs';
import { context } from '../../context/context2';
import { finalize, tap } from 'rxjs/operators';
import { Lens } from 'monocle-ts';
import { createPropertyAdapter } from '../../utils/property.utils';
import { pipe } from 'fp-ts/function';
import { callTracerProxy } from '../../utils/debug/call-tracer';
import { mapPalette2ChartColors } from '../../config/chart-config';
import { merge as mergeObj } from '@devexperts/dxcharts-lite/dist/chart/utils/merge.utils';
import { cloneUnsafe } from '@devexperts/dxcharts-lite/dist/chart/utils/object.utils';
export const chartSettingsThemes = Lens.fromPath()(['chartCore', 'themes']);
export const createThemeViewModel = context.combine(context.key()('multiChartViewModel'), context.key()('palette'), context.key()('layoutViewModel'), (multiChartViewModel, palette, layoutVM) => {
    const [setActiveTheme, activeTheme] = createPropertyAdapter(layoutVM.selectedLayout.getValue().global.theme);
    const themeChangedSubscribers = new Set();
    const switchThemeStyle = (theme) => {
        const themes = document.querySelectorAll('[data-type="chameleon"]');
        themes.forEach(theme => theme.setAttribute('media', 'none'));
        const currentTheme = document.querySelector(`[data-id=${theme}]`);
        if (currentTheme) {
            currentTheme.removeAttribute('media');
        }
    };
    const setTheme = (theme, userColors) => {
        switchThemeStyle(theme);
        setActiveTheme(theme);
        multiChartViewModel.setTheme(theme);
        let themeColors = mapPalette2ChartColors(palette[theme].object);
        multiChartViewModel.state.getValue().charts.forEach((chart, idx) => {
            if (userColors) {
                themeColors = mergeObj(cloneUnsafe(themeColors), userColors[idx], {
                    overrideExisting: true,
                    addIfMissing: true,
                });
            }
            updateChartColors(chart, themeColors, theme);
        });
    };
    const updateChartColors = (chart, colors, theme) => {
        const currentValue = chart.chartSettings.chartCore.themes;
        const newValue = {
            ...currentValue,
            [theme]: colors,
        };
        multiChartViewModel.setGeneralSettings(chartSettingsThemes.set(newValue)(chart.chartSettings));
        multiChartViewModel.updateLocalChartInfo(chart.id, {
            chartSettings: chartSettingsThemes.set(newValue)(chart.chartSettings),
        });
    };
    // initial theme setup
    processPaletteCss(palette);
    const colorsFromLayout = layoutVM.selectedLayout
        .getValue()
        .charts.map(c => c.chartCoreConfig.themes);
    setTheme(layoutVM.selectedLayout.getValue().global.theme, colorsFromLayout.map(lc => lc[layoutVM.selectedLayout.getValue().global.theme]));
    const onThemeChanged = (cb) => {
        themeChangedSubscribers.add(cb);
        return () => themeChangedSubscribers.delete(cb);
    };
    const changeTheme = (theme) => {
        const themeColors = multiChartViewModel
            .getAllCharts()
            .map(chart => chart.chartSettings.chartCore.themes[theme]);
        setTheme(theme, themeColors);
    };
    const onRestoreDefaultTheme = (defaultTypeConfig) => {
        const theme = activeTheme.getValue();
        const restoredColors = multiChartViewModel.getAllCharts().map(chart => {
            if (chart.id !== multiChartViewModel.selectedChartId.getValue()) {
                return chart.chartSettings.chartCore.themes[theme];
            }
            return defaultTypeConfig;
        });
        setTheme(theme, restoredColors);
    };
    //#region effects
    const notifyThemeChangedEffect = pipe(activeTheme, tap(theme => themeChangedSubscribers.forEach(cb => cb(theme))), finalize(() => themeChangedSubscribers.clear()));
    //#endregion
    const effects = merge(notifyThemeChangedEffect);
    return newSink(callTracerProxy('themeViewModel', {
        changeTheme,
        activeTheme,
        onThemeChanged,
        onRestoreDefaultTheme,
    }), effects);
});
/**
 * Takes palette from chart color variables library.
 * Overrides the palette.css in <head>. Disabled the default one.
 * @param palette
 * @doc-tags styling,chart-react,design-system
 */
export function processPaletteCss(palette) {
    const themes = document.querySelectorAll('[data-type="chameleon"]');
    // remove if styles already exist in document head, because host app can mount and unmount chart multiple times
    themes.forEach(t => t.remove());
    Object.keys(palette).forEach(theme => {
        const { css } = palette[theme];
        if (css) {
            const paletteStyleElement = document.createElement('style');
            // eslint-disable-next-line no-restricted-syntax
            const existingPaletteStyleTag = document.head.querySelector('style[data-type=chameleon]');
            if (existingPaletteStyleTag) {
                existingPaletteStyleTag.media = 'none';
            }
            // TODO rework to default
            if (theme === 'light') {
                paletteStyleElement.media = 'none';
            }
            paletteStyleElement.dataset.type = 'chameleon';
            paletteStyleElement.dataset.id = theme;
            paletteStyleElement.innerHTML = css;
            document.head.appendChild(paletteStyleElement);
        }
    });
}
