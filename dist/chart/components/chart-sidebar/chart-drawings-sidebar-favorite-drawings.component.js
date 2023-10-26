import React, { memo, useContext, useRef } from 'react';
import { useA11yListboxArrowsFocusController } from '../../../chart-kit/accessibility/use-a11y-listbox-arrows-focus-controller';
import { TEST_IDS } from '../../../config/e2e/test-ids';
import { MultiChartComponentContext } from '../multi-chart/multi-chart-context';
import { SidebarDrawingsItemsStyled } from './chart-drawings-sidebar.styled';
import { DrawingsSidebarDrawing } from './components/chart-drawings-sidebar-drawing.component';
import { SidebarSeparatorStyled } from './components/chart-drawings-sidebar-separator.styled';
export const DrawingsSidebarFavoriteDrawingsToolbar = memo(props => {
    const { favoriteDrawings, expanded, disabled = false, checkIfDrawingActive, onSelectDrawing, onMouseEnter } = props;
    const { localization } = useContext(MultiChartComponentContext);
    const favoriteDrawingsToolbarRef = useRef(null);
    useA11yListboxArrowsFocusController({
        wrapperRef: favoriteDrawingsToolbarRef,
        childrenSelector: 'button:not([aria-hidden="true"])',
        direction: 'vertical',
        role: 'toolbar',
        childRole: 'skip',
        deps: [favoriteDrawings],
    });
    return (React.createElement(React.Fragment, null,
        React.createElement(SidebarDrawingsItemsStyled, { "aria-orientation": "vertical", "aria-label": localization.sidebar.a11y_favoriteList, "data-test-id": TEST_IDS.sidebar_drawing_container, ref: favoriteDrawingsToolbarRef }, favoriteDrawings.map(type => (React.createElement(DrawingsSidebarDrawing, { key: type, type: type, active: checkIfDrawingActive(type), expanded: expanded, disabled: disabled, favorite: true, showFavoritesOnHoverOnly: true, onSelect: onSelectDrawing, onMouseEnter: onMouseEnter })))),
        favoriteDrawings.length > 0 ? (React.createElement(SidebarSeparatorStyled, { role: "separator", styles: { height: 1 }, scrollTop: 1 })) : null));
});
