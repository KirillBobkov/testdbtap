import { createElement, useContext } from 'react';
import { context } from '../../../context/context2';
import { importIdle, useProperty } from '../../../utils/react.utils';
import { useSink } from '../../../utils/use-sink';
import { createYAxisMenuViewModel } from '../../view-models/y-axis/y-axis-menu.vm';
import { countdownViewModel } from '../../view-models/countdown.view-model';
import { createBidAskLabelProvider } from '../../view-models/y-axis/y-axis-labels/bid-ask-label.provider';
import { createPrePostMarketLabelProvider } from '../../view-models/y-axis/y-axis-labels/pre-post-market-close-label.provider';
import { createPrevDayCloseProvider } from '../../view-models/y-axis/y-axis-labels/prev-day-close-label.provider';
import { createViewportHighLowLabelProvider } from '../../view-models/y-axis/y-axis-labels/viewport-highlow-label.provider';
import { useObservable } from '../../../utils/use-observable';
import { MultiChartComponentContext } from '../../components/multi-chart/multi-chart-context';
const YAxisConfiguratorPopover = importIdle(() => import('../../components/yAxis-settings/yaxis-configurator-popover.component'));
export const YAxisMenuContainer = context.combine(context.key()('yAxisConfiguratorViewModel'), createYAxisMenuViewModel, countdownViewModel, createBidAskLabelProvider, createPrePostMarketLabelProvider, createPrevDayCloseProvider, createViewportHighLowLabelProvider, (yAxisConfiguratorVM, yAxisMenuVMSink, countdownViewModel) => () => {
    useSink(() => countdownViewModel, []);
    const yAxisMenuVM = useSink(() => yAxisMenuVMSink, []);
    const isOpened = useProperty(yAxisMenuVM.isOpened);
    const menuPosition = useProperty(yAxisMenuVM.menuPosition);
    const { localization } = useContext(MultiChartComponentContext);
    const config = useObservable(yAxisConfiguratorVM.config$, yAxisConfiguratorVM.defaultConfig);
    const labelsConfig = useProperty(yAxisConfiguratorVM.labelsConfig);
    return createElement(YAxisConfiguratorPopover, {
        isOpened,
        config,
        setAxisAlign: yAxisConfiguratorVM.setYAxisAlign,
        popoverCoordinates: menuPosition,
        onClose: yAxisMenuVM.closeMenu,
        setFitType: yAxisConfiguratorVM.setPriceAxisFitType,
        setAutoScale: yAxisConfiguratorVM.setAutoScale,
        setAxisType: yAxisConfiguratorVM.setAxisType,
        labelsConfig,
        setLabelMode: yAxisConfiguratorVM.changeLabelMode,
        selectDescription: yAxisConfiguratorVM.setDescription,
        selectCountDownBarClose: yAxisConfiguratorVM.setCountDownBarClose,
        yAxisDict: localization.yAxis,
        toggleLockPriceToBarRatio: yAxisConfiguratorVM.toggleLockPriceToBarRatio,
        togglePriceScaleInverse: yAxisConfiguratorVM.togglePriceScaleInverse,
    });
});
