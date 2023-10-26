import React, { memo, useCallback, useContext, useRef } from 'react';
import { SidebarSeparatorStyled } from './components/chart-drawings-sidebar-separator.styled';
import { getSidebarFooterIconByType, getSidebarFooterButtonName } from './footer-functions';
import { IconsOverridingContext } from '../../../utils/icons-overriding-context';
import { sidebarFooterButtonTypes, SidebarFooterButtonTypes, } from './chart-sidebar.model';
import { useA11yListboxArrowsFocusController } from '../../../chart-kit/accessibility/use-a11y-listbox-arrows-focus-controller';
import { MultiChartComponentContext } from '../multi-chart/multi-chart-context';
import { DrawingsSidebarButtonWithTooltip } from './components/chart-drawings-sidebar-button-with-tooltip.component';
import { DrawingsSidebarFooterStyled } from './chart-drawings-sidebar-footer.styled';
export const DrawingsSidebarFooter = memo(props => {
    const { expanded, disabled = false, onButtonClick, buttonsState } = props;
    const iconsConfig = useContext(IconsOverridingContext);
    const { localization } = useContext(MultiChartComponentContext);
    const footerListRef = useRef(null);
    const isActive = useCallback((type) => {
        switch (type) {
            case SidebarFooterButtonTypes.DRAWING_MODE:
                return buttonsState.drawingModeOn;
            case SidebarFooterButtonTypes.MAGNET:
                return buttonsState.magnetOn;
            case SidebarFooterButtonTypes.HIDE_DRAWINGS:
                return !buttonsState.drawingsVisible;
            case SidebarFooterButtonTypes.DELETE_DRAWINGS:
                return false;
            case SidebarFooterButtonTypes.SYNC_DRAWINGS:
                return buttonsState.drawingSyncEnabled;
        }
    }, [buttonsState]);
    useA11yListboxArrowsFocusController({
        wrapperRef: footerListRef,
        childrenSelector: 'li',
        direction: 'vertical',
        role: 'listbox',
    });
    const renderSidebarFooterToolbarItem = (type, supressSelect = false) => {
        return (React.createElement(DrawingsSidebarButtonWithTooltip, { key: type, icon: getSidebarFooterIconByType(type, iconsConfig, buttonsState), label: getSidebarFooterButtonName(type, localization.sidebar, buttonsState), expanded: expanded, onClick: () => !supressSelect && onButtonClick(type), disableTooltip: expanded, disabled: disabled, isActive: isActive(type) }));
    };
    useA11yListboxArrowsFocusController({
        wrapperRef: footerListRef,
        childrenSelector: 'button:not([aria-hidden="true"])',
        direction: 'vertical',
        role: 'toolbar',
        childRole: 'skip',
    });
    return (React.createElement(React.Fragment, null,
        React.createElement(SidebarSeparatorStyled, { role: "separator", styles: { height: 1 }, scrollTop: 1 }),
        React.createElement(DrawingsSidebarFooterStyled, { "aria-orientation": "vertical", "aria-label": localization.sidebar.a11y_footerList, ref: footerListRef, expanded: expanded }, sidebarFooterButtonTypes.map(type => renderSidebarFooterToolbarItem(type)))));
});
