import { merge } from '@devexperts/dxcharts-lite/dist/chart/utils/merge.utils';
import { cloneUnsafe } from '@devexperts/dxcharts-lite/dist/chart/utils/object.utils';
import { array } from 'fp-ts';
import { collect } from 'fp-ts/Record';
import { pipe } from 'fp-ts/function';
import { Ord } from 'fp-ts/string';
import React, { useContext } from 'react';
import { TEST_IDS } from '../../../config/e2e/test-ids';
import { context } from '../../../context/context2';
import { IconsOverridingContext } from '../../../utils/icons-overriding-context';
import { namedMemo } from '../../../utils/named-memo';
import { useDirectProperty, useProperty } from '../../../utils/use-property';
import { ChartSettingsComponent } from '../../components/chart-settings/chart-settings.component';
import { MultiChartComponentContext } from '../../components/multi-chart/multi-chart-context';
import { ChartReactAppContext } from '../../defaults';
import { useUIOverride } from '../../ui-overrides';
import { DEFAULT_SETTINGS_TABS_WITH_ICON } from '../../ui-overrides/settings';
const ChartSettingsGeneralContainer = context.lazy(() => import(/* webpackChunkName: "settings" */ './chart-settings-general/chart-settings-general.container'));
const ChartSettingsMarketContainer = context.lazy(() => import(/* webpackChunkName: "settings" */ './chart-settings-market/chart-settings-market.container'));
const ChartSettingsTradingContainer = context.lazy(() => import(/* webpackChunkName: "settings" */ './chart-settings-trading/chart-settings-trading.container'));
const ChartSettingsLegendContainer = context.lazy(() => import(/* webpackChunkName: "settings" */ './chart-settings-legend/chart-settings-legend.container'));
const ChartSettingsChartTypeColorsContainer = context.lazy(() => import(/* webpackChunkName: "settings" */ './chart-settings-colors/chart-settings-chart-type-colors.container'));
const ChartSettingsChartTypeScalesContainer = context.lazy(() => import(/* webpackChunkName: "settings" */ './chart-settings-scales/chart-settings-chart-type-scales.container'));
const ChartSettingsEventsContainer = context.lazy(() => import(/* webpackChunkName: "settings" */ './chart-settings-events/chart-settings-events.container'));
const ChartSettingsPaddingsContainer = context.lazy(() => import(/* webpackChunkName: "settings" */ './chart-settings-paddings/chart-settings-paddings.container'));
export const ChartSettingsContainer = context.combine(context.key()('chartConfiguratorViewModel'), context.key()('chartReactConfig'), ChartSettingsGeneralContainer, ChartSettingsMarketContainer, ChartSettingsTradingContainer, ChartSettingsLegendContainer, ChartSettingsChartTypeColorsContainer, ChartSettingsChartTypeScalesContainer, ChartSettingsEventsContainer, ChartSettingsPaddingsContainer, (chartConfiguratorViewModel, chartReactConfig, ChartSettingsGeneralContainer, ChartSettingsMarketContainer, ChartSettingsTradingContainer, ChartSettingsLegendContainer, ChartSettingsChartTypeColorsContainer, ChartSettingsChartTypeScalesContainer, ChartSettingsEventsContainer, ChartSettingsPaddingsContainer) => namedMemo('ChartSettingsContainer', () => {
    const ChartSettingsTabs = useUIOverride(['ChartSettingsTabs']) ?? DEFAULT_SETTINGS_TABS_WITH_ICON;
    const iconsConfig = useContext(IconsOverridingContext);
    const { localization } = useContext(MultiChartComponentContext);
    const { isMobile } = useContext(ChartReactAppContext);
    const settings = useDirectProperty(chartConfiguratorViewModel.state, ['settings']);
    const defaultSettingsConfig = chartConfiguratorViewModel.defaultConfig;
    const DEFAULT_TABS = {
        ChartGeneralTab: {
            id: 'General',
            label: localization.settingsPopup.tabs.general.title,
            content: () => ChartSettingsGeneralContainer,
            icon: iconsConfig.settings.general,
            testId: TEST_IDS.chart_settings_tab_general,
        },
        ChartTradingTab: {
            id: 'Trading',
            label: localization.settingsPopup.tabs.trading.title,
            content: () => ChartSettingsTradingContainer,
            icon: iconsConfig.chartTypes.candle,
        },
        ChartLegendTab: {
            id: 'Legend',
            label: localization.settingsPopup.tabs.legend.title,
            content: () => ChartSettingsLegendContainer,
            icon: iconsConfig.settings.legend,
            testId: TEST_IDS.chart_settings_tab_legend,
        },
        ChartScalesTab: {
            id: 'Scales',
            label: localization.settingsPopup.tabs.scales.title,
            content: () => ChartSettingsChartTypeScalesContainer,
            icon: iconsConfig.drawings.drawingsTypes.scale,
            testId: TEST_IDS.chart_settings_tab_scales,
        },
        ChartMarketTab: {
            id: 'Market',
            label: localization.settingsPopup.tabs.market.title,
            content: () => ChartSettingsMarketContainer,
            icon: iconsConfig.settings.market,
            testId: TEST_IDS.chart_settings_tab_market,
        },
        ChartColorsTab: {
            id: 'Colors',
            label: localization.settingsPopup.tabs.colors.title,
            content: () => ChartSettingsChartTypeColorsContainer,
            icon: iconsConfig.drawings.drawingsTypes.brush,
            testId: TEST_IDS.chart_settings_tab_colors,
        },
        ChartEventsTab: {
            id: 'Events',
            label: localization.settingsPopup.tabs.events.eventsTitle,
            content: () => ChartSettingsEventsContainer,
            icon: iconsConfig.settings.events,
        },
        ChartPaddingsTab: {
            id: 'Paddings',
            label: localization.settingsPopup.tabs.paddings.title,
            content: () => ChartSettingsPaddingsContainer,
            icon: iconsConfig.drawings.drawingsTypes.dateRange,
        },
    };
    const tabsDefaultConfig = pipe(DEFAULT_TABS, collect(Ord)((_, value) => value.id), ids => getTabsDefaultConfig(ids, settings, defaultSettingsConfig));
    const tradingEnabled = !chartReactConfig.trading.enabled || isMobile;
    const tabs = pipe(ChartSettingsTabs, array.map(renderItem => (typeof renderItem === 'object' ? renderItem : DEFAULT_TABS[renderItem])), 
    // hide Trading tab on mobile version
    array.filter(tab => (tradingEnabled ? tab !== DEFAULT_TABS.ChartTradingTab : true)));
    const settingsState = useProperty(chartConfiguratorViewModel.state);
    return (React.createElement(ChartSettingsComponent, { value: settings, onValueChange: chartConfiguratorViewModel.setSettingsByPath, tabsDefaultConfig: tabsDefaultConfig, tabs: tabs, isOpened: settingsState.isOpened, onPopoverToggle: chartConfiguratorViewModel.onToggle }));
}));
const getTabsDefaultConfig = (ids, settings, defaultSettingsConfig) => {
    const mergeOptions = { overrideExisting: true, addIfMissing: false };
    return ids.map(id => {
        switch (id) {
            case 'General':
                const generalTabDefaultConfig = merge(cloneUnsafe(settings), getGeneralTabDefaultConfig(defaultSettingsConfig), {
                    ...mergeOptions,
                });
                return { id, defaultConfig: generalTabDefaultConfig };
            case 'Market':
                const marketTabDefaultConfig = merge(cloneUnsafe(settings), getMarketTabDefaultConfig(defaultSettingsConfig), {
                    ...mergeOptions,
                });
                return { id, defaultConfig: marketTabDefaultConfig };
            case 'Trading':
                const tradingTabDefaultConfig = merge(cloneUnsafe(settings), getTradingTabDefaultConfig(defaultSettingsConfig), {
                    ...mergeOptions,
                });
                return { id, defaultConfig: tradingTabDefaultConfig };
            case 'Legend':
                const legendTabDefaultConfig = merge(cloneUnsafe(settings), getLegendTabDefaultConfig(defaultSettingsConfig), {
                    ...mergeOptions,
                });
                return { id, defaultConfig: legendTabDefaultConfig };
            case 'Colors':
                const colorsTabDefaultConfig = merge(cloneUnsafe(settings), getColorsTabDefaultConfig(defaultSettingsConfig), {
                    ...mergeOptions,
                });
                return { id, defaultConfig: colorsTabDefaultConfig };
            case 'Scales':
                const scaleTabDefaultConfig = merge(cloneUnsafe(settings), getScaleTabDefaultConfig(defaultSettingsConfig), {
                    ...mergeOptions,
                });
                return { id, defaultConfig: scaleTabDefaultConfig };
            case 'Events':
                const eventsTabDefaultConfig = merge(cloneUnsafe(settings), getEventsTabDefaultConfig(defaultSettingsConfig), {
                    ...mergeOptions,
                });
                return { id, defaultConfig: eventsTabDefaultConfig };
            case 'Paddings':
                const paddingsTabDefaultConfig = merge(cloneUnsafe(settings), getPaddingsTabDefaultConfig(defaultSettingsConfig), {
                    ...mergeOptions,
                });
                return { id, defaultConfig: paddingsTabDefaultConfig };
            default:
                return { id, defaultConfig: settings };
        }
    });
};
export const getGeneralTabDefaultConfig = (defaultSettingsConfig) => {
    return {
        chartCore: {
            components: {
                crossTool: {
                    type: defaultSettingsConfig.chartCore.components.crossTool.type,
                    magnetTarget: defaultSettingsConfig.chartCore.components.crossTool.magnetTarget,
                },
                grid: {
                    vertical: defaultSettingsConfig.chartCore.components.grid.vertical,
                    horizontal: defaultSettingsConfig.chartCore.components.grid.horizontal,
                },
                highLow: {
                    visible: defaultSettingsConfig.chartCore.components.highLow.visible,
                },
                chart: {
                    showWicks: defaultSettingsConfig.chartCore.components.chart.showWicks,
                    equivolume: {
                        showClosePrice: defaultSettingsConfig.chartCore.components.chart.equivolume.showClosePrice,
                    },
                },
                waterMark: {
                    visible: defaultSettingsConfig.chartCore.components.waterMark.visible,
                },
            },
        },
    };
};
const getMarketTabDefaultConfig = (defaultSettingsConfig) => {
    return {
        chartCore: {
            components: {
                volumes: {
                    visible: defaultSettingsConfig.chartCore.components.volumes.visible,
                    showSeparately: defaultSettingsConfig.chartCore.components.volumes.showSeparately,
                },
            },
        },
        chartReact: {
            extendedHours: {
                visible: defaultSettingsConfig.chartReact.extendedHours.visible,
            },
            sessionBreaks: {
                visible: defaultSettingsConfig.chartReact.sessionBreaks.visible,
            },
            candlesData: {
                candleAlignment: defaultSettingsConfig.chartReact.candlesData.candleAlignment,
                price: defaultSettingsConfig.chartReact.candlesData.price,
            },
        },
    };
};
const getTradingTabDefaultConfig = (defaultSettingsConfig) => {
    return {
        chartReact: {
            trading: {
                visible: defaultSettingsConfig.chartReact.trading.visible,
                showOrders: defaultSettingsConfig.chartReact.trading.showOrders,
                showPositions: defaultSettingsConfig.chartReact.trading.showPositions,
                bounds: {
                    min: defaultSettingsConfig.chartReact.trading.bounds.min,
                    max: defaultSettingsConfig.chartReact.trading.bounds.max,
                },
                executedOrders: {
                    enabled: defaultSettingsConfig.chartReact.trading.executedOrders.enabled,
                    displayMode: defaultSettingsConfig.chartReact.trading.executedOrders.displayMode,
                },
            },
        },
    };
};
const getLegendTabDefaultConfig = (defaultSettingsConfig) => {
    return {
        chartReact: {
            legend: {
                showInstrument: defaultSettingsConfig.chartReact.legend.showInstrument,
                showOHLC: defaultSettingsConfig.chartReact.legend.showOHLC,
                showPeriod: defaultSettingsConfig.chartReact.legend.showPeriod,
                showVolume: defaultSettingsConfig.chartReact.legend.showVolume,
            },
        },
    };
};
const getColorsTabDefaultConfig = (defaultSettingsConfig) => {
    // common colors only, chart type related colors are set in a corresponding container
    const getColorsTabDefaultThemeConfig = (theme) => ({
        chartAreaTheme: {
            backgroundColor: defaultSettingsConfig.chartCore.themes[theme].chartAreaTheme.backgroundColor,
            gridColor: defaultSettingsConfig.chartCore.themes[theme].chartAreaTheme.gridColor,
            backgroundGradientTopColor: defaultSettingsConfig.chartCore.themes[theme].chartAreaTheme.backgroundGradientTopColor,
            backgroundGradientBottomColor: defaultSettingsConfig.chartCore.themes[theme].chartAreaTheme.backgroundGradientBottomColor,
        },
        crossTool: {
            lineColor: defaultSettingsConfig.chartCore.themes[theme].crossTool.lineColor,
            labelBoxColor: defaultSettingsConfig.chartCore.themes[theme].crossTool.labelBoxColor,
            labelTextColor: defaultSettingsConfig.chartCore.themes[theme].crossTool.labelTextColor,
        },
        waterMarkTheme: {
            firstRowColor: defaultSettingsConfig.chartCore.themes[theme].waterMarkTheme.firstRowColor,
            secondRowColor: defaultSettingsConfig.chartCore.themes[theme].waterMarkTheme.secondRowColor,
            thirdRowColor: defaultSettingsConfig.chartCore.themes[theme].waterMarkTheme.thirdRowColor,
        },
        newsTheme: {
            backgroundColor: defaultSettingsConfig.chartCore.themes[theme].newsTheme.backgroundColor,
        },
        xAxis: {
            labelTextColor: defaultSettingsConfig.chartCore.themes[theme].xAxis.labelTextColor,
        },
        yAxis: {
            labelTextColor: defaultSettingsConfig.chartCore.themes[theme].yAxis.labelTextColor,
        },
    });
    return {
        chartCore: {
            themes: {
                dark: { ...getColorsTabDefaultThemeConfig('dark') },
                light: { ...getColorsTabDefaultThemeConfig('light') },
            },
        },
    };
};
const getScaleTabDefaultConfig = (defaultSettingsConfig) => {
    return {
        chartCore: {
            scale: {
                auto: defaultSettingsConfig.chartCore.scale.auto,
                inverse: defaultSettingsConfig.chartCore.scale.inverse,
                lockPriceToBarRatio: defaultSettingsConfig.chartCore.scale.lockPriceToBarRatio,
            },
            components: {
                yAxis: {
                    type: defaultSettingsConfig.chartCore.components.yAxis.type,
                    align: defaultSettingsConfig.chartCore.components.yAxis.align,
                    labels: {
                        descriptions: defaultSettingsConfig.chartCore.components.yAxis.labels.descriptions,
                        settings: {
                            lastPrice: {
                                mode: defaultSettingsConfig.chartCore.components.yAxis.labels.settings.lastPrice.mode,
                            },
                            countdownToBarClose: {
                                mode: defaultSettingsConfig.chartCore.components.yAxis.labels.settings
                                    .countdownToBarClose.mode,
                            },
                            ...(defaultSettingsConfig.chartCore.components.yAxis.labels.settings.highLow && {
                                highLow: {
                                    mode: defaultSettingsConfig.chartCore.components.yAxis.labels.settings.highLow.mode,
                                },
                            }),
                            ...(defaultSettingsConfig.chartCore.components.yAxis.labels.settings.prevDayClose && {
                                prevDayClose: {
                                    mode: defaultSettingsConfig.chartCore.components.yAxis.labels.settings.prevDayClose
                                        .mode,
                                },
                            }),
                            ...(defaultSettingsConfig.chartCore.components.yAxis.labels.settings.prePostMarket && {
                                prePostMarket: {
                                    mode: defaultSettingsConfig.chartCore.components.yAxis.labels.settings.prePostMarket
                                        .mode,
                                },
                            }),
                            ...(defaultSettingsConfig.chartCore.components.yAxis.labels.settings.bidAsk && {
                                bidAsk: {
                                    mode: defaultSettingsConfig.chartCore.components.yAxis.labels.settings.bidAsk.mode,
                                },
                            }),
                            ...(defaultSettingsConfig.chartCore.components.yAxis.labels.settings.studies && {
                                studies: {
                                    mode: defaultSettingsConfig.chartCore.components.yAxis.labels.settings.studies.mode,
                                },
                            }),
                        },
                    },
                },
            },
        },
        chartReact: {
            scale: {
                fit: {
                    studies: defaultSettingsConfig.chartReact.scale.fit.studies,
                    positions: defaultSettingsConfig.chartReact.scale.fit.positions,
                    orders: defaultSettingsConfig.chartReact.scale.fit.orders,
                },
            },
        },
    };
};
const getEventsTabDefaultConfig = (defaultSettingsConfig) => {
    return {
        chartCore: {
            components: {
                events: {
                    visible: defaultSettingsConfig.chartCore.components.events.visible,
                    eventsVisibility: {
                        dividends: defaultSettingsConfig.chartCore.components.events.eventsVisibility.dividends,
                        earnings: defaultSettingsConfig.chartCore.components.events.eventsVisibility.earnings,
                        splits: defaultSettingsConfig.chartCore.components.events.eventsVisibility.splits,
                        'conference-calls': defaultSettingsConfig.chartCore.components.events.eventsVisibility['conference-calls'],
                    },
                },
                news: {
                    visible: defaultSettingsConfig.chartCore.components.news.visible,
                },
            },
        },
    };
};
const getPaddingsTabDefaultConfig = (defaultSettingsConfig) => {
    return {
        chartCore: {
            components: {
                offsets: {
                    top: defaultSettingsConfig.chartCore.components.offsets.top,
                    bottom: defaultSettingsConfig.chartCore.components.offsets.bottom,
                    right: defaultSettingsConfig.chartCore.components.offsets.right,
                    left: defaultSettingsConfig.chartCore.components.offsets.left,
                    visible: defaultSettingsConfig.chartCore.components.offsets.visible,
                },
            },
        },
    };
};
