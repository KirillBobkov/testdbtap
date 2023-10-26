import { createContext } from 'react';
import { AGGREGATION_PERIOD_1_HOUR, InitialAggregationPeriods } from './model/aggregation.model';
import { DEFAULT_CHART_PALETTE_LIGHT } from '../config/theme/chart-palette-light';
import { DEFAULT_CHART_PALETTE_LIGHT_CSS } from '../config/theme/palette_light_css';
import { DEFAULT_CHART_PALETTE_DARK } from '../config/theme/chart-palette-dark';
import { DEFAULT_CHART_PALETTE_DARK_CSS } from '../config/theme/palette_dark_css';
import { defaultChartTypes } from './model/chart.model';
/**
 * Default chart types config.
 * @doc-tags chart-react,default-config
 */
export const DEFAULT_CHART_TYPES_CONFIG = {
    initialChartType: 'candle',
    listOfChartTypes: defaultChartTypes,
};
/**
 * Default aggregation period.
 * @doc-tags chart-react,default-config
 */
export const DEFAULT_AGGREGATION_PERIOD = AGGREGATION_PERIOD_1_HOUR;
/**
 * Default list of aggregation periods. Will be applied if no user data provided.
 * @doc-tags chart-react,default-config
 */
export const DEFAULT_AGGREGATION_PERIODS_LIST = InitialAggregationPeriods;
/**
 * Default chart react palette object.
 * @doc-tags chart-react,default-config
 */
export const DEFAULT_PALETTE = {
    light: {
        object: DEFAULT_CHART_PALETTE_LIGHT,
        css: DEFAULT_CHART_PALETTE_LIGHT_CSS,
    },
    dark: {
        object: DEFAULT_CHART_PALETTE_DARK,
        css: DEFAULT_CHART_PALETTE_DARK_CSS,
    },
};
/**
 * Default theme.
 * @doc-tags chart-react,default-config
 */
export const DEFAULT_THEME = 'dark';
// @ts-ignore
export const ChartReactAppContext = createContext({});
