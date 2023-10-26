import React, { useCallback, useContext, useRef } from 'react';
import { context } from '../../../context/context2';
import { IconsOverridingContext } from '../../../utils/icons-overriding-context';
import { IconWrapper } from '../../../chart-kit/IconWrapper/IconWrapper.component';
import { namedMemo } from '../../../utils/named-memo';
import { resolveComponentWithPredicate } from '../../../utils/resolve-component-with-predicate.utils';
import { ChartToolbarButtonWithTooltip } from '../../components/chart-toolbar/chart-toolbar-button-with-tooltip.component';
export const ExportButtonContainer = context.combine(context.key()('localization'), context.key()('chartReactConfig'), (localization, chartReactConfig) => resolveComponentWithPredicate(chartReactConfig.dataExport.enabled, namedMemo('ExportButtonContainer', (props) => {
    const { chartId, chartReactAPI } = props;
    const iconsConfig = useContext(IconsOverridingContext);
    const anchorRef = useRef(null);
    const onClick = useCallback(() => chartReactAPI.supported.exportChartData(chartId), [chartId, chartReactAPI]);
    return (React.createElement(ChartToolbarButtonWithTooltip, { ariaLabel: localization.toolbar.a11y_buttons.a11y_export_button, icon: React.createElement(IconWrapper, null, iconsConfig.toolbar.export), onClick: onClick, ref: anchorRef, label: localization.toolbar.tooltip.export_button }));
})));
