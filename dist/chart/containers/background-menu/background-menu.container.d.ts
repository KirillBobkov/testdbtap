/// <reference types="react" />
import { ChartConfiguratorViewModel } from '../../view-models/chart-configurator.view-model';
import { ChartReactConfig } from '../../../config/chart-react-config';
import { ThemeViewModel } from '../../view-models/theme.view-model';
import { ChartDrawingViewModel } from '../../view-models/drawings/drawing.view-model';
import { StudiesSettingsViewModel } from '../../view-models/studies/studies-settings.view-model';
import { NotificationViewModel } from '../../view-models/notification.view-model';
export declare const BackgroundMenuContainer: import("../../../context/context2").Context<Record<"chart", import("../../components/canvas-chart-renderer/chart-with-modules").ChartWithModules> & Record<"tradingVM", import("../../view-models/trading/trading.view-model").TradingViewModel> & Record<"tradingCoreVM", import("../../view-models/trading/trading-core.view-model").TradingCoreViewModel> & Record<"orderEntryVM", import("../../view-models/trading/order-entry.view-model").OrderEntryViewModel> & Record<"chartConfiguratorViewModel", ChartConfiguratorViewModel> & Record<"chartReactConfig", ChartReactConfig> & Record<"themeViewModel", ThemeViewModel> & Record<"drawingViewModel", ChartDrawingViewModel> & Record<"studiesSettingsViewModel", StudiesSettingsViewModel> & Record<"notificationVM", NotificationViewModel>, () => import("react").FunctionComponentElement<import("../../components/background-menu/background-menu.component").BackgroundMenuProps>>;
