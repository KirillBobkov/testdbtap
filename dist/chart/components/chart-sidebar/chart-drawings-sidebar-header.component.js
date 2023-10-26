import React, { memo, useCallback, useContext, useMemo } from 'react';
import { IconWrapper } from '../../../chart-kit/IconWrapper/IconWrapper.component';
import { WithTooltip } from '../../../chart-kit/Tooltip/WithTooltip';
import { TEST_IDS } from '../../../config/e2e/test-ids';
import { IconsOverridingContext } from '../../../utils/icons-overriding-context';
import { ChartReactAppContext } from '../../defaults';
import { MultiChartComponentContext } from '../multi-chart/multi-chart-context';
import { DrawingsSidebarHeaderLabelStyled, DrawingsSidebarHeaderStyled, DrawingsSidebarToggleButtonStyled, } from './chart-drawings-sidebar-header.styled';
export const DrawingsSidebarHeader = memo(props => {
    const { expanded, onToggleExpanded } = props;
    const iconsConfig = useContext(IconsOverridingContext);
    const { localization } = useContext(MultiChartComponentContext);
    const { isMobile } = useContext(ChartReactAppContext);
    const toggleSidebar = useCallback(() => onToggleExpanded(!expanded), [onToggleExpanded, expanded]);
    const toggleBtn = useMemo(() => {
        return React.createElement(IconWrapper, null, iconsConfig.sidebar.toggleBtn);
    }, [iconsConfig.sidebar.toggleBtn]);
    const toggleSidebarBtnAriaLabel = useMemo(() => (expanded ? localization.sidebar.a11y_collapseSidebar : localization.sidebar.a11y_expandSidebar), [expanded, localization.sidebar.a11y_collapseSidebar, localization.sidebar.a11y_expandSidebar]);
    return !isMobile ? (React.createElement(DrawingsSidebarHeaderStyled, { expanded: expanded },
        React.createElement(WithTooltip, { label: toggleSidebarBtnAriaLabel, disabled: expanded },
            React.createElement(DrawingsSidebarToggleButtonStyled, { testId: TEST_IDS.sidebar_toggle_button, onClick: toggleSidebar, icon: toggleBtn, "aria-label": toggleSidebarBtnAriaLabel, "aria-expanded": expanded })),
        React.createElement(DrawingsSidebarHeaderLabelStyled, null, localization.sidebar.header))) : null;
});
