import { CHART_UUID, CanvasElement } from '@devexperts/dxcharts-lite/dist/chart/canvas/canvas-bounds-container';
import { cloneUnsafe } from '@devexperts/dxcharts-lite/dist/chart/utils/object.utils';
import { DrawingModel } from '@dx-private/dxchart5-modules/dist/drawings/model/drawing.model';
import { array, either, option, record } from 'fp-ts';
import { observable } from 'fp-ts-rxjs';
import { none, some } from 'fp-ts/Option';
import { snd } from 'fp-ts/Tuple';
import { constFalse, constVoid, identity, pipe } from 'fp-ts/function';
import { BehaviorSubject, merge, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, shareReplay, skip, take, tap, withLatestFrom, } from 'rxjs/operators';
import { context } from '../../../context/context2';
import { createAdapter } from '../../../utils/adapter.utils';
import { callTracerProxy } from '../../../utils/debug/call-tracer';
import { createPropertyAdapter } from '../../../utils/property.utils';
import { sink } from '../../../utils/sink';
import { drawingTypeArrayEq, isAvailableDrawing, isAvailableDrawingModel, isEditableTextDrawingType, isIconDrawingModel, isTextDrawing, } from '../../model/drawing.model';
export const createDrawingViewModel = context.combine(context.key()('chart'), context.key()('iconsPool'), context.key()('multiChartViewModel'), context.key()('notificationVM'), context.key()('localization'), context.key()('userDataViewModel'), context.key()('actionsHistoryVM'), context.key()('initialDrawings'), context.key()('availableDrawings'), context.key()('initialConfig'), context.key()('chartId'), context.key()('chartReactConfig'), context.key()('drawingSyncVM'), context.key()('chartDataViewModel'), context.key()('dataLoaderVM'), (chart, iconsPool, multiChartViewModel, notificationVM, localization, userDataVM, actionsHistoryVM, initialDrawings, availableDrawings, initialConfig, chartId, chartReactConfig, drawingSyncVM, chartDataViewModel, dataLoaderVM) => {
    //#region state
    const config = cloneUnsafe(initialConfig);
    const [setExistingDrawingSettings, existingDrawingSettingsEvent] = createAdapter();
    const [changeMode, drawingMode] = createPropertyAdapter(defaultMode);
    const [setCurrentEditableDrawing, currentEditableDrawing] = createPropertyAdapter(option.none);
    const [changeVisibility, isVisible] = createAdapter();
    const [disableDrawings, isDisabled] = createPropertyAdapter(true);
    const [resetChanges, resetChangesEvent] = createAdapter();
    const [toggleSettingsPopup, isSettingsPopupOpened] = createPropertyAdapter(false);
    const [togglePopover, isPopoverOpened] = createPropertyAdapter(false);
    const hasDrawingsBehavior = new BehaviorSubject(areDrawingsOnChart());
    const [setToolbarPositionPercents, toolbarPositionPercents] = createPropertyAdapter(userDataVM.userData.getValue().positions.drawingsToolbar);
    const [setToolbarPositionPixels, toolbarPositionPixels] = createPropertyAdapter({
        top: 0,
        left: 0,
    });
    const [setToolbarWidth, toolbarWidth] = createPropertyAdapter(0);
    const [setChartBounds, chartBounds] = createPropertyAdapter(chart.canvasBoundsContainer.getBounds(CanvasElement.PANE_UUID(CHART_UUID)));
    const [, drawingGroups] = createPropertyAdapter(chartReactConfig.drawings.drawingsList);
    const [setFavoriteDrawings, favoriteDrawings] = createPropertyAdapter([]);
    const [_setDrawings, drawings] = createPropertyAdapter(initialDrawings);
    const RECENT_DRAWINGS_QUEUE_SIZE = 10;
    const [_setRecentDrawings, recentDrawingsQ] = createPropertyAdapter([]);
    const [setDrawingsLimitReached, isDrawingsLimitReached] = createPropertyAdapter(getIsDrawingsLimitReached(multiChartViewModel, chartReactConfig), () => false);
    const onFigureMoved = chart.drawings.model.events.drawingMoved.pipe(debounceTime(100), withLatestFrom(drawingMode), map(snd), filter(isEditDrawingMode), map(drawingMode => toDrawingWithUpdatedKeypoints(drawingMode.drawing, chart)), distinctUntilChanged(), shareReplay({ refCount: true, bufferSize: 1 }));
    //#endregion
    //#region methods
    const clearDrawings = () => chart.drawings.removeInstrumentDrawings();
    const cancelDrawing = () => {
        chart.drawings.cancelDrawing();
        changeMode(defaultMode);
    };
    function areDrawingsOnChart() {
        const chartInfo = multiChartViewModel.getSelectedChartInfo();
        const { drawings, instrument } = chartInfo;
        return pipe(instrument, option.map(instrument => (drawings[instrument] ? drawings[instrument].length !== 0 : false)), option.getOrElse(constFalse));
    }
    const updateToolbarPositionPercents = (pos) => {
        setToolbarPositionPercents(pos);
    };
    const updateToolbarWidth = (width) => {
        if (width > 0 && width !== toolbarWidth.getValue()) {
            setToolbarWidth(width);
        }
    };
    const pixelsPositionInPercent = (pos) => {
        const y = pos.top;
        const x = pos.left;
        // Get shift in percents and update state to save in layout
        const bounds = chartBounds.getValue();
        const top = (y / bounds.height) * 100;
        const leftSpace = bounds.width - toolbarWidth.getValue();
        const leftSpaceEmpty = leftSpace - x;
        const left = 100 - (leftSpaceEmpty / leftSpace) * 100;
        return { top, left };
    };
    const percentPositionInPixels = () => {
        // Get shift in pixels to place drawing on chart
        const bounds = chartBounds.getValue();
        const pos = toolbarPositionPercents.getValue();
        const top = (bounds.height * pos.top) / 100;
        const left = (pos.left * (bounds.width - toolbarWidth.getValue())) / 100;
        setToolbarPositionPixels({ top, left });
    };
    const handleDrag = (pos) => {
        const position = pixelsPositionInPercent(pos);
        userDataVM.updateWidgetPosition('drawingsToolbar', position);
        updateToolbarPositionPercents(position);
    };
    const setDrawings = (drawings) => {
        chart.drawings.setDrawings(drawings);
    };
    const startNewIconDrawing = (iconType) => {
        const properties = config['icon'].properties;
        const [w, h, , , svg] = iconsPool[iconType];
        const overridedProps = {
            ...properties,
            icon: {
                name: iconType,
                svg,
                w,
                h,
            },
        };
        startDrawing('icon', overridedProps);
    };
    const startNewDrawingWithCheckIfAsCurrent = (drawingType) => {
        // icon has it's own special handler
        if (drawingType === 'icon') {
            return;
        }
        // firstly check if the drawing is the same as currentEditableDrawing
        // if yes => cancel current drawing
        // if not => cancel current drawing and starts new one
        pipe(currentEditableDrawing.getValue(), option.fold(() => startNewDrawing(drawingType), drawing => pipe(drawing.type, option.fromPredicate(t => t === drawingType), option.fold(() => startNewDrawing(drawingType), () => cancelDrawing()))));
    };
    const startNewDrawing = (drawingType) => {
        if (isEditableTextDrawingType(drawingType)) {
            const properties = cloneUnsafe(config[drawingType].properties);
            properties.textValue = '';
            startDrawing(drawingType, properties);
        }
        else {
            const properties = cloneUnsafe(config[drawingType].properties);
            startDrawing(drawingType, properties);
        }
    };
    const startDrawing = (type, properties) => {
        // Cancel previously started drawing
        cancelDrawing();
        if (isSettingsPopupOpened.getValue()) {
            toggleSettingsPopup(false);
        }
        if (getIsDrawingsLimitReached(multiChartViewModel, chartReactConfig)) {
            setDrawingsLimitReached(true);
            return;
        }
        setDrawingsLimitReached(false);
        const newDrawingConfig = chart.drawings.startDrawing({
            type,
            properties,
            synced: drawingSyncVM.isDrawingSyncEnabled.getValue(),
        });
        const drawing = new DrawingModel(newDrawingConfig.id, chart.drawings.getDrawing(newDrawingConfig.id)?.htId ?? 0, type, newDrawingConfig.keyPoints || [], newDrawingConfig.properties);
        setExistingDrawingSettings(some(copyDrawing(drawing)));
        changeMode(editDrawingMode(drawing));
    };
    const createNewDrawingModeDrawing = (prevDrawing) => {
        if (isIconDrawingModel(prevDrawing)) {
            startNewIconDrawing(prevDrawing.properties.icon.name);
        }
        else {
            startNewDrawing(prevDrawing.type);
        }
        pipe(chart.drawings._getDrawings(), record.map(d => {
            const newDrawingModeDrawing = d[d.length - 1];
            if (newDrawingModeDrawing &&
                isAvailableDrawingModel(newDrawingModeDrawing) &&
                !isDrawingsLimitReached.getValue()) {
                cancelDrawing();
                changeMode(editDrawingMode(newDrawingModeDrawing));
            }
        }));
    };
    const removeDrawing = (drawing) => {
        chart.drawings.removeDrawing(drawing.id);
        cancelDrawing();
    };
    const updateDrawing = (drawing) => {
        config[drawing.type].properties = drawing.properties;
        chart.drawings.updateDrawing(drawing);
        updateDrawingModel(drawing);
    };
    const updateDrawingModel = (drawing) => {
        const updatedDrawing = copyDrawing(drawing);
        changeMode(editDrawingMode(updatedDrawing));
    };
    const toggleDrawingVisibility = (drawing, visible) => {
        drawing.visible = visible;
        updateDrawing(drawing);
    };
    const toggleDrawingLocked = (drawing, locked) => {
        drawing.locked = locked;
        updateDrawing(drawing);
    };
    const onFavorite = (name) => {
        const currentFavoriteDrawings = favoriteDrawings.getValue();
        setFavoriteDrawings([...currentFavoriteDrawings, name]);
    };
    const onUnFavorite = (name) => pipe(favoriteDrawings.getValue(), array.filter(drawing => drawing !== name), setFavoriteDrawings);
    const sendMagnetModeNotification = (value) => {
        notificationVM.sendNotification(!value
            ? localization.notifications.notificationSidebarMagnetOn
            : localization.notifications.notificationSidebarMagnetOff);
    };
    const sendDrawingModeNotification = (value) => {
        notificationVM.sendNotification(!value
            ? localization.notifications.notificationSidebarDrawingOn
            : localization.notifications.notificationSidebarDrawingOff);
    };
    const sendDeleteDrawingsNotification = () => {
        notificationVM.sendNotification(localization.notifications.notificationSidebarDelete);
    };
    const updateDrawingsUndoable = (updatedDrawings) => {
        const prevDrawing = multiChartViewModel.getSelectedChartInfo().drawings;
        let isFirstRun = true;
        const action = (drawings) => {
            !isFirstRun && setDrawings(drawings);
            isFirstRun = false;
            multiChartViewModel.updateLocalChartInfo(chartId, {
                drawings,
            });
            _setDrawings(drawings);
        };
        const redo = () => action(updatedDrawings);
        const undo = () => action(prevDrawing);
        actionsHistoryVM.pushAction({
            redo,
            undo,
            type: 'drawings_update',
        });
    };
    const getUpdatedDrawings = () => pipe(chart.drawings.getDrawings(), record.map(drawings => drawings
        .filter(isAvailableDrawing)
        .filter(d => !d._internalDrawing.isAdding())
        .map(d => ({
        ...d,
        keyPoints: d.keyPoints.map(kp => ({
            ...kp,
            value: parseFloat(chart.data.chartModel.pane.regularFormatter(kp.value)),
        })),
    }))));
    //#endregion
    //#region effects
    // set initial drawings to chart
    // TODO think how to call effect only once on vm init without sub on `drawings`
    const setInitialDrawingsEffect = drawings.pipe(take(1), tap(() => setDrawings(initialDrawings)));
    const setExistingDrawingSettingsEffect = onFigureMoved.pipe(tap(updatedDrawing => {
        if (option.isSome(updatedDrawing) && !isSettingsPopupOpened.getValue()) {
            setExistingDrawingSettings(some(copyDrawing(updatedDrawing.value)));
        }
    }));
    const observeBoundsEffect = pipe(chart.canvasBoundsContainer.observeBoundsChanged(CanvasElement.PANE_UUID(CHART_UUID)), filter(value => value !== chartBounds.getValue()), tap(setChartBounds));
    const observeChartBoundsEffect = pipe(chartBounds, tap(percentPositionInPixels));
    const observeToolbarWidthEffect = pipe(toolbarWidth, tap(percentPositionInPixels));
    const observeSelectedChartEffect = pipe(multiChartViewModel.selectedChartId, tap(id => {
        const position = userDataVM.userData.getValue().positions.drawingsToolbar;
        setToolbarPositionPercents(position);
        multiChartViewModel.charts.getValue().forEach(chart => {
            if (chart.id !== id) {
                chart.drawings.cancelDrawing();
            }
        });
    }));
    const setPositionInPixelsEffect = pipe(toolbarPositionPercents, tap(percentPositionInPixels));
    const currentEditableDrawingEffect = pipe(merge(pipe(drawingMode, observable.map(mode => pipe(mode, option.fromPredicate(isEditDrawingMode), option.map(mode => mode.drawing)))), onFigureMoved), tap(setCurrentEditableDrawing));
    const resetChangesEffect = resetChangesEvent.pipe(withLatestFrom(existingDrawingSettingsEvent), tap(([, drawing]) => {
        option.fold(constVoid, (someDrawing) => {
            const drawingCopy = new DrawingModel(someDrawing.id, someDrawing.htId, someDrawing.type, someDrawing.keyPoints, initialConfig[someDrawing.type].properties, someDrawing.visible);
            drawingCopy.figure.data = someDrawing.figure.data;
            updateDrawing(drawingCopy);
            const updatedDrawings = getUpdatedDrawings();
            setDrawings(updatedDrawings);
        })(drawing);
    }));
    const updateRecentDrawingsEffect = pipe(chart.drawings.model.events.drawingFinished, filter(isAvailableDrawingModel), tap(drawing => pipe(recentDrawingsQ.getValue(), 
    // check if this type of drawing already exists in the queue
    option.fromPredicate(queue => option.isNone(pipe(queue, array.findFirst(existing => existing === drawing.type)))), option.fold(constVoid, queue => 
    // if not, proceed further
    pipe(queue, 
    // if queue size is already MAX, then we need to pop first element out of the queue
    either.fromPredicate(queue => array.size(queue) < RECENT_DRAWINGS_QUEUE_SIZE, identity), either.fold(array.dropLeft(1), identity), array.append(drawing.type), _setRecentDrawings)))));
    const drawingDoneEffect = pipe(chart.drawings.model.events.drawingFinished, filter(isAvailableDrawingModel), tap(drawing => {
        setExistingDrawingSettings(some(copyDrawing(drawing)));
        if (multiChartViewModel.state.getValue().drawingMode && !isEditableTextDrawingType(drawing.type)) {
            createNewDrawingModeDrawing(drawing);
        }
    }));
    const selectFigureEffect = pipe(chart.drawings.model.events.drawingSelected, map(option.fromNullable), tap(drawing => pipe(drawing, option.fold(() => changeMode(defaultMode), drawing => {
        if (isAvailableDrawingModel(drawing)) {
            setExistingDrawingSettings(some(copyDrawing(drawing)));
            changeMode(editDrawingMode(drawing));
        }
    }))));
    const dblClickOnDrawingEffect = pipe(chart.drawings.model.events.drawingDblClick, map(option.fromNullable), tap(drawing => pipe(drawing, option.fold(() => changeMode(defaultMode), drawing => {
        if (isAvailableDrawingModel(drawing)) {
            changeMode(editDrawingMode(drawing));
            if (!isTextDrawing(drawing.type)) {
                setExistingDrawingSettings(some(copyDrawing(drawing)));
                toggleSettingsPopup(true);
            }
        }
    }))));
    const drawingModifiedEffect = chart.drawings.model.events.drawingModified.pipe(tap(drawing => isAvailableDrawingModel(drawing) && updateDrawingModel(drawing)));
    const syncCurrentEditableDrawingSettingsEffect = chart.drawings.observeDrawingsUpdated().pipe(tap(drawings => pipe(currentEditableDrawing.getValue(), option.fold(constVoid, curr => pipe(drawings, array.findFirst(d => d.id === curr.id), option.fold(constVoid, match => {
        if (isAvailableDrawingModel(match)) {
            const drawingCopy = new DrawingModel(match.id, match.htId, match.type, match.keyPoints, match.properties, match.visible, match.locked);
            changeMode(editDrawingMode(drawingCopy));
        }
    }))))));
    const updateDrawingsEffect = chart.drawings.observeDrawingsUpdated().pipe(tap(drawingsForInstrument => {
        hasDrawingsBehavior.next(drawingsForInstrument.length !== 0);
    }));
    const removeDrawingsEffect = chart.drawings.observeDrawingRemoved().pipe(tap(() => {
        cancelDrawing();
    }));
    const changeVisibilityEffect = isVisible.pipe(tap(isVisible => chart.drawings.setVisible(isVisible)));
    const temporaryDisableDrawingsEffect = pipe(combineLatest([
        pipe(dataLoaderVM.isLoading, distinctUntilChanged()),
        pipe(chartDataViewModel.historicalCandlesUpdated, observable.map(historyData => historyData.length === 0), distinctUntilChanged()),
    ]), tap(([isLoading, dataEmpty]) => disableDrawings(isLoading || dataEmpty)));
    const updateLayoutWithDrawingsEffect = pipe(merge(chart.drawings.observeDrawingsUpdated(), pipe(drawingSyncVM.saveDrawings, 
    // only dependent charts are allowed to process updates from multichart
    observable.filter(_ => multiChartViewModel.selectedChartId.getValue() !== chartId))), tap(_ => {
        const updatedDrawings = getUpdatedDrawings();
        updateDrawingsUndoable(updatedDrawings);
    }));
    const syncFavoriteDrawingsToUserDataEffect = pipe(favoriteDrawings, skip(1), observable.filter(drawings => !drawingTypeArrayEq.equals(drawings, userDataVM.userData.getValue().favoriteDrawings)), tap(userDataVM.updateFavoriteDrawings));
    const syncFavoriteDrawingsFromUserDataEffect = pipe(userDataVM.userData, observable.map(ud => ud.favoriteDrawings), observable.filter(drawings => drawings.length !== favoriteDrawings.getValue().length), observable.filter(drawings => !drawingTypeArrayEq.equals(drawings, favoriteDrawings.getValue())), tap(setFavoriteDrawings));
    const syncRecentDrawingsToUserDataEffect = pipe(recentDrawingsQ, 
    // skip initial recentDrawingsQ value
    // @see - BehaviourSubject initializes with the value you passed into
    // the constructor, and we don't want userData to be overriden with this value
    // because most of the time it's just some default value
    skip(1), observable.filter(drawings => !drawingTypeArrayEq.equals(drawings, userDataVM.userData.getValue().recentDrawings)), tap(userDataVM.updateRecentDrawings));
    const syncRecentDrawingsFromUserDataEffect = pipe(userDataVM.userData, observable.map(ud => ud.recentDrawings), observable.filter(drawings => drawings.length !== recentDrawingsQ.getValue().length), observable.filter(drawings => !drawingTypeArrayEq.equals(drawings, recentDrawingsQ.getValue())), tap(_setRecentDrawings));
    //#region multichart effects - https://jira.in.devexperts.com/browse/DXREQ-23289
    const syncDrawingsSaveToMultichartEffect = pipe(merge(chart.drawings.observeDrawingsUpdated(), chart.drawings.model.events.drawingFinished), 
    // only selected chart is allowed to send updates to multichart
    observable.filter(_ => multiChartViewModel.selectedChartId.getValue() === chartId), tap(_ => {
        drawingSyncVM.saveDrawings.next();
    }));
    const syncDrawingUpdateToMultichartEffect = pipe(merge(chart.drawings.model.events.drawingMoved, chart.drawings.model.events.drawingModified, chart.drawings.model.events.drawingSelected, chart.drawings.model.events.drawingFinished), 
    // only selected chart is allowed to send updates to multichart
    observable.filter(_ => multiChartViewModel.selectedChartId.getValue() === chartId), tap(drawing => {
        if (drawing === null) {
            drawingSyncVM.syncedDrawingUpdated.next(drawing);
            // sync only main chart drawings - it's explicit requirement
        }
        else if (isAvailableDrawingModel(drawing) && drawing.paneId === CHART_UUID && drawing.synced) {
            drawingSyncVM.syncedDrawingUpdated.next(drawing);
        }
    }));
    const syncDrawingDeleteToMultichartEffect = pipe(chart.drawings.model.events.drawingRemoved, 
    // only selected chart is allowed to send updates to multichart
    observable.filter(_ => multiChartViewModel.selectedChartId.getValue() === chartId), tap(drawings => {
        drawings.forEach(drawing => {
            // sync only main chart drawings - it's explicit requirement
            if (isAvailableDrawingModel(drawing) && drawing.paneId === CHART_UUID && drawing.synced) {
                drawingSyncVM.syncedDrawingRemoved.next(drawing);
            }
        });
    }));
    const syncDrawingDeleteFromMultichartEffect = pipe(drawingSyncVM.syncedDrawingRemoved, 
    // only dependent charts are allowed to process updates from multichart
    observable.filter(_ => multiChartViewModel.selectedChartId.getValue() !== chartId), tap(drawing => {
        chart.drawings.removeDrawing(drawing.id);
    }));
    const syncDrawingUpdateFromMultichartEffect = pipe(drawingSyncVM.syncedDrawingUpdated, 
    // only dependent charts are allowed to process updates from multichart
    observable.filter(_ => multiChartViewModel.selectedChartId.getValue() !== chartId), observable.map(cloneUnsafe), tap(drawing => {
        pipe(multiChartViewModel.getSelectedChartInfo().instrument, option.fold(() => changeMode(defaultMode), selectedChartInstrument => {
            if (chart.drawings.model.instrumentCode === selectedChartInstrument) {
                // TODO possible perf issue bcs of toolbar rerender on every drawing move
                drawing !== null && changeMode(editDrawingMode(drawing));
                chart.drawings.setActiveDrawing(drawing);
            }
            else {
                drawing !== null && chart.drawings.setDrawing(selectedChartInstrument, drawing);
            }
        }));
    }));
    const syncDrawingsRemovePaneEffect = pipe(chart.paneManager.paneRemovedSubject, tap(pane => {
        const chartInfo = multiChartViewModel.getSelectedChartInfo();
        const { drawings, instrument } = chartInfo;
        pipe(instrument, option.chain(symbol => pipe(drawings, record.lookup(symbol))), option.fold(constVoid, drawingsBySymbol => {
            drawingsBySymbol.forEach(d => d._internalDrawing.paneId === pane.uuid && removeDrawing(d._internalDrawing));
            updateDrawingsUndoable(getUpdatedDrawings());
        }));
    }));
    //#endregion
    //#endregion
    const effects = merge(updateLayoutWithDrawingsEffect, changeVisibilityEffect, temporaryDisableDrawingsEffect, resetChangesEffect, updateDrawingsEffect, removeDrawingsEffect, drawingModifiedEffect, setExistingDrawingSettingsEffect, selectFigureEffect, setPositionInPixelsEffect, observeBoundsEffect, observeToolbarWidthEffect, observeChartBoundsEffect, observeSelectedChartEffect, syncFavoriteDrawingsToUserDataEffect, syncFavoriteDrawingsFromUserDataEffect, currentEditableDrawingEffect, drawingDoneEffect, dblClickOnDrawingEffect, syncCurrentEditableDrawingSettingsEffect, setInitialDrawingsEffect, syncDrawingUpdateToMultichartEffect, syncDrawingDeleteToMultichartEffect, syncDrawingUpdateFromMultichartEffect, syncDrawingDeleteFromMultichartEffect, syncDrawingsSaveToMultichartEffect, syncDrawingsRemovePaneEffect, updateRecentDrawingsEffect, syncRecentDrawingsToUserDataEffect, syncRecentDrawingsFromUserDataEffect);
    return sink.newSink(callTracerProxy('drawingViewModel', {
        availableDrawings,
        drawingMode,
        drawings,
        isVisible,
        isDisabled,
        currentEditableDrawing,
        doesChartHaveDrawings: hasDrawingsBehavior.asObservable(),
        isSettingsPopupOpened,
        isPopoverOpened,
        iconDrawingIcons: iconsPool,
        toolbarPositionPixels,
        chartBounds,
        toolbarWidth,
        favoriteDrawings,
        drawingGroups,
        isDrawingsLimitReached,
        recentDrawings: recentDrawingsQ,
        clearDrawings,
        setDrawings,
        changeVisibility,
        cancelDrawing,
        startNewDrawing: startNewDrawingWithCheckIfAsCurrent,
        startNewIconDrawing,
        updateDrawing,
        removeDrawing,
        resetChanges,
        toggleSettingsPopup,
        togglePopover,
        handleDrag,
        updateToolbarWidth,
        sendMagnetModeNotification,
        sendDrawingModeNotification,
        sendDeleteDrawingsNotification,
        onFavorite,
        onUnFavorite,
        changeMode,
        toggleDrawingVisibility,
        toggleDrawingLocked,
    }), effects);
});
const getIsDrawingsLimitReached = (multiChartViewModel, chartReactConfig) => {
    const chartInfo = multiChartViewModel.getSelectedChartInfo();
    const { drawings, instrument } = chartInfo;
    const currentInstrumentDrawingsLength = pipe(instrument, option.map(instrument => (drawings[instrument] ? drawings[instrument].length : 0)), option.getOrElse(() => 0));
    return currentInstrumentDrawingsLength >= chartReactConfig.drawings.limitOfDrawings;
};
export const editDrawingMode = (drawing) => ({
    mode: 'EditDrawing',
    drawing,
});
export const isEditDrawingMode = (mode) => mode.mode === 'EditDrawing';
export const defaultMode = { mode: 'Default' };
export const isDefaultMode = (mode) => mode.mode === 'Default';
export function copyDrawing(model) {
    const copiedDrawingModel = new DrawingModel(model.id, model.htId, model.type, model.keyPoints, model.properties, model.visible, model.locked, model.synced, model.getPane);
    copiedDrawingModel.hidden = model.hidden;
    return copiedDrawingModel;
}
const toDrawingWithUpdatedKeypoints = (drawingModel, chart) => {
    if (!chart.chartModel.mainCandleSeries.instrument.symbol) {
        return none;
    }
    const drawings = chart.drawings.getDrawings()[chart.chartModel.mainCandleSeries.instrument.symbol];
    if (Array.isArray(drawings)) {
        return pipe(drawings, array.findFirst(drawings => drawings.id === drawingModel.id), option.map(drawing => {
            const newDrawing = new DrawingModel(drawingModel.id, drawingModel.htId, drawingModel.type, drawing.keyPoints, drawingModel.properties, drawingModel.visible);
            newDrawing.figure.data = drawingModel.figure.data;
            newDrawing.hidden = drawingModel.hidden;
            return newDrawing;
        }));
    }
    else {
        return none;
    }
};
