import React from 'react';
import { SidebarFooterButtonTypes } from './chart-sidebar.model';
import { IconWrapper } from '../../../chart-kit/IconWrapper/IconWrapper.component';
import { TEST_IDS } from '../../../config/e2e/test-ids';
export const getSidebarFooterIconByType = (type, iconsConfig, buttonsState) => {
    switch (type) {
        case SidebarFooterButtonTypes.MAGNET:
            return React.createElement(IconWrapper, { testId: TEST_IDS.sidebar_footer_button }, iconsConfig.sidebar.magnet);
        case SidebarFooterButtonTypes.DRAWING_MODE:
            return React.createElement(IconWrapper, { testId: TEST_IDS.sidebar_footer_button }, iconsConfig.sidebar.drawingMode);
        case SidebarFooterButtonTypes.HIDE_DRAWINGS:
            if (buttonsState.drawingsVisible) {
                return (React.createElement(IconWrapper, { testId: TEST_IDS.sidebar_footer_button }, iconsConfig.sidebar.hideDrawings));
            }
            else {
                return (React.createElement(IconWrapper, { testId: TEST_IDS.sidebar_footer_button }, iconsConfig.sidebar.showDrawings));
            }
        case SidebarFooterButtonTypes.SYNC_DRAWINGS:
            return React.createElement(IconWrapper, { testId: TEST_IDS.sidebar_footer_button }, iconsConfig.sidebar.syncDrawings);
        case SidebarFooterButtonTypes.DELETE_DRAWINGS:
            return React.createElement(IconWrapper, { testId: TEST_IDS.sidebar_footer_button }, iconsConfig.sidebar.delete);
        default:
            return React.createElement(IconWrapper, { testId: TEST_IDS.sidebar_footer_button }, iconsConfig.sidebar.magnet);
    }
};
export const getSidebarFooterButtonName = (type, dictSidebar, buttonsState) => {
    switch (type) {
        case SidebarFooterButtonTypes.MAGNET:
            return dictSidebar.buttons.magnetMode;
        case SidebarFooterButtonTypes.DRAWING_MODE:
            return dictSidebar.buttons.drawingMode;
        case SidebarFooterButtonTypes.HIDE_DRAWINGS:
            return buttonsState.drawingsVisible ? dictSidebar.buttons.hideDrawings : dictSidebar.buttons.showDrawings;
        case SidebarFooterButtonTypes.DELETE_DRAWINGS:
            return dictSidebar.buttons.deleteDrawings;
        case SidebarFooterButtonTypes.SYNC_DRAWINGS:
            return dictSidebar.buttons.syncDrawings;
    }
};
