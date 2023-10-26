import { TabTypeWithIcon } from '../components/chart-settings/chart-settings.model';
type OriginalTab = 'ChartGeneralTab' | 'ChartTradingTab' | 'ChartLegendTab' | 'ChartScalesTab' | 'ChartMarketTab' | 'ChartColorsTab' | 'ChartEventsTab' | 'ChartPaddingsTab';
export type TabDeclaration = TabTypeWithIcon | OriginalTab;
export declare const DEFAULT_SETTINGS_TABS_WITH_ICON: Array<TabDeclaration>;
export declare const addCustomSettingsTab: (customTabs: TabDeclaration[], index: number) => TabDeclaration[];
export declare const removeSettingsTab: (tabs: TabDeclaration[], tab: OriginalTab) => TabDeclaration[];
export declare const overrideDefaultTab: (customTabName: string, customDefaultTab: TabDeclaration) => TabDeclaration[];
export {};
