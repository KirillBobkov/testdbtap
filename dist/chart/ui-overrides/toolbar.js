import { ChartToolbar as DEFAULT_CHART_TOOLBAR } from '../components/chart-toolbar/chart-toolbar.component';
export const DEFAULT_TOOLBAR_BUTTONS = [
    'ChartAggregationPeriodDropdownContainer',
    'ChartTypeDropdownContainer',
    'DrawingsSelectorContainer',
    'CompareChartSelectorContainer',
    'StudiesSettingsContainer',
    'IndicatorTemplatesDropdownContainer',
    'MultiChartSettingsButton',
    'ChartLayoutDropdownContainer',
    'ChartLayersPopoverContainer',
    'ExportButtonContainer',
    'ChartSnapshotDropdownContainer',
    'ChartSettingsContainer',
    'MaximizeChartButtonContainer',
];
// TODO: create the same function for a tabs in chart settings, or better combine them in a signle function
/**
 * @name addCustomToolbarButtons
 * @description
 * You can use this 'helper' function to add custom buttons.
 * The result of this function is an array with toolbar button declarations (it also includes the default buttons).
 */
export const addCustomToolbarButtons = (...buttons) => {
    const toolbarButtons = DEFAULT_TOOLBAR_BUTTONS.slice();
    const buttonsLength = toolbarButtons.length;
    buttons.forEach(({ index = buttonsLength - 1, button, key }, idx) => {
        toolbarButtons.splice(index, 0, [`${key ?? buttonsLength + idx}`, button]);
    });
    return toolbarButtons;
};
export const DEFAULT_TOOLBAR = {
    ToolbarContainer: null,
    ToolbarButtons: DEFAULT_TOOLBAR_BUTTONS,
    ToolbarComponent: DEFAULT_CHART_TOOLBAR,
};
