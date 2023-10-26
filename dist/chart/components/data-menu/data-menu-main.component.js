import React, { memo } from 'react';
import { RightClickMenuReorderButtons } from '../right-click-menu/right-click-menu-reorder-btns.component';
import { RightClickMenuTradingButtons } from '../right-click-menu/right-click-menu-trading-btns';
import { ChartSettingsTabDivider } from '../chart-settings/chart-settings-general/chart-settings-tab-general.styled';
import { DataMenuChartTypeItem } from './data-menu-chart-type-item.component';
import { DataMenuPriceTypeItem } from './data-menu-price-type-item.component';
export const DataMenuMainComponent = memo(props => {
    const { selectedSeries, onChangeSeriesChartType, settings, priceTypes, onChangePriceType, onSeriesReorder, onCreateOrder, chartTypes, onChartTypeClose, onPriceTypeClose, } = props;
    return (React.createElement(React.Fragment, null,
        settings.chartReact.trading.visible && (React.createElement(React.Fragment, null,
            React.createElement(RightClickMenuTradingButtons, { mainSeriesData: {
                    candlePrice: selectedSeries.trading.candlePrice,
                    marketPrice: selectedSeries.trading.marketPrice,
                    quantity: selectedSeries.trading.quantity,
                }, createOrder: onCreateOrder }),
            React.createElement(ChartSettingsTabDivider, { visible: true }))),
        React.createElement(DataMenuChartTypeItem, { value: selectedSeries.chartType, chartTypes: chartTypes, onChangeType: onChangeSeriesChartType, onPopoverClose: onChartTypeClose }),
        React.createElement(DataMenuPriceTypeItem, { value: selectedSeries.priceType, priceTypes: priceTypes, onChangeType: onChangePriceType, onPopoverClose: onPriceTypeClose }),
        React.createElement(ChartSettingsTabDivider, { visible: true }),
        React.createElement(RightClickMenuReorderButtons, { onReorder: onSeriesReorder })));
});
