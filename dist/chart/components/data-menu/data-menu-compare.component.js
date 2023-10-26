import React, { memo } from 'react';
import { RightClickMenuReorderButtons, } from '../right-click-menu/right-click-menu-reorder-btns.component';
import { RightClickPopoverMenuItemLabelStyled, RightClickPopoverMenuStyled, } from '../right-click-menu/right-click-menu.styled';
import { useUIOverride } from '../../ui-overrides';
import { DEFAULT_COLOR_PICKER } from '../../ui-overrides/color-picker';
import { DataMenuColorPickerMenuItemStyled, DataMenuColorPickerSettingsField } from './data-menu.styled';
import { ChartSettingsTabDivider } from '../chart-settings/chart-settings-general/chart-settings-tab-general.styled';
import { DataMenuChartTypeItem } from './data-menu-chart-type-item.component';
export const DataMenuCompareComponent = memo(props => {
    const { selectedSeries, palette, onChangeSeriesColor, onChangeSeriesChartType, onSeriesReorder, seriesChartTypes, onChartTypeClose, } = props;
    const ColorPicker = useUIOverride(['ColorPickerComponent']) ?? DEFAULT_COLOR_PICKER;
    return (React.createElement(React.Fragment, null,
        React.createElement(RightClickPopoverMenuStyled, null,
            React.createElement(DataMenuChartTypeItem, { value: selectedSeries.chartType, onPopoverClose: onChartTypeClose, chartTypes: seriesChartTypes, onChangeType: onChangeSeriesChartType }),
            React.createElement(DataMenuColorPickerMenuItemStyled, { value: 'Color' },
                React.createElement(RightClickPopoverMenuItemLabelStyled, null, "Color"),
                React.createElement(DataMenuColorPickerSettingsField, { id: 'dataMenuColorPicker', label: '', preventCheck: true, align: "left" },
                    React.createElement(ColorPicker, { palette: palette, value: selectedSeries.color, onValueChange: onChangeSeriesColor })))),
        React.createElement(ChartSettingsTabDivider, { visible: true }),
        React.createElement(RightClickMenuReorderButtons, { onReorder: onSeriesReorder })));
});
