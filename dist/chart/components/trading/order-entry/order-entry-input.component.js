import React, { memo, useCallback, useEffect, useState } from 'react';
import { OrderEntryInputContainerStyled, OrderEntryQuantityInputStyled, CounterSymbol, OrderQuantityComponentStyled, OrderEntryLeftBuy, OrderEntryLeftSell, OrderEntryRightBuy, OrderEntryRightSell, } from './order-entry-input.styled';
import { getTextWidth } from '../../../../utils/script-title.utils';
import { MAIN_FONT } from '@devexperts/dxcharts-lite/dist/chart/chart.config';
const PLACEHOLDER = '0';
export const OrderEntryInput = memo(props => {
    const { type, disabled, quantity, quantityPrecision, quantityStep, maxQuantity, onQuantityChange, createOrder, className, tradingDict, } = props;
    // we need state to control value inside component, because there is a case when user type "100.",
    // and this value should be visible for user, but VM stores 100
    const [inputValue, setInputValue] = useState('');
    // if quanity is undefined, set input empty
    useEffect(() => setInputValue(quantity === undefined ? '' : String(quantity)), [quantity]);
    const validateStringOE = useCallback((value, limit) => {
        if (limit < Number(value)) {
            return false;
        }
        if (buildOrderEntryRegexp(quantityPrecision).test(value)) {
            return true;
        }
        return value === '' || value === '0';
    }, [quantityPrecision]);
    const quantityChangeHandler = useCallback((newQuantity) => {
        if (validateStringOE(newQuantity, maxQuantity)) {
            setInputValue(newQuantity);
            // if input is empty, set null for quantity
            onQuantityChange(newQuantity === '' ? undefined : Number(newQuantity));
        }
    }, [onQuantityChange, maxQuantity, validateStringOE]);
    // adjust input value if precision is changed by chart-react-api
    const inputValueWithPrecision = quantity !== undefined && getDecimalRest(quantity)?.length > quantityPrecision
        ? `${quantity.toFixed(quantityPrecision)}`
        : inputValue;
    const minusClick = useCallback(() => quantityChangeHandler(sumDecimalNumbers(Number(inputValueWithPrecision), -quantityStep)), [inputValueWithPrecision, quantityChangeHandler, quantityStep, quantityPrecision]);
    const plusClick = useCallback(() => quantityChangeHandler(sumDecimalNumbers(Number(inputValueWithPrecision), quantityStep)), [inputValueWithPrecision, quantityChangeHandler, quantityStep, quantityPrecision]);
    const onBuyLimit = useCallback(() => createOrder('limit', 'buy'), []);
    const onSellLimit = useCallback(() => createOrder('limit', 'sell'), []);
    const onBuyStop = useCallback(() => createOrder('stop', 'buy'), []);
    const onSellStop = useCallback(() => createOrder('stop', 'sell'), []);
    const onBuyMarket = useCallback(() => createOrder('market', 'buy'), []);
    const onSellMarket = useCallback(() => createOrder('market', 'sell'), []);
    const FONT = `12px ${MAIN_FONT}`;
    const quantityWidth = getTextWidth(inputValueWithPrecision || PLACEHOLDER, FONT);
    return (React.createElement(OrderEntryInputContainerStyled, { className: className },
        type === 'BuyLimitSellStop' && (React.createElement(OrderEntryLeftBuy, { disabled: disabled, onClick: onBuyLimit }, tradingDict.orderEntry.buyLimitBtn)),
        type === 'SellLimitBuyStop' && (React.createElement(OrderEntryLeftSell, { disabled: disabled, onClick: onSellLimit }, tradingDict.orderEntry.sellLimitBtn)),
        type === 'BuyMarketSellMarket' && (React.createElement(OrderEntryLeftBuy, { disabled: disabled, onClick: onBuyMarket }, tradingDict.orderEntry.buyBtn)),
        React.createElement(OrderQuantityComponentStyled, null,
            React.createElement(CounterSymbol, { onClick: minusClick }, "\u2212"),
            React.createElement("div", { style: { width: quantityWidth } },
                React.createElement(OrderEntryQuantityInputStyled, { placeholder: PLACEHOLDER, type: "text", value: inputValueWithPrecision, onValueChange: quantityChangeHandler })),
            React.createElement(CounterSymbol, { onClick: plusClick }, "+")),
        type === 'SellLimitBuyStop' && (React.createElement(OrderEntryRightBuy, { disabled: disabled, onClick: onBuyStop }, tradingDict.orderEntry.buyStopBtn)),
        type === 'BuyLimitSellStop' && (React.createElement(OrderEntryRightSell, { disabled: disabled, onClick: onSellStop }, tradingDict.orderEntry.sellStopBtn)),
        type === 'BuyMarketSellMarket' && (React.createElement(OrderEntryRightSell, { disabled: disabled, onClick: onSellMarket }, tradingDict.orderEntry.sellBtn))));
});
const buildOrderEntryRegexp = (precision) => {
    const integerOnly = precision === 0;
    // pattern for rest part .12345
    const zeroDecimalRest = `\\.[0-9]{0,${precision}}$`;
    const aboveZeroDecimalRest = `\\.?[0-9]{0,${precision}}$`;
    // pattern for 0...1 numbers
    const zeroPattern = `^[0]${integerOnly ? '$' : zeroDecimalRest}`;
    // pattern for numbers above 1
    const aboveZeroPattern = `^[1-9][0-9]*${integerOnly ? '$' : aboveZeroDecimalRest}`;
    return new RegExp(`(${aboveZeroPattern})|(${zeroPattern})`);
};
/**
 * Why do not just sum a + b? because we need to avoid case below:
 * 2 + 0.1 = 2.100000000000001
 */
export const sumDecimalNumbers = (a, b) => {
    const [intA, restA, restALength] = getNumberParams(a);
    const [intB, restB, restBLength] = getNumberParams(b);
    const maxRestLength = Math.max(restALength, restBLength);
    const intAB = intA + intB;
    const restAB = restA + restB;
    return (intAB + restAB).toFixed(maxRestLength);
};
export const getDecimalRest = (value) => value.toString().split('.')[1] || '';
/**
 * Return config of number.
 * Example: 4.005
 * [
 * 	int - integer part of number (4);
 * 	rest - decimal part of number (0.005);
 * 	restLength - length of decimal part (3);
 * ]
 */
const getNumberParams = (n) => {
    const int = Math.trunc(n);
    const rest = getDecimalRest(n);
    const restLength = rest.length || 0;
    return [int, parseFloat(`${n > 0 ? '' : '-'}0.${rest}`) || 0, restLength];
};
