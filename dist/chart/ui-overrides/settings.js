export const DEFAULT_SETTINGS_TABS_WITH_ICON = [
    'ChartGeneralTab',
    'ChartTradingTab',
    'ChartLegendTab',
    'ChartScalesTab',
    'ChartMarketTab',
    'ChartColorsTab',
    'ChartEventsTab',
    'ChartPaddingsTab',
];
export const addCustomSettingsTab = (customTabs, index) => {
    const tabsCopy = DEFAULT_SETTINGS_TABS_WITH_ICON.slice();
    let position = index;
    if (position > tabsCopy.length || position < 0) {
        position = tabsCopy.length;
    }
    tabsCopy.splice(position, 0, ...customTabs);
    return tabsCopy;
};
export const removeSettingsTab = (tabs, tab) => {
    const tabsCopy = tabs.slice();
    return tabsCopy.filter(item => item !== tab);
};
export const overrideDefaultTab = (customTabName, customDefaultTab) => {
    return DEFAULT_SETTINGS_TABS_WITH_ICON.map(title => (title === customTabName ? customDefaultTab : title));
};
