import React from 'react';
import { context } from '../../../context/context2';
import { BackgroundMenuContainer } from '../background-menu/background-menu.container';
import { DataMenuContainer } from '../data-menu/data-menu.container';
import { DrawingsMenuContainer } from '../drawings-menu/drawings-menu.container';
import { LegendMenuContainer } from '../chart-legend/legend-menu.container';
import { PositionMenuContainer } from '../orders-and-positions/position-menu.container';
import { StudiesMenuContainer } from '../studies-menu/studies-menu.container';
import { YAxisMenuContainer } from '../y-axis-menu/y-axis-menu.container';
import { OrderMenuContainer } from '../orders-and-positions/order-menu.container';
export const RightClickMenusContainer = context.combine(BackgroundMenuContainer, DataMenuContainer, StudiesMenuContainer, YAxisMenuContainer, LegendMenuContainer, DrawingsMenuContainer, PositionMenuContainer, OrderMenuContainer, (BackgroundMenuContainer, DataMenuContainer, StudiesMenuContainer, YAxisMenuContainer, ChartLegendMenuContainer, DrawingsMenuContainer, PositionMenuContainer, OrderMenuContainer) => () => (React.createElement(React.Fragment, null,
    React.createElement(BackgroundMenuContainer, null),
    React.createElement(DataMenuContainer, null),
    React.createElement(StudiesMenuContainer, null),
    React.createElement(YAxisMenuContainer, null),
    React.createElement(ChartLegendMenuContainer, null),
    React.createElement(DrawingsMenuContainer, null),
    React.createElement(PositionMenuContainer, null),
    React.createElement(OrderMenuContainer, null))));
