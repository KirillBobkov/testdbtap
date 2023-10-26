import { getDefaultConfig } from '@devexperts/dxcharts-lite/dist/chart/chart.config';
import { applyDrawingsConfig, } from '@dx-private/dxchart5-modules/dist/drawings/drawings.config';
import { applyEquivolumeConfig, } from '@dx-private/dxchart5-modules/dist/equivolume/EquivolumeConfig';
import { applyNewsConfig, } from '@dx-private/dxchart5-modules/dist/news/news.config';
import { applyStudiesComponentConfig, } from '@dx-private/dxchart5-modules/dist/studies/studies.config';
import { merge } from '@devexperts/dxcharts-lite/dist/chart/utils/merge.utils';
import { pipe } from 'fp-ts/function';
import { applyExecutedOrdersConfig, } from '@dx-private/dxchart5-modules/dist/executed-orders/executed-orders.config';
const getFullChartCoreConfigWithModules = () => pipe(getDefaultConfig(), applyDrawingsConfig, applyStudiesComponentConfig, applyEquivolumeConfig, applyNewsConfig, applyExecutedOrdersConfig, applyThemes);
const applyThemes = (config) => {
    return { ...config, themes: { dark: config.colors, light: config.colors } };
};
export const mergeFullChartConfig = (config, defaultConfig = getFullChartCoreConfigWithModules()) => {
    const fullConfig = merge(config, defaultConfig);
    delete fullConfig.colors;
    // eslint-disable-next-line no-restricted-syntax
    return fullConfig;
};
