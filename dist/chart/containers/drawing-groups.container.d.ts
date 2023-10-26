import React from 'react';
import { Localization } from '../../config/localization/localization';
import { DrawingGroupsViewModel } from '../view-models/layers/drawing-groups.view-model';
import { ChartLayersViewModel } from '../view-models/layers/chart-layers.view-model';
import { ChartReactConfig } from '../../config/chart-react-config';
export declare const DrawingGroupsContainer: import("../../context/context2").Context<Record<"drawingGroupsViewModel", DrawingGroupsViewModel> & Record<"chartLayersViewModel", ChartLayersViewModel> & Record<"localization", Localization> & Record<"chartReactConfig", ChartReactConfig>, React.FunctionComponent<{}> | (() => React.FunctionComponentElement<{
    children?: React.ReactNode;
}>)>;
