import { createElement } from 'react';
import { context } from '../../../context/context2';
import { useDirectProperty, useProperty } from '../../../utils/react.utils';
import { createDataMenuViewModel } from '../../view-models/data/data-menu.vm';
import { useSink } from '../../../utils/use-sink';
import { DataMenu } from '../../components/data-menu/data-menu.component';
import { option } from 'fp-ts';
import { pipe, constNull } from 'fp-ts/function';
export const DataMenuContainer = context.combine(createDataMenuViewModel, context.key()('chartConfiguratorViewModel'), context.key()('colorPalette'), context.key()('chartReactConfig'), (candleSeriesMenuViewModelSink, chartConfiguratorVM, colorPalette, chartReactConfig) => () => {
    const candleSeriesMenuVM = useSink(() => candleSeriesMenuViewModelSink, []);
    const isOpened = useProperty(candleSeriesMenuVM.isOpened);
    const position = useProperty(candleSeriesMenuVM.menuPosition);
    const selectedSeries = useProperty(candleSeriesMenuVM.selectedSeries);
    const settings = useDirectProperty(chartConfiguratorVM.state, ['settings']);
    return pipe(selectedSeries, option.fold(constNull, selectedSeries => createElement(DataMenu, {
        position,
        isOpened,
        onClose: candleSeriesMenuVM.closeMenu,
        selectedSeries,
        onChangeSeriesChartType: candleSeriesMenuVM.changeSelectedSeriesChartType,
        onChangeSeriesColor: candleSeriesMenuVM.changeSelectedSeriesColor,
        settings,
        chartReactConfig,
        palette: colorPalette,
        onChangePriceType: candleSeriesMenuVM.changeSelectedSeriesPriceType,
        onCreateOrder: candleSeriesMenuVM.createOrder,
        onSeriesReorder: candleSeriesMenuVM.reorderSeries,
    })));
});
