import React, { memo } from 'react';
import { OrderEntryContainer } from '../../containers/order-entry.container';
import { OrderAndPositionsContainer } from '../../containers/orders-and-positions/order-and-positions.container';
import { context } from '../../../context/context2';
export const TradingComponent = context.combine(OrderEntryContainer, OrderAndPositionsContainer, context.key()('chartReactConfig'), (TradingEntryContainer, TradingOrderPositionContainer, chartReactConfig) => memo(() => (React.createElement(React.Fragment, null,
    chartReactConfig.trading.addNewOrderEnabled && React.createElement(TradingEntryContainer, null),
    React.createElement(TradingOrderPositionContainer, null)))));
export default TradingComponent;
