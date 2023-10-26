import React, { memo } from 'react';
import { context } from '../../../context/context2';
import { resolveComponentWithPredicate } from '../../../utils/resolve-component-with-predicate.utils';
import { SwitchAxisTypeContainer } from '../../containers/switch-axis-type.container';
export const YAxisControls = context.combine(SwitchAxisTypeContainer, context.key()('chartReactConfig'), (ScaleTypeContainer, chartReactConfig) => resolveComponentWithPredicate(chartReactConfig.yAxisControls.enabled, memo(() => React.createElement(ScaleTypeContainer, null))));
