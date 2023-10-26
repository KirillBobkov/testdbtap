import { priceFormatter } from './trading.model';
export const defaultPositionPLFormatter = (v, currency) => {
    const positive = v > 0;
    const pl = Math.abs(v);
    return `${positive ? '+' : '−'}${priceFormatter(pl)} ${currency}`;
};
//#endregion
