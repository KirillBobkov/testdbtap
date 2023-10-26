import { createElement, useCallback, useContext } from 'react';
import { BackgroundMenu } from '../../components/background-menu/background-menu.component';
import { useDirectProperty, useProperty } from '../../../utils/react.utils';
import { context } from '../../../context/context2';
import { createBackgroundMenuViewModel } from '../../view-models/background-menu/background-menu.vm';
import { useSink } from '../../../utils/use-sink';
import { MultiChartComponentContext } from '../../components/multi-chart/multi-chart-context';
import { useObservable } from '../../../utils/use-observable';
export const BackgroundMenuContainer = context.combine(createBackgroundMenuViewModel, context.key()('chartConfiguratorViewModel'), context.key()('chartReactConfig'), context.key()('themeViewModel'), context.key()('drawingViewModel'), context.key()('studiesSettingsViewModel'), context.key()('notificationVM'), (backgroundMenuVMSink, chartConfiguratorVM, chartReactConfig, themeViewModel, drawingViewModel, studiesSettingsViewModel, notificationVM) => () => {
    const { localization } = useContext(MultiChartComponentContext);
    const backgroundMenuVM = useSink(() => backgroundMenuVMSink, []);
    const isOpened = useProperty(backgroundMenuVM.isOpened);
    const position = useProperty(backgroundMenuVM.menuPosition);
    const mainSeriesTradingData = useProperty(backgroundMenuVM.mainSeriesData);
    const settings = useDirectProperty(chartConfiguratorVM.state, ['settings']);
    const sessionBreaksDisabled = useProperty(chartConfiguratorVM.sessionBreaksDisabled);
    const activeTheme = useProperty(themeViewModel.activeTheme);
    const recentDrawings = useProperty(drawingViewModel.recentDrawings);
    const onRecentDrawingSelectHandler = useCallback((type) => {
        drawingViewModel.startNewDrawing(type);
        backgroundMenuVM.closeMenu();
    }, []);
    const onClearIndicatorsHandler = useCallback(() => {
        studiesSettingsViewModel.onRemoveAllStudies();
        backgroundMenuVM.closeMenu();
    }, []);
    const settingsState = useProperty(chartConfiguratorVM.state);
    const onOpenSettingsHandler = useCallback(() => {
        chartConfiguratorVM.onOpen();
        backgroundMenuVM.closeMenu();
    }, [settingsState]);
    const onResetChartHandler = useCallback(() => {
        chartConfiguratorVM.onRestoreDefaultConfig();
        notificationVM.sendNotification(localization.notifications.notificationResetChart);
        backgroundMenuVM.closeMenu();
    }, []);
    const drawingsVisible = useObservable(drawingViewModel.isVisible, true);
    const onHideDrawingsHandler = useCallback(() => {
        drawingViewModel.cancelDrawing();
        drawingViewModel.changeVisibility(!drawingsVisible);
        backgroundMenuVM.closeMenu();
    }, [drawingsVisible]);
    const onClearDrawingsHandler = useCallback(() => {
        drawingViewModel.cancelDrawing();
        drawingViewModel.clearDrawings();
        drawingViewModel.sendDeleteDrawingsNotification();
        backgroundMenuVM.closeMenu();
    }, []);
    const onChangeThemeHandler = useCallback((theme) => {
        themeViewModel.changeTheme(theme);
        backgroundMenuVM.closeMenu();
    }, []);
    return createElement(BackgroundMenu, {
        isOpened,
        position,
        onClose: backgroundMenuVM.closeMenu,
        mainSeriesTradingData,
        settings,
        onCreateOrder: backgroundMenuVM.createOrder,
        onSettingsChange: chartConfiguratorVM.setSettingsByPath,
        sessionBreaksDisabled,
        chartReactConfig,
        activeTheme,
        onChangeTheme: onChangeThemeHandler,
        recentDrawings,
        onRecentDrawingSelect: onRecentDrawingSelectHandler,
        onClearIndicators: onClearIndicatorsHandler,
        onOpenSettings: onOpenSettingsHandler,
        onResetChart: onResetChartHandler,
        drawingsVisible,
        onChangeDrawingsVisibility: onHideDrawingsHandler,
        onClearDrawings: onClearDrawingsHandler,
    });
});
