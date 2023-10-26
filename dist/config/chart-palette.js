import { DEFAULT_CHART_PALETTE_LIGHT } from './theme/chart-palette-light';
import { DEFAULT_CHART_PALETTE_DARK } from './theme/chart-palette-dark';
export const DEFAULT_CHART_PALETTE = {
    light: DEFAULT_CHART_PALETTE_LIGHT,
    dark: DEFAULT_CHART_PALETTE_DARK,
};
/**
 * Maps palette object to CSS variables string.
 * @param palette
 * @doc-tags styling
 */
export function mapPaletteToCssString(palette) {
    const css = Object.entries(palette).reduce((acc, [key, value]) => {
        return acc.concat(`--${key}: ${value}; `);
    }, '');
    return `body {${css}}`;
}
