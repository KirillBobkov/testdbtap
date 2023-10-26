import React, { memo, useCallback, useContext, useMemo } from 'react';
import { MultiChartComponentContext } from '../multi-chart/multi-chart-context';
import { RightClickPopoverMenuItemLabelStyled, RightClickPopoverMenuItemStyled, RightClickPopoverMenuStyled, RightClickTradingBtnsAtLabel, } from './right-click-menu.styled';
export const RightClickMenuTradingButtonsTypes = {
    buyMarket: 'buyMarket',
    sellMarket: 'sellMarket',
    createLimit: 'createLimit',
    createStop: 'createStop',
};
export const RightClickMenuTradingButtons = memo(props => {
    const { mainSeriesData, createOrder } = props;
    const { localization } = useContext(MultiChartComponentContext);
    const limitOrderLabel = useMemo(() => {
        return mainSeriesData.candlePrice < mainSeriesData.marketPrice
            ? `${localization.trading.orderEntry.buyLimitBtn} `
            : `${localization.trading.orderEntry.sellLimitBtn} `;
    }, [mainSeriesData]);
    const stopOrderLabel = useMemo(() => {
        return mainSeriesData.candlePrice > mainSeriesData.marketPrice
            ? `${localization.trading.orderEntry.buyStopBtn} `
            : `${localization.trading.orderEntry.sellStopBtn} `;
    }, [mainSeriesData]);
    const onOrderMenuHandler = useCallback((value) => {
        const quantity = mainSeriesData.quantity ?? 0;
        const price = Number(mainSeriesData.candlePrice);
        const marketPrice = Number(mainSeriesData.marketPrice);
        switch (value) {
            case RightClickMenuTradingButtonsTypes.buyMarket:
                createOrder({ orderType: 'market', side: 'buy', quantity });
                break;
            case RightClickMenuTradingButtonsTypes.sellMarket:
                createOrder({ orderType: 'market', side: 'sell', quantity });
                break;
            case RightClickMenuTradingButtonsTypes.createLimit:
                const limitSide = price < marketPrice ? 'buy' : 'sell';
                createOrder({ orderType: 'limit', side: limitSide, quantity });
                break;
            case RightClickMenuTradingButtonsTypes.createStop:
                const stopSide = price > marketPrice ? 'buy' : 'sell';
                createOrder({ orderType: 'stop', side: stopSide, quantity });
                break;
        }
    }, [createOrder, mainSeriesData]);
    return (React.createElement(RightClickPopoverMenuStyled, { onItemSelect: onOrderMenuHandler },
        React.createElement(RightClickPopoverMenuItemStyled, { value: RightClickMenuTradingButtonsTypes.buyMarket },
            React.createElement(RightClickPopoverMenuItemLabelStyled, null,
                localization.trading.orderEntry.buyMarketBtn,
                " ",
                mainSeriesData.quantity,
                React.createElement(RightClickTradingBtnsAtLabel, null, "@"),
                mainSeriesData.marketPrice)),
        React.createElement(RightClickPopoverMenuItemStyled, { value: RightClickMenuTradingButtonsTypes.sellMarket },
            React.createElement(RightClickPopoverMenuItemLabelStyled, null,
                localization.trading.orderEntry.sellMarketBtn,
                " ",
                mainSeriesData.quantity,
                React.createElement(RightClickTradingBtnsAtLabel, null, "@"),
                mainSeriesData.marketPrice)),
        React.createElement(RightClickPopoverMenuItemStyled, { value: RightClickMenuTradingButtonsTypes.createLimit },
            React.createElement(RightClickPopoverMenuItemLabelStyled, null,
                limitOrderLabel,
                " ",
                mainSeriesData.quantity,
                React.createElement(RightClickTradingBtnsAtLabel, null, "@"),
                mainSeriesData.candlePrice)),
        React.createElement(RightClickPopoverMenuItemStyled, { value: RightClickMenuTradingButtonsTypes.createStop },
            React.createElement(RightClickPopoverMenuItemLabelStyled, null,
                stopOrderLabel,
                " ",
                mainSeriesData.quantity,
                React.createElement(RightClickTradingBtnsAtLabel, null, "@"),
                mainSeriesData.candlePrice))));
});
