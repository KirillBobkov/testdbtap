import { ChartPaletteLight } from './chart-palette-light';
import { ChartPaletteDark } from './chart-palette-dark';
export interface ChartAppPalette {
    light: {
        css?: string;
        object: ChartPaletteLight;
    };
    dark: {
        css?: string;
        object: ChartPaletteDark;
    };
}
