import * as React from 'react';
import { forwardRef, useContext } from 'react';
import { IconsOverridingContext } from '../../../utils/icons-overriding-context';
import { TEST_IDS } from '../../../config/e2e/test-ids';
import { ChartToolbarButtonWithTooltip } from '../chart-toolbar/chart-toolbar-button-with-tooltip.component';
import { MultiChartComponentContext } from '../multi-chart/multi-chart-context';
export const LayoutAnchor = forwardRef((props, forwardedRef) => {
    const { value, isOpened } = props;
    const iconsConfig = useContext(IconsOverridingContext);
    const { localization } = useContext(MultiChartComponentContext);
    if (typeof value !== 'string') {
        return React.createElement("div", null);
    }
    return (React.createElement(ChartToolbarButtonWithTooltip, { ...props, ariaLabel: props.ariaLabel, ariaExpanded: props.isOpened, ariaHaspopup: true, icon: iconsConfig.toolbar.layoutSettings, ref: forwardedRef, hasMenu: true, isActive: isOpened, testId: TEST_IDS.chart_layout_button, disableTooltip: isOpened, label: localization?.toolbar.tooltip.layout ?? '' }));
});
