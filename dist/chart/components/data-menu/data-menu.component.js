import React, { memo, useMemo } from 'react';
import { defaultChartTypes } from '../../model/chart.model';
import { RCMenuPopover } from '../../../chart-kit/Popover/popover-menu-generic';
import { useUIOverrideComponent } from '../../ui-overrides';
import { COMPARE_SERIES_CHART_TYPES } from '../../view-models/data/data-menu.vm';
import { pipe } from 'fp-ts/function';
import { DataMenuMainComponent } from './data-menu-main.component';
import { DataMenuCompareComponent } from './data-menu-compare.component';
export const DataMenu = memo(props => {
    const { position, isOpened, onClose, selectedSeries, chartReactConfig, onSeriesReorder } = props;
    const seriesChartTypes = useMemo(() => pipe(selectedSeries.type, type => (type === 'main' ? defaultChartTypes : COMPARE_SERIES_CHART_TYPES)), [selectedSeries.type]);
    const DataMenuSeriesContent = selectedSeries.type === 'main' ? (React.createElement(DataMenuMainComponent, { ...props, selectedSeries: selectedSeries, onSeriesReorder: onSeriesReorder, chartTypes: seriesChartTypes, onChartTypeClose: onClose, onPriceTypeClose: onClose, priceTypes: chartReactConfig.priceTypes })) : (React.createElement(DataMenuCompareComponent, { ...props, selectedSeries: selectedSeries, onSeriesReorder: onSeriesReorder, seriesChartTypes: seriesChartTypes, onChartTypeClose: onClose }));
    const content = useUIOverrideComponent(['rightClickMenus', 'dataMenu']) ?? DataMenuSeriesContent;
    return (React.createElement(RCMenuPopover, { opened: isOpened, customPosition: position, onRequestClose: onClose }, content));
});
