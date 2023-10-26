import { uuid } from '@devexperts/dxcharts-lite/dist/chart/utils/uuid.utils';
import { moveInArray } from '@devexperts/dxcharts-lite/dist/chart/utils/array.utils';
import { findChanges } from '@dx-private/dxchart5-modules/dist/studies/model/studies.model';
import { array, option } from 'fp-ts';
import { observable } from 'fp-ts-rxjs';
import { findFirst } from 'fp-ts/Array';
import { constVoid, identity, pipe } from 'fp-ts/function';
import { some } from 'fp-ts/Option';
import { deleteAt, keys, upsertAt } from 'fp-ts/Record';
import { combineLatest, merge, throttleTime } from 'rxjs';
import { defaultIfEmpty, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { DEFAULT_STUDIES_LIST } from '../../../config/studies-list';
import { context } from '../../../context/context2';
import { newSink } from '../../../context/sink2';
import { callTracerProxy } from '../../../utils/debug/call-tracer';
import { createPropertyAdapter } from '../../../utils/property.utils';
import { toRawStudiesSettings } from '../../model/studies.model';
export const createStudiesSettingsViewModel = context.combine(context.key()('chart'), context.key()('multiChartViewModel'), context.key()('chartConfiguratorViewModel'), context.key()('studiesDataProvider'), context.key()('dxScriptEditViewModel'), context.key()('dxStudiesProvider'), context.key()('actionsHistoryVM'), context.key()('chartReactConfig'), context.key()('localization'), context.key()('chartId'), (chart, multiChartViewModel, chartConfiguratorViewModel, studiesDataProvider, dxScriptEditViewModel, dxStudiesProvider, actionsHistoryVM, chartReactConfig, localization, chartId) => {
    const filterCurrentChart = () => observable.filter(() => chartId === multiChartViewModel.selectedChartId.getValue());
    //#region state
    const getCommittedStudies = () => multiChartViewModel.getChartInfo(chartId).studies;
    const currentStudies = getCommittedStudies();
    // added studies is local state, which is not committed to multichart model, so it can be reverted
    const [_setAddedStudies, addedStudies] = createPropertyAdapter(currentStudies);
    const [setIsOpened, isOpened] = createPropertyAdapter(false);
    const [setSelectedStudy, selectedStudy] = createPropertyAdapter('');
    const [setStudiesData, studiesData] = createPropertyAdapter({});
    const [setPrevStudiesConfig, prevStudiesConfig] = createPropertyAdapter([]);
    const [, maxSelectedStudiesCount] = createPropertyAdapter(chartReactConfig.studies.maxSelectedStudiesCount);
    const setAddedStudies = (studies) => {
        commit(studies);
    };
    //#endregion
    //#region studies-vm methods
    const updateCurrentStudies = (studies) => {
        _setAddedStudies(studies);
        multiChartViewModel.updateLocalChartInfo(chartId, { studies });
    };
    const commit = (studies) => {
        const isSyncEnabled = multiChartViewModel.state.getValue().isStudiesSyncEnabled;
        const action = (actionStudies) => {
            if (isSyncEnabled) {
                multiChartViewModel.setStudies(actionStudies);
            }
            else {
                updateCurrentStudies(actionStudies);
            }
        };
        const prevStudies = addedStudies.getValue();
        const redo = () => action(studies);
        const undo = () => action(prevStudies);
        actionsHistoryVM.pushAction({
            type: 'studies_change',
            redo,
            undo,
        });
    };
    const handlePopupOpen = setIsOpened;
    const onSave = () => handlePopupOpen(false);
    const onClose = () => handlePopupOpen(false);
    const onOpen = () => handlePopupOpen(true);
    const updateStudiesData = (study) => {
        // TODO think how to make sure that this method is called only after studies calculators are updated
        // update calculators and then update studies data both depends on candlesSet & candlesUpdated subjects
        // for now there is hack which will start update studies data in the end of the current event loop
        queueMicrotask(() => {
            studiesDataProvider
                .calculateStudy(study, {
                chartId,
                addedStudies: addedStudies.getValue(),
            })
                .then(data => {
                setStudiesData(pipe(studiesData.getValue(), upsertAt(study.uuid, data)));
            });
        });
    };
    const updateStudiesConfig = (studiesConfig) => {
        // TODO get rid of "Raw" studies, make both models match; then replace DEFAULT_STUDIES_LIST with dxStudiesProvider.getStudies()
        const rawStudiesConfig = studiesConfig.map(toRawStudiesSettings(DEFAULT_STUDIES_LIST(localization.studies)));
        const overlayStudiesList = rawStudiesConfig.filter(study => study.overlaying);
        const underlayStudiesList = rawStudiesConfig.filter(study => !study.overlaying);
        const sortedStudiesList = overlayStudiesList.concat(underlayStudiesList);
        const currentConfigs = sortedStudiesList.map(study => ({
            ...study,
            calculateFutureData: study.calculateFutureData ?? false,
            uuid: study.uuid ?? study.id,
        }));
        const prevConfigs = prevStudiesConfig.getValue();
        const [added, removed, updateNeeded] = findChanges(prevConfigs, currentConfigs);
        chart.studies.updateStudyConfig(currentConfigs);
        added.concat(updateNeeded).forEach(s => {
            const chartStudy = chart.studies.model.allStudies[s.uuid];
            // if config inputs are changed, we need to recalculate all the data
            if (chartStudy) {
                chartStudy.outdatedData = true;
            }
            updateStudiesData(s);
        });
        removed.forEach(study => {
            setStudiesData(pipe(studiesData.getValue(), deleteAt(study.uuid)));
            const studyOnChart = dxStudiesProvider.getStudies().find(s => s.id === study.id);
            if (studyOnChart && studyOnChart.type === 'dxScript') {
                dxScriptEditViewModel.removeFromChart(study.id);
            }
        });
        setPrevStudiesConfig(currentConfigs);
    };
    const onConfigureStudy = (studyUUID) => {
        onOpen();
        setSelectedStudy(studyUUID);
    };
    const doAddStudy = (study, insertIndex) => {
        const addedStudiesValue = addedStudies.getValue();
        const maxSelectedStudiesCountValue = maxSelectedStudiesCount.getValue();
        const isAlreadyAdded = addedStudiesValue.reduce((is, editingStudy) => is || editingStudy.uuid === study.uuid, false);
        if (!isAlreadyAdded && addedStudiesValue.length < maxSelectedStudiesCountValue) {
            if (insertIndex !== undefined) {
                setAddedStudies([
                    ...addedStudiesValue.slice(0, insertIndex),
                    study,
                    ...addedStudiesValue.slice(insertIndex),
                ]);
            }
            else {
                setAddedStudies([...addedStudiesValue, study]);
            }
            setSelectedStudy(study.uuid);
        }
    };
    const onReorderStudies = (startIndex, endIndex) => {
        const addedStudiesValue = addedStudies.getValue();
        _setAddedStudies(moveInArray(addedStudiesValue, startIndex, endIndex));
    };
    const onAddedStudy = (id, insertIndex, overlaying, beforeAdd = constVoid) => pipe(dxStudiesProvider.getStudies(), findFirst((x) => x.id === id), option.fold(constVoid, study => pipe(study, option.fromPredicate(study => study.type === 'dxScript'), option.fold(() => {
        const updatedStudy = {
            ...study,
            overlaying: overlaying ?? study.overlaying,
            uuid: uuid(),
        };
        beforeAdd();
        doAddStudy(updatedStudy, insertIndex);
    }, scriptStudy => pipe(scriptStudy, dxScriptEditViewModel.compileScriptStudy, observable.filterMap(identity), tap(updatedStudy => {
        beforeAdd();
        doAddStudy({ ...updatedStudy, overlaying: overlaying ?? study.overlaying }, insertIndex);
        // scripts that was added within a script editor should always be commited
        dxScriptEditViewModel.onAddedOnChart(id);
    })).subscribe()))));
    const onRemoveStudy = (uuid) => pipe(addedStudies.getValue(), array.filter(x => x.uuid !== uuid), setAddedStudies);
    const onChangeStudy = (settings) => pipe(addedStudies.getValue(), array.map(x => (x.uuid === settings.uuid ? settings : x)), setAddedStudies);
    const onChangeStudyName = (settings) => pipe(addedStudies.getValue(), array.map(x => (x.id === settings.id ? { ...x, title: settings.title } : x)), setAddedStudies);
    const onRemoveAllStudies = () => {
        setAddedStudies([]);
    };
    const setStudies = (studies) => pipe(studies, array.map(study => pipe(study, option.fromPredicate(study => study.type === 'dxScript'), option.fold(() => observable.of(some({ ...study, uuid: uuid() })), () => pipe({ ...study, uuid: uuid() }, dxScriptEditViewModel.compileScriptStudy)))), observables => combineLatest(observables), defaultIfEmpty([]), observable.map(array.filterMap(identity)), tap(commit)).subscribe();
    const duplicateStudy = (studyUUID) => pipe(addedStudies.getValue(), array.findFirst(study => study.uuid === studyUUID), option.map(s => ({ ...s, uuid: uuid() })), option.map(study => pipe(addedStudies.getValue(), array.append(study))), option.fold(constVoid, setAddedStudies));
    //#endregion
    const setStudiesByIds = (studyIds) => pipe(dxStudiesProvider.getStudies(), array.filterMap(s => (studyIds.find(id => s.id === id) ? option.some(s) : option.none)), setStudies);
    const studies$ = dxStudiesProvider.observeStudies();
    //#region effects
    const updateStudiesNamesEffect = studies$.pipe(tap(studies => {
        const added = addedStudies.getValue();
        studies.filter(s => added.find(a => a.id === s.id && a.title !== s.title)).forEach(onChangeStudyName);
    }));
    const syncStudiesFromMultiChartEffect = pipe(multiChartViewModel.state, observable.filter(s => s.isStudiesSyncEnabled), observable.map(s => s.lastStudies), filter(studies => studies !== addedStudies.getValue()), tap(updateCurrentStudies));
    const updateStudiesConfigEffect = pipe(addedStudies, tap(updateStudiesConfig));
    const recalculateStudiesDataEffect = merge(
    // when chart right padding is changed we need to update studies to update a predicted values
    pipe(chartConfiguratorViewModel.state, observable.map(s => s.settings.chartCore.components.offsets.right), distinctUntilChanged()), chart.chartModel.candlesUpdatedSubject.asObservable()).pipe(tap(_ => prevStudiesConfig.getValue().forEach(updateStudiesData)));
    const recalculateStudiesDataOnCandlesSetEffect = pipe(chart.chartModel.candlesSetSubject.asObservable(), tap(_ => {
        prevStudiesConfig.getValue().forEach(prevStudy => {
            const empty = [];
            // clean study after new candles set
            setStudiesData(pipe(studiesData.getValue(), upsertAt(prevStudy.uuid, empty)));
            updateStudiesData(prevStudy);
        });
    }));
    const updateStudyDataEffect = studiesData.pipe(
    // studies provider sends multiple subsequent updates
    // to reduce amount of code call we use throttle time
    // throttle is needed because we need to immediately queue microtask, but ignore rest updates
    throttleTime(10, undefined, { trailing: true, leading: true }), tap(() => {
        queueMicrotask(() => keys(studiesData.getValue()).forEach(uuid => chart.studies.updateStudyData(uuid, studiesData.getValue()[uuid])));
    }));
    const scriptAddedEffect = pipe(dxScriptEditViewModel.lastAddedScript, filterCurrentChart(), tap(study => onAddedStudy(study.id)));
    const scriptUpdatedEffect = pipe(dxScriptEditViewModel.lastUpdatedScript, filterCurrentChart(), observable.map(updatedScript => pipe(addedStudies.getValue(), array.findFirst(script => script.id === updatedScript.id))), observable.filterMap(identity), tap(study => onAddedStudy(study.id, undefined, undefined, () => onRemoveStudy(study.uuid))));
    const syncPriceAxisStudiesFitTochartEffect = pipe(chartConfiguratorViewModel.state, observable.map(s => s.settings.chartReact.scale.fit.studies), distinctUntilChanged(), tap(fitStudies => {
        Object.values(chart.studies.model.overlays).forEach(study => {
            study.dataSeries.forEach(s => (s.config.highLowActive = fitStudies));
        });
        chart.scale.autoScale();
    }));
    //#endregion
    // update studies when VM is initialized
    _setAddedStudies(currentStudies);
    const effects = merge(syncStudiesFromMultiChartEffect, updateStudiesConfigEffect, recalculateStudiesDataEffect, recalculateStudiesDataOnCandlesSetEffect, updateStudyDataEffect, scriptUpdatedEffect, scriptAddedEffect, updateStudiesNamesEffect, syncPriceAxisStudiesFitTochartEffect);
    return newSink(callTracerProxy('studiesSettingsViewModel', {
        studies$,
        addedStudies$: addedStudies,
        selectedStudyUUID$: selectedStudy,
        isOpened$: isOpened,
        onAddedStudy,
        onRemoveStudy,
        onReorderStudies,
        onChangeStudy,
        onRemoveAllStudies,
        onClose,
        onSave,
        onOpen,
        onConfigureStudy,
        setStudies,
        setStudiesByIds,
        duplicateStudy,
    }), effects);
});
