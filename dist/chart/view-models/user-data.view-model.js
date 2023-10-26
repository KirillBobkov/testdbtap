import { context } from '../../context/context2';
import { createPropertyAdapter } from '../../utils/property.utils';
import { pipe } from 'fp-ts/function';
import { newSink } from '../../context/sink2';
import { callTracerProxy } from '../../utils/debug/call-tracer';
import { merge } from 'rxjs';
import { merge as objectMerge } from '@devexperts/dxcharts-lite/dist/chart/utils/merge.utils';
import { tap } from 'rxjs/operators';
export const INITIAL_USER_DATA = {
    customPeriods: [],
    customColors: [],
    favoriteDrawings: [],
    recentDrawings: [],
    isSidebarExpanded: false,
    timeframePresets: [],
    positions: {
        chartLayersPopover: {
            top: 10,
            left: 60, // In percent
        },
        drawingsToolbar: {
            top: 10,
            left: 45, // In percent
        },
    },
};
export const createUserDataViewModel = context.combine(context.key()('userDataProvider'), context.key()('userDataLoaded'), (userDataProvider, userDataLoaded) => {
    const [setUserData, userData] = createPropertyAdapter(objectMerge(userDataLoaded, INITIAL_USER_DATA));
    const updateCustomColors = (colors) => pipe(userData.getValue(), userData => ({
        ...userData,
        customColors: [...colors],
    }), setUserData);
    const updateCustomPeriods = (periods) => pipe(userData.getValue(), userData => ({
        ...userData,
        customPeriods: [...periods],
    }), setUserData);
    const updateFavoriteDrawings = (drawings) => pipe(userData.getValue(), userData => ({
        ...userData,
        favoriteDrawings: [...drawings],
    }), setUserData);
    const updateRecentDrawings = (drawings) => pipe(userData.getValue(), userData => ({
        ...userData,
        recentDrawings: [...drawings],
    }), setUserData);
    const updateSidebarMode = (isSidebarExpanded) => pipe(userData.getValue(), userData => ({
        ...userData,
        isSidebarExpanded,
    }), setUserData);
    const updateTimeframePresetsList = (timeframePresets) => pipe(userData.getValue(), userData => ({
        ...userData,
        timeframePresets,
    }), setUserData);
    const updateWidgetPosition = (widget, position) => pipe(userData.getValue(), userData => ({
        ...userData,
        positions: {
            ...userData.positions,
            [widget]: position,
        },
    }), setUserData);
    const syncWithProviderEffect = pipe(userData, tap(userDataProvider.setUserData));
    const effects = merge(syncWithProviderEffect);
    return newSink(callTracerProxy('userDataViewModel', {
        userData,
        updateCustomColors,
        updateCustomPeriods,
        updateFavoriteDrawings,
        updateRecentDrawings,
        updateSidebarMode,
        updateTimeframePresetsList,
        updateWidgetPosition,
    }), effects);
});
