import React, { memo, useCallback, useContext, useRef } from 'react';
import { IconsOverridingContext } from '../../../../utils/icons-overriding-context';
import { MultiChartComponentContext } from '../../multi-chart/multi-chart-context';
import { ChartLegendItemNameStyled } from './chart-legend-item.styled';
import { ChartLegendDeleteButtonStyled, ChartLegendSecondarySeriesItemContainerStyled, ChartLegendSecondarySeriesItemControlsStyled, ChartLegendSecondarySeriesItemValueStyled, ChartLegendSettingsButtonStyled, } from './chart-legend-secondary-series.styled';
import { ChartLegendStudiesItemIconStyled } from './chart-legend-studies.styled';
import { useUIOverrideComponent } from '../../../ui-overrides';
import { RCMenuPopover } from '../../../../chart-kit/Popover/popover-menu-generic';
import { DataMenuCompareComponent } from '../../data-menu/data-menu-compare.component';
import { COMPARE_SERIES_CHART_TYPES } from '../../../view-models/data/data-menu.vm';
export const ChartLegendSecondarySeriesItem = memo((props) => {
    const { onDeleteSeries, series, isOpened, onCloseSeries, onOpenSeries, popupPosition, testId, 
    // data menu props
    selectedSeries, palette, onChangeSeriesColor, onChangeSeriesChartType, onSeriesReorder, } = props;
    const togglePopoverHandler = useCallback((e) => {
        // prevents popup from being clicked in the same phase of click event
        // https://github.com/facebook/react/issues/20074
        e.stopPropagation();
        if (isOpened) {
            onCloseSeries();
        }
        else {
            onOpenSeries(series.model.id);
        }
    }, [isOpened, onCloseSeries, onOpenSeries, series]);
    const { keyboardModeEnabled } = useContext(MultiChartComponentContext);
    const deleteSeriesHandler = useCallback(() => onDeleteSeries(series.model), [onDeleteSeries, series]);
    const anchorRefPopover = useRef(null);
    const iconsConfig = useContext(IconsOverridingContext);
    const onChangeSeriesColorHandler = useCallback((id) => {
        onChangeSeriesColor(id);
        onCloseSeries();
    }, [onChangeSeriesColor, onCloseSeries]);
    const onChangeSeriesChartTypeHandler = useCallback((type) => {
        onChangeSeriesChartType(type);
        onCloseSeries();
    }, [onChangeSeriesChartType, onCloseSeries]);
    const onSeriesReorderHandler = useCallback((reorderType) => {
        onSeriesReorder(reorderType);
        onCloseSeries();
    }, [onSeriesReorder, onCloseSeries]);
    const dataMenuPopoverContent = useUIOverrideComponent(['rightClickMenus', 'dataMenu']) ??
        (selectedSeries && selectedSeries.type === 'compare' && (React.createElement(DataMenuCompareComponent, { selectedSeries: selectedSeries, palette: palette, seriesChartTypes: COMPARE_SERIES_CHART_TYPES, onChangeSeriesColor: onChangeSeriesColorHandler, onChangeSeriesChartType: onChangeSeriesChartTypeHandler, onSeriesReorder: onSeriesReorderHandler, onChartTypeClose: onCloseSeries })));
    return (React.createElement(React.Fragment, null,
        React.createElement(ChartLegendSecondarySeriesItemContainerStyled, { "data-test-id": testId, isPopoverOpened: isOpened && !popupPosition.x },
            React.createElement(ChartLegendItemNameStyled, null, series.model.symbol),
            React.createElement(ChartLegendSecondarySeriesItemValueStyled, { keyboardModeEnabled: keyboardModeEnabled, ref: series.ref }),
            React.createElement(ChartLegendSecondarySeriesItemControlsStyled, { keyboardModeEnabled: keyboardModeEnabled },
                React.createElement(ChartLegendSettingsButtonStyled, { onMouseDown: togglePopoverHandler, ref: anchorRefPopover },
                    React.createElement(ChartLegendStudiesItemIconStyled, null, iconsConfig.legend.secondarySeries.settings)),
                React.createElement(ChartLegendDeleteButtonStyled, { onClick: deleteSeriesHandler },
                    React.createElement(ChartLegendStudiesItemIconStyled, null, iconsConfig.legend.secondarySeries.delete)))),
        React.createElement(RCMenuPopover, { opened: isOpened, customPosition: popupPosition, onRequestClose: onCloseSeries }, dataMenuPopoverContent)));
});
