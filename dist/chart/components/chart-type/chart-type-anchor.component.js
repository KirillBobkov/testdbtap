import * as React from 'react';
import { forwardRef, useContext, useMemo } from 'react';
import { IconsOverridingContext } from '../../../utils/icons-overriding-context';
import { ChartToolbarButtonWithTooltip } from '../chart-toolbar/chart-toolbar-button-with-tooltip.component';
import { MultiChartComponentContext } from '../multi-chart/multi-chart-context';
import { toType } from './chart-type.model';
import { getIconByChartType } from './getIconByChartType';
export const TypeAnchor = forwardRef((props, forwardedRef) => {
    const iconsConfig = useContext(IconsOverridingContext);
    const { localization } = useContext(MultiChartComponentContext);
    const icon = useMemo(() => {
        if (typeof props.value === 'string') {
            return getIconByChartType(toType(props.value, localization), iconsConfig);
        }
        return null;
    }, [props.value, localization, iconsConfig]);
    return (React.createElement(ChartToolbarButtonWithTooltip, { ariaLabel: props.ariaLabel, ariaExpanded: props.isOpened, ariaHaspopup: true, icon: icon, ref: forwardedRef, hasMenu: true, isActive: props.isOpened, ...props, disableTooltip: props.isOpened, label: localization.toolbar.tooltip.chart_type }));
});
