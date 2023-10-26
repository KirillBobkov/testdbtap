import { createElement } from 'react';
import { context } from '../../context/context2';
import { getSelectedLayout } from '../../providers/layout-provider';
import { Providers } from '../../providers/providers';
import { windowGlobal } from '../../utils/debug/chart-window-global';
import { namedMemo } from '../../utils/named-memo';
import { useDirectProperty } from '../../utils/use-property';
import { useSink } from '../../utils/use-sink';
import { MultiChartComponent } from '../components/multi-chart/multi-chart.component';
import { createMultiChartDataService } from '../services/multichart-data.service';
import { createUtilityDataService } from '../services/utility-data.service';
import { createActionsHistoryVM } from '../view-models/actions/actions-history.vm';
import { createBrowserApiViewModel } from '../view-models/browser-api.view-model';
import { createDxScriptEditViewModel } from '../view-models/dx-script-edit.view-model';
import { createLayoutViewModel } from '../view-models/layout.view-model';
import { chartLayout2MultiChartState } from '../view-models/layout/layout-to-multichart.mapper';
import { createMultiChartViewModel } from '../view-models/multi-chart.view-model';
import { createNotificationViewModel } from '../view-models/notification.view-model';
import { createThemeViewModel } from '../view-models/theme.view-model';
import { createUserDataViewModel } from '../view-models/user-data.view-model';
import { useUndoRedo } from './undo/use-undo-redo';
import { createDrawingSyncViewModel } from '../view-models/drawings/drawing-sync.vm';
export const MultiChartContainer = context.combine(Providers, context.defer(MultiChartComponent, 'dxScriptEditViewModel', 'multiChartViewModel', 'layoutViewModel', 'themeViewModel', 'userDataViewModel', 'actionsHistoryVM', 'notificationVM', 'multiChartDataService', 'utilityDataService', 'drawingSyncVM'), context.defer(createLayoutViewModel, 'multiChartViewModel', 'browserApiViewModel', 'initialLayout', 'drawingSyncVM'), context.defer(createThemeViewModel, 'multiChartViewModel', 'layoutViewModel'), createMultiChartViewModel, createDrawingSyncViewModel, createUserDataViewModel, createNotificationViewModel, chartLayout2MultiChartState, context.defer(createDxScriptEditViewModel, 'initialDxScripts', 'dxScriptKeywords', 'multiChartViewModel'), context.key()('layoutLoaded'), context.key()('chartReactConfig'), context.key()('initialized'), context.key()('dxScriptLoaded'), context.key()('dxScriptKeywords'), createMultiChartDataService, ({ chartDataProvider }, MultiChartComponentDefer, createLayoutViewModel, createThemeViewModel, createMultiChartViewModel, createDrawingSyncViewModel, createUserDataViewModel, createNotificationViewModel, chartLayout2MultiChartState, createDxScriptEditViewModel, layoutLoaded, chartReactConfig, initialized, dxScriptLoaded, dxScriptKeywords, multiChartDataService) => () => {
    const layout = getSelectedLayout(layoutLoaded);
    const initialMultiChartState = chartLayout2MultiChartState(layout);
    return namedMemo('MultiChartContainer', () => {
        const multiChartViewModel = useSink(() => createMultiChartViewModel(initialMultiChartState, layout.multiChart.selectedChartIndex), [initialMultiChartState]);
        windowGlobal.multiChartVM(multiChartViewModel);
        const drawingSyncVM = useSink(() => createDrawingSyncViewModel(layout.global.drawingSyncMode), []);
        //#region services
        const utilityDataService = useSink(() => createUtilityDataService({ chartDataProvider }), [createUtilityDataService, chartDataProvider]);
        //#endregion
        const browserApiViewModel = useSink(() => createBrowserApiViewModel(), [createBrowserApiViewModel]);
        const actionsHistoryVM = useSink(() => createActionsHistoryVM(), [createActionsHistoryVM]);
        useUndoRedo(chartReactConfig.actionsHistory, actionsHistoryVM.undo, actionsHistoryVM.redo);
        windowGlobal.actionsHistoryVM(actionsHistoryVM);
        const layoutViewModelSink = useSink(() => createLayoutViewModel({
            multiChartViewModel,
            browserApiViewModel,
            drawingSyncVM,
            initialLayout: layoutLoaded,
        }), [multiChartViewModel, browserApiViewModel]);
        const layoutViewModel = useSink(() => layoutViewModelSink, [layoutViewModelSink], initialized);
        const createDxScriptEditVM = useSink(() => createDxScriptEditViewModel({
            initialDxScripts: dxScriptLoaded,
            dxScriptKeywords,
            multiChartViewModel,
        }), []);
        const dxScriptEditViewModel = useSink(() => createDxScriptEditVM, [], initialized);
        const userDataViewModel = useSink(() => createUserDataViewModel, [createUserDataViewModel], initialized);
        const themeVMSink = useSink(() => createThemeViewModel({ multiChartViewModel, layoutViewModel }), [multiChartViewModel, userDataViewModel]);
        const themeVM = useSink(() => themeVMSink, [themeVMSink], initialized);
        const notificationVM = useSink(() => createNotificationViewModel, [createNotificationViewModel], initialized);
        const MultiChartComponent = useSink(() => MultiChartComponentDefer({
            dxScriptEditViewModel,
            drawingSyncVM,
            multiChartViewModel,
            actionsHistoryVM,
            layoutViewModel,
            userDataViewModel,
            themeViewModel: themeVM,
            notificationVM,
            multiChartDataService,
            utilityDataService,
        }), [
            multiChartViewModel,
            actionsHistoryVM,
            layoutViewModel,
            userDataViewModel,
            themeVM,
            notificationVM,
        ]);
        const multiChartLayout = useDirectProperty(multiChartViewModel.state, ['layout']);
        const maximizedChartId = useDirectProperty(multiChartViewModel.state, ['maximizedChartId']);
        return createElement(MultiChartComponent, {
            multiChartLayout,
            maximizedChartId,
        });
    });
});
