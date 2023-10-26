import React, { memo, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { DrawingsListStyled, DrawingsSidebarStyled, SidebarDrawingsItemsStyled, SidebarScrollableStyled, } from './chart-drawings-sidebar.styled';
import { SidebarSeparatorStyled } from './components/chart-drawings-sidebar-separator.styled';
import { isDrawingType } from '../../model/drawing.model';
import { DrawingsSidebarFooter } from './chart-drawings-sidebar-footer.component';
import { TEST_IDS } from '../../../config/e2e/test-ids';
import { useA11yListboxArrowsFocusController } from '../../../chart-kit/accessibility/use-a11y-listbox-arrows-focus-controller';
import { ChartReactAppContext } from '../../defaults';
import { MultiChartComponentContext } from '../multi-chart/multi-chart-context';
import { DrawingsSidebarHeader } from './chart-drawings-sidebar-header.component';
import { DrawingsSidebarDrawing } from './components/chart-drawings-sidebar-drawing.component';
import { DrawingsSidebarFavoriteDrawingsToolbar } from './chart-drawings-sidebar-favorite-drawings.component';
import { DrawingsSidebarDrawingIcon } from './components/chart-drawings-sidebar-drawing-icon.component';
export const DrawingsSidebar = memo((props) => {
    const { drawingGroups, onSidebarToggle, onButtonClick, onDrawingClick, buttonsState, isSidebarExpanded, drawingsDisabled, favoriteDrawings, onFavorite, onUnFavorite, activeDrawingType, icons, startNewIconDrawing, } = props;
    const { isMobile } = useContext(ChartReactAppContext);
    const { localization } = useContext(MultiChartComponentContext);
    const [scrollTop, setScrollTop] = useState(0);
    const localIsSidebarExpanded = useMemo(() => (isMobile ? false : isSidebarExpanded), [isMobile, isSidebarExpanded]);
    const isActiveDrawing = useCallback((type) => !isDrawingType(activeDrawingType) ? false : activeDrawingType === type, [activeDrawingType]);
    const handleScroll = useCallback((left, top) => {
        setScrollTop(top);
    }, [setScrollTop]);
    const onDrawingClickFn = useCallback((type) => isDrawingType(type) && onDrawingClick(type), [onDrawingClick]);
    const onSelectIconDrawing = useCallback((icon) => {
        onDrawingClickFn('icon');
        startNewIconDrawing(icon);
    }, [onDrawingClickFn, startNewIconDrawing]);
    const sidebarDrawingsContainerRef = useRef(null);
    useA11yListboxArrowsFocusController({
        wrapperRef: sidebarDrawingsContainerRef,
        childrenSelector: 'button:not([aria-hidden="true"])',
        direction: 'vertical',
        role: 'toolbar',
        childRole: 'skip',
        deps: [favoriteDrawings],
    });
    const drawingsListContent = useMemo(() => {
        return (React.createElement(SidebarDrawingsItemsStyled, { "aria-orientation": "vertical", "aria-label": localization.sidebar.a11y_drawingsList, "data-test-id": TEST_IDS.sidebar_drawing_container, ref: sidebarDrawingsContainerRef }, drawingGroups.map((group, i) => {
            return (React.createElement(React.Fragment, { key: group.groupName },
                group.drawings.map((type) => {
                    const favorite = favoriteDrawings.includes(type);
                    return type === 'icon' ? (React.createElement(DrawingsSidebarDrawingIcon, { disabled: drawingsDisabled, key: type, icons: icons, active: isActiveDrawing(type), expanded: localIsSidebarExpanded, onSelectIcon: onSelectIconDrawing })) : (React.createElement(DrawingsSidebarDrawing, { key: type, type: type, disabled: drawingsDisabled, active: isActiveDrawing(type), expanded: localIsSidebarExpanded, favorite: favorite, onSelect: onDrawingClickFn, onAddToFavorites: onFavorite, onRemoveFromFavorites: onUnFavorite }));
                }),
                i === drawingGroups.length - 1 ? null : (React.createElement(SidebarSeparatorStyled, { role: "separator", styles: { height: 1 }, key: group.groupName, scrollTop: 1 }))));
        })));
    }, [
        localization.sidebar.a11y_drawingsList,
        favoriteDrawings,
        localIsSidebarExpanded,
        drawingsDisabled,
        drawingGroups,
        icons,
        isActiveDrawing,
        onDrawingClickFn,
        onFavorite,
        onUnFavorite,
        onSelectIconDrawing,
    ]);
    return (React.createElement(DrawingsSidebarStyled, { "data-test-id": TEST_IDS.drawings_sidebar },
        React.createElement(DrawingsSidebarHeader, { expanded: localIsSidebarExpanded, onToggleExpanded: onSidebarToggle }),
        React.createElement(SidebarSeparatorStyled, { role: "separator", styles: { height: 1 }, scrollTop: scrollTop }),
        React.createElement(DrawingsListStyled, { isMobile: isMobile },
            React.createElement(SidebarScrollableStyled, { onScroll: handleScroll, mode: "none" },
                React.createElement(React.Fragment, null,
                    React.createElement(DrawingsSidebarFavoriteDrawingsToolbar, { disabled: drawingsDisabled, favoriteDrawings: favoriteDrawings, checkIfDrawingActive: isActiveDrawing, expanded: localIsSidebarExpanded, onSelectDrawing: onDrawingClickFn }),
                    drawingsListContent))),
        React.createElement(DrawingsSidebarFooter, { disabled: drawingsDisabled, expanded: localIsSidebarExpanded, buttonsState: buttonsState, onButtonClick: onButtonClick })));
});
