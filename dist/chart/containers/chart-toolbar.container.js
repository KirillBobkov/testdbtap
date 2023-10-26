import React, { createElement } from 'react';
import styled from 'styled-components';
import { context } from '../../context/context2';
import { namedMemo } from '../../utils/named-memo';
import { resolveComponentWithPredicate } from '../../utils/resolve-component-with-predicate.utils';
import { useProperty } from '../../utils/use-property';
import { ChartToolbar } from '../components/chart-toolbar/chart-toolbar.component';
import { MultiChartSettingsButton } from '../components/multichart-settings-dropdown/multichart-settings-dropdown.component';
import { ChartAggregationPeriodDropdownContainer } from './chart-aggregation-period-dropdown.container';
import { ExportButtonContainer } from './chart-export-data/chart-export-button.container';
import { IndicatorTemplatesDropdownContainer } from './chart-indicator-templates-dropdown.container';
import { ChartLayersPopoverContainer } from './chart-layers.container';
import { ChartLayoutDropdownContainer } from './chart-layout-dropdown.container';
import { ChartSettingsContainer } from './chart-settings/chart-settings.container';
import { ChartSnapshotDropdownContainer } from './chart-snapshot-dropdown.container';
import { ChartTypeDropdownContainer } from './chart-type-dropdown.container';
import { CompareChartSelectorContainer } from './compare-chart-selector.container';
import { DrawingsSelectorContainer } from './drawings-selector.container';
import { MaximizeChartButtonContainer } from './maximize-chart-button.container';
import { StudiesSettingsContainer } from './studies-settings.container';
import { useUIOverride } from '../ui-overrides';
import { DEFAULT_TOOLBAR_BUTTONS } from '../ui-overrides/toolbar';
const mainInstrumentSelectorMock = styled.div.withConfig({ displayName: "mainInstrumentSelectorMock" }) `
	width: 80px;
	height: 32px;
	border-right: 1px solid var(--main_chart-grid-line);
`;
const MainInstrumentSelectorContainer = context.lazy(() => import(
/* webpackChunkName: "instrument-selector" */ './instrument-selector/main-instrument-selector.container'), mainInstrumentSelectorMock);
export const ChartToolbarDefaultButtons = context.combine(ChartAggregationPeriodDropdownContainer, ChartTypeDropdownContainer, DrawingsSelectorContainer, CompareChartSelectorContainer, StudiesSettingsContainer, IndicatorTemplatesDropdownContainer, MultiChartSettingsButton, ChartLayoutDropdownContainer, ChartLayersPopoverContainer, ExportButtonContainer, ChartSnapshotDropdownContainer, ChartSettingsContainer, MaximizeChartButtonContainer, (ChartAggregationPeriodDropdownContainer, ChartTypeDropdownContainer, DrawingsSelectorContainer, CompareChartSelectorContainer, StudiesSettingsContainer, IndicatorTemplatesDropdownContainer, MultiChartSettingsButton, ChartLayoutDropdownContainer, ChartLayersPopoverContainer, ExportButtonContainer, ChartSnapshotDropdownContainer, ChartSettingsContainer, MaximizeChartButtonContainer) => ({
    ChartAggregationPeriodDropdownContainer,
    ChartTypeDropdownContainer,
    DrawingsSelectorContainer,
    CompareChartSelectorContainer,
    StudiesSettingsContainer,
    IndicatorTemplatesDropdownContainer,
    MultiChartSettingsButton,
    ChartLayoutDropdownContainer,
    ChartLayersPopoverContainer,
    ExportButtonContainer,
    ChartSnapshotDropdownContainer,
    ChartSettingsContainer,
    MaximizeChartButtonContainer,
}));
export const ChartToolbarContainer = context.combine(MainInstrumentSelectorContainer, context.key()('chartReactConfig'), ChartToolbarDefaultButtons, context.key()('chartReactApiViewModel'), context.key()('chartId'), context.key()('initialLoaderVM'), (InstrumentSelectorContainer, chartReactConfig, ChartToolbarDefaultButtons, chartReactApiViewModel, chartId, initialLoaderVM) => resolveComponentWithPredicate(chartReactConfig.toolbar.enabled, namedMemo('ChartToolbarContainer', () => {
    const chartReactAPI = useProperty(chartReactApiViewModel.api);
    const ChartToolbarComponent = useUIOverride(['Toolbar', 'ToolbarComponent']) ?? ChartToolbar;
    const ChartToolbarContainer = useUIOverride(['Toolbar', 'ToolbarContainer']) ?? null;
    const overridenButtons = useUIOverride(['Toolbar', 'ToolbarButtons']) ?? DEFAULT_TOOLBAR_BUTTONS;
    const buttons = overridenButtons.map((renderItem) => {
        const key = Array.isArray(renderItem) ? renderItem[0] : renderItem;
        const button = Array.isArray(renderItem) ? renderItem[1] : ChartToolbarDefaultButtons[renderItem];
        return createElement(button ?? React.Fragment, { key, chartReactAPI, chartId });
    });
    const loadedPercentage = useProperty(initialLoaderVM.loadedPercentage);
    return createElement(ChartToolbarComponent, {
        buttons,
        container: ChartToolbarContainer,
        MainInstrumentComponent: InstrumentSelectorContainer,
        loadedPercentage,
    });
})));
