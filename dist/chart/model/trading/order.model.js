import { priceFormatter } from './trading.model';
export const defaultOrderPriceFormatter = v => priceFormatter(v);
const availableOrderEntryTypes = ['BuyLimitSellStop', 'SellLimitBuyStop', 'BuyMarketSellMarket'];
//#endregion
