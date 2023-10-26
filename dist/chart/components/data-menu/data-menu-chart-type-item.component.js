import React, { memo, useCallback, useContext, useRef, useState } from 'react';
import { DataMenuChartTypePopover } from './data-menu-popovers/data-menu-series-chart-type-popover.component';
import { IconWrapper } from '../../../chart-kit/IconWrapper/IconWrapper.component';
import { DataMenuPopoverAnchor } from './data-menu-popovers/data-menu-popovers.styled';
import { RightClickMenuPopoverItemWrapper, RightClickPopoverMenuItemStyled } from '../right-click-menu/right-click-menu.styled';
import { renderSettingsItem } from '../yAxis-settings/yaxis-main-popover.component';
import { constVoid } from 'fp-ts/function';
import { IconsOverridingContext } from '../../../utils/icons-overriding-context';
import { MultiChartComponentContext } from '../multi-chart/multi-chart-context';
import { ChartReactAppContext } from '../../defaults';
export const DataMenuChartTypeItem = memo(props => {
    const { onPopoverClose, value, chartTypes, onChangeType } = props;
    const [isOpened, setIsOpened] = useState(false);
    const { localization } = useContext(MultiChartComponentContext);
    const iconsConfig = useContext(IconsOverridingContext);
    const chartTypePopoverAnchorRef = useRef(null);
    const { isMobile } = useContext(ChartReactAppContext);
    const onMouseEnterHandler = useCallback(() => setIsOpened(true), [setIsOpened]);
    const onMouseLeaveHandler = useCallback(() => setIsOpened(false), [setIsOpened]);
    return (React.createElement(RightClickMenuPopoverItemWrapper, { onMouseLeave: onMouseLeaveHandler },
        React.createElement(DataMenuPopoverAnchor, { ref: chartTypePopoverAnchorRef }),
        React.createElement(RightClickPopoverMenuItemStyled, { value: 'Chart Type', onMouseEnter: isMobile ? constVoid : onMouseEnterHandler }, renderSettingsItem(localization.legend.a11y_chartType, true, React.createElement(React.Fragment, null), false, React.createElement(IconWrapper, null, iconsConfig.yAxisMainPopover.arrow))),
        React.createElement(DataMenuChartTypePopover, { isOpened: isOpened, onClose: onPopoverClose, value: value, seriesChartTypes: chartTypes, onChangeSeriesChartType: onChangeType, anchorRef: chartTypePopoverAnchorRef })));
});
