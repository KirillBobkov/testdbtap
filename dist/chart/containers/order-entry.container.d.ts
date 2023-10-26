/// <reference types="react" />
import { Localization } from '../../config/localization/localization';
import { OrderEntryViewModel } from '../view-models/trading/order-entry.view-model';
import { TradingViewModel } from '../view-models/trading/trading.view-model';
import { YAxisConfiguratorViewModel } from '../view-models/y-axis/y-axis-configurator.view-model';
export declare const OrderEntryContainer: import("../../context/context2").Context<Record<"orderEntryVM", OrderEntryViewModel> & Record<"tradingVM", TradingViewModel> & Record<"localization", Localization> & Record<"yAxisConfiguratorViewModel", YAxisConfiguratorViewModel>, import("react").FC<Record<string, any>>>;
