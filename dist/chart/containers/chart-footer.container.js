import React from 'react';
import { context } from '../../context/context2';
import { namedMemo } from '../../utils/named-memo';
import { ChartFooter } from '../components/chart-footer/chart-footer.component';
import { ChartFooterLeftElementsContainer, ChartFooterRightElementsContainer, } from '../components/chart-footer/chart-footer.styled';
import { YAxisControls } from '../components/yAxis-controls/yaxis-controls.compoments';
import { DrawingGroupsContainer } from './drawing-groups.container';
import { TimeZoneContainer } from './time-zone.container';
import { TimeframePresetsContainer } from './timeframe-presets.container';
export const ChartFooterContainer = context.combine(TimeZoneContainer, TimeframePresetsContainer, YAxisControls, DrawingGroupsContainer, context.key()('timeframePresetsViewModel'), (TimeZoneContainer, TimeframePresetsContainer, YAxisControls, DrawingGroupsContainer) => namedMemo('ChartFooterContainer', () => {
    return (React.createElement(ChartFooter, null,
        React.createElement(ChartFooterLeftElementsContainer, null,
            React.createElement(TimeZoneContainer, null),
            React.createElement(TimeframePresetsContainer, null)),
        React.createElement(ChartFooterRightElementsContainer, null,
            React.createElement(DrawingGroupsContainer, null),
            React.createElement(YAxisControls, null))));
}));
