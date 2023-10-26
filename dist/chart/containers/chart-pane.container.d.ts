import React from 'react';
import { ChartWithModules } from '../components/canvas-chart-renderer/chart-with-modules';
import { ChartPaneViewModel } from '../view-models/chart-pane.view-model';
import { ChartReactConfig } from '../../config/chart-react-config';
import { ChartDataViewModel } from '../view-models/data/chart-data.view-model';
export declare const ChartPaneContainer: import("../../context/context2").Context<Record<"chartPaneViewModel", ChartPaneViewModel> & Record<"chart", ChartWithModules> & Record<"chartReactConfig", ChartReactConfig> & Record<"chartDataViewModel", ChartDataViewModel>, React.FC<Record<string, any>>>;
