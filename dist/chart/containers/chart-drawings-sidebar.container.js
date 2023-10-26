import { observableOption } from 'fp-ts-rxjs';
import { pipe } from 'fp-ts/function';
import { createElement, useCallback, useMemo } from 'react';
import { of } from 'rxjs';
import { context } from '../../context/context2';
import { namedMemo } from '../../utils/named-memo';
import { resolveComponentWithPredicate } from '../../utils/resolve-component-with-predicate.utils';
import { useObservable } from '../../utils/use-observable';
import { useDirectProperty, useProperty } from '../../utils/use-property';
import { DrawingsSidebar } from '../components/chart-sidebar/chart-drawings-sidebar.component';
import { SidebarFooterButtonTypes } from '../components/chart-sidebar/chart-sidebar.model';
export const DrawingsSidebarContainer = context.combine(context.key()('drawingViewModel'), context.key()('multiChartViewModel'), context.key()('userDataViewModel'), context.key()('drawingSyncVM'), context.key()('chartReactConfig'), (drawingVM, multiChartVM, userDataViewModel, drawingSyncVM, chartReactConfig) => {
    const activeDrawingType$ = pipe(drawingVM.currentEditableDrawing, observableOption.map(dr => dr.type), observableOption.getOrElse(() => of('')));
    return resolveComponentWithPredicate(chartReactConfig.drawings.sidebar.enabled, namedMemo('DrawingsSidebarContainer', () => {
        // TODO make drawing sidebar independent from drawingVM; or split drawingVM
        const drawingsVisible = useObservable(drawingVM.isVisible, true);
        const drawingsDisabled = useProperty(drawingVM.isDisabled);
        const chartDrawingMode = useDirectProperty(multiChartVM.state, ['drawingMode']);
        const activeDrawingType = useObservable(activeDrawingType$, '');
        const magnetMode = useDirectProperty(multiChartVM.state, ['magnetMode']);
        const isSidebarExpanded = useDirectProperty(userDataViewModel.userData, ['isSidebarExpanded']);
        const drawingSyncEnabled = useProperty(drawingSyncVM.isDrawingSyncEnabled);
        const favoriteDrawings = useProperty(drawingVM.favoriteDrawings);
        const drawingGroups = useObservable(drawingVM.drawingGroups, chartReactConfig.drawings.drawingsList);
        const buttonsState = useMemo(() => ({
            magnetOn: magnetMode,
            drawingModeOn: chartDrawingMode,
            drawingsVisible,
            drawingSyncEnabled,
        }), [drawingsVisible, chartDrawingMode, magnetMode, drawingSyncEnabled]);
        const onSidebarToggle = useCallback(() => {
            userDataViewModel.updateSidebarMode(!isSidebarExpanded);
        }, [isSidebarExpanded]);
        const onButtonClick = useCallback((type) => {
            switch (type) {
                case SidebarFooterButtonTypes.MAGNET:
                    multiChartVM.setMagnetMode(!magnetMode);
                    drawingVM.sendMagnetModeNotification(magnetMode);
                    break;
                case SidebarFooterButtonTypes.DRAWING_MODE:
                    multiChartVM.setDrawingMode(!chartDrawingMode);
                    drawingVM.sendDrawingModeNotification(chartDrawingMode);
                    break;
                case SidebarFooterButtonTypes.HIDE_DRAWINGS:
                    drawingVM.cancelDrawing();
                    drawingVM.changeVisibility(!drawingsVisible);
                    break;
                case SidebarFooterButtonTypes.DELETE_DRAWINGS:
                    drawingVM.cancelDrawing();
                    drawingVM.clearDrawings();
                    drawingVM.sendDeleteDrawingsNotification();
                    break;
                case SidebarFooterButtonTypes.SYNC_DRAWINGS:
                    drawingSyncVM.setDrawingSync(!drawingSyncEnabled);
                    break;
            }
        }, [drawingsVisible, chartDrawingMode, magnetMode, drawingSyncEnabled]);
        const onDrawingClick = useCallback((type) => {
            setTimeout(() => drawingVM.startNewDrawing(type), 0); // Hack to avoid the problem with unmount in MultiLineTextTool
        }, []);
        return createElement(DrawingsSidebar, {
            drawingGroups,
            buttonsState,
            isSidebarExpanded,
            drawingsDisabled,
            activeDrawingType,
            favoriteDrawings,
            icons: drawingVM.iconDrawingIcons,
            onSidebarToggle,
            onButtonClick,
            onDrawingClick,
            onFavorite: drawingVM.onFavorite,
            onUnFavorite: drawingVM.onUnFavorite,
            startNewIconDrawing: drawingVM.startNewIconDrawing,
        });
    }));
});
