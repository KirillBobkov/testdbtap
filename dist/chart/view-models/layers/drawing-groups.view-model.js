import { array, io, option } from 'fp-ts';
import { observable } from 'fp-ts-rxjs';
import { constFalse, pipe } from 'fp-ts/function';
import { merge, share, switchMap } from 'rxjs';
import { tap } from 'rxjs/operators';
import { context } from '../../../context/context2';
import { callTracerProxy } from '../../../utils/debug/call-tracer';
import { filterOption } from '../../../utils/monad-functions';
import { createPropertyAdapter } from '../../../utils/property.utils';
import { sink } from '../../../utils/sink';
import { isDrawingLayerItem, isGroupLayerItem } from '../../model/chart-layers.model';
import { DEFAULT_GROUP_ID } from '../../model/drawing-groups.model';
export const createDrawingGroupsViewModel = context.combine(context.key()('chartLayersViewModel'), context.key()('multiChartViewModel'), context.key()('chartDataViewModel'), context.key()('drawingViewModel'), context.key()('localization'), context.key()('chartReactConfig'), context.key()('initialSelectedGroup'), context.key()('chartId'), (chartLayersViewModel, multiChartViewModel, chartDataViewModel, drawingViewModel, localization, chartReactConfig, initialSelectedGroup, chartId) => {
    //#region state
    const [_setSelectedGroup, selectedGroup] = createPropertyAdapter(initialSelectedGroup ?? DEFAULT_GROUP_ID, 
    // we can select same group_id again, but for another instrument
    constFalse);
    const setSelectedGroup = (group) => {
        drawingViewModel.cancelDrawing();
        _setSelectedGroup(group);
    };
    const groups = pipe(chartLayersViewModel.layerItems, observable.map(array.filter(isGroupLayerItem)));
    const getGroups = () => pipe(chartLayersViewModel.layerItems.getValue(), array.filter(isGroupLayerItem));
    //#endregion
    //#region methods
    const selectGroupById = (groupId) => pipe(chartLayersViewModel.layerItems.getValue(), array.filter(isGroupLayerItem), array.findFirst(gi => gi.id === groupId), option.fold(() => array.of(io.of(
    // this check is needed if in layout we have a group, that is not present in the list of groups,
    // setTimeout needed because layout has a delay on saving,
    // but this check can be completed a lot faster then the delay is expired
    setTimeout(() => setSelectedGroup(DEFAULT_GROUP_ID), chartReactConfig.layout.saveDelay + 50))), () => pipe(chartLayersViewModel.layerItems.getValue(), array.filter(isGroupLayerItem), array.map(g => pipe(g, option.fromPredicate(g => g.id === groupId), option.fold(() => io.of(chartLayersViewModel.setItemVisible(g.id, false)), () => io.of(chartLayersViewModel.setItemVisible(g.id, true))))))), io.sequenceArray)();
    const createAndSelectGroup = (name) => pipe(chartLayersViewModel.createGroup({ name }), setSelectedGroup);
    const deleteGroup = (id) => {
        chartLayersViewModel.deleteItem(id);
        if (selectedGroup.getValue() === id) {
            setSelectedGroup(DEFAULT_GROUP_ID);
        }
    };
    //#endregion
    //#region effects
    const addDefaultGroupToLayerItemsEffect = pipe(chartDataViewModel.instrument, filterOption(), observable.map(getGroups), tap(groups => {
        // the effect should be exectuted completly - we can't use filterMap here
        // because other effects depend on it
        if (array.every(g => g.id !== DEFAULT_GROUP_ID)(groups)) {
            chartLayersViewModel.createGroup({
                id: DEFAULT_GROUP_ID,
                name: localization.drawingGroups.defaultGroup,
            });
        }
    }), share());
    const switchGroupOnInstrumentEffect = pipe(
    // switchGroupOnInstrumentEffect should be right after addDefaultGroupToLayerItemsEffect
    // and only that order
    addDefaultGroupToLayerItemsEffect, switchMap(() => pipe(chartDataViewModel.instrument, filterOption())), 
    // try to reselect group on instrument change
    tap(() => setSelectedGroup(selectedGroup.getValue())));
    // !!IMPORTANT!!
    // selectSelectedGroupEffect should be right after addDefaultGroupToLayerItemsEffect
    // and only that order
    const selectSelectedGroupEffect = pipe(addDefaultGroupToLayerItemsEffect, switchMap(() => selectedGroup), tap(g => chartReactConfig.drawings.drawingGroups.enabled && selectGroupById(g)));
    const moveAddedDrawingToSelectedGroupEffect = pipe(chartLayersViewModel.addedLayerItem, observable.filter(isDrawingLayerItem), tap(item => chartLayersViewModel.moveItem(item, 0, selectedGroup.getValue())));
    const syncSelectedGroupToMultiChartChartsEffect = pipe(selectedGroup, observable.filter(selectedGroup => multiChartViewModel.getSelectedChartInfo().layers.selectedGroup !== selectedGroup), tap(selectedGroup => multiChartViewModel.updateLocalChartInfo(chartId, {
        layers: {
            ...multiChartViewModel.getSelectedChartInfo().layers,
            selectedGroup,
        },
    })));
    //#endregion
    const effects = merge(addDefaultGroupToLayerItemsEffect, moveAddedDrawingToSelectedGroupEffect, syncSelectedGroupToMultiChartChartsEffect, selectSelectedGroupEffect, switchGroupOnInstrumentEffect);
    return sink.newSink(callTracerProxy('drawingGroupsViewModel', {
        groups,
        selectedGroup,
        createAndSelectGroup,
        selectGroup: setSelectedGroup,
        deleteGroup,
    }), effects);
});
