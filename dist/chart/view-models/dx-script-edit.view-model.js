import { uuid } from '@devexperts/dxcharts-lite/dist/chart/utils/uuid.utils';
import { array, option } from 'fp-ts';
import { observable } from 'fp-ts-rxjs';
import { constVoid, pipe } from 'fp-ts/function';
import { combineLatest, EMPTY, from, merge, of } from 'rxjs';
import { debounceTime, map, switchMap, tap } from 'rxjs/operators';
import { context } from '../../context/context2';
import { newSink } from '../../context/sink2';
import { isSuccessCompile, } from '../../providers/dx-script-provider';
import { createAdapter } from '../../utils/adapter.utils';
import { ColorsPool } from '../../utils/colorspool/ColorsPool';
import { callTracerProxy } from '../../utils/debug/call-tracer';
import { createPropertyAdapter } from '../../utils/property.utils';
import { mapScript2StudySettings, mapScriptLines, mapScriptParams } from '../model/dxscript.model';
import { sortStudies } from '../model/studies.model';
export const createDxScriptEditViewModel = context.combine(context.key()('multiChartViewModel'), context.key()('dxStudiesProvider'), context.key()('dxScriptProvider'), context.key()('dxScriptRunner'), context.key()('localization'), context.key()('initialDxScripts'), context.key()('dxScriptKeywords'), (multichartViewModel, dxStudiesProvider, dxScriptProvider, dxScriptRunner, localization, initialDxScripts, keywords) => {
    const emptyCodeError = getEmtptyErrorCode(localization);
    // Looks like a hack
    const [handeLastAddedToChartState, lastAddedOnChartState] = createAdapter();
    // Looks like a hack
    const [handleLastUpdatedOnChartState, lastUpdatedOnChartState] = createAdapter();
    const [handleLastUpdatedScript, lastUpdatedScript] = createAdapter();
    const [handleCompilationError, compilationError] = createAdapter();
    const colorsPool = new ColorsPool(['red', 'blue', 'green', 'orange', 'teal'], 'grey', 'locked');
    const [_setPopups, popups] = createPropertyAdapter(initialDxScripts.map(scriptToPopupState));
    const setPopups = (popups) => _setPopups(updatePopupsOrder(popups));
    const addScriptToList = (script) => setPopups([...popups.getValue(), scriptToPopupState(script)]);
    const removeScriptFromList = (scriptId) => setPopups([...popups.getValue().filter(p => p.dxScript.id !== scriptId)]);
    //#region edit script popup state
    const updatePopupState = (scriptId, update) => pipe(popups.getValue(), array.map(p => p.dxScript.id === scriptId
        ? {
            ...p,
            ...update(p),
        }
        : p), setPopups, () => popups.getValue().find(p => p.dxScript.id === scriptId), option.fromNullable);
    const onPopupOpen = (scriptId) => pipe(
    // we have to fetch script here, because by default there is no guarantee what code is loaded
    dxScriptProvider.getScript(scriptId).then(script => updatePopupState(scriptId, p => ({
        opened: true,
        dxScript: { ...p.dxScript, ...script },
        addButtonDisabled: isCodeEmpty(script?.code),
    }))));
    const onPopupClose = (scriptId) => pipe(updatePopupState(scriptId, () => ({ popupOrder: 0, opened: false })), option.fold(constVoid, p => dxScriptProvider.updateScript(p.dxScript)));
    const changePopupAutoSavingStatus = (scriptId, autoSaving) => updatePopupState(scriptId, () => ({ isAutoSaving: autoSaving }));
    const removeFromChart = (scriptId) => updatePopupState(scriptId, () => ({ addedOnChart: false }));
    const addToChart = (scriptId) => pipe(updatePopupState(scriptId, () => ({ updateButtonDisabled: true, isCompiling: true })), option.fold(constVoid, p => handeLastAddedToChartState(p.dxScript)));
    const updateOnChart = (scriptId) => pipe(updatePopupState(scriptId, () => ({ updateButtonDisabled: true, isCompiling: true })), option.fold(constVoid, p => handleLastUpdatedOnChartState(p.dxScript)));
    const onScriptEdit = (script) => pipe(updatePopupState(script.id, p => ({
        updateButtonDisabled: false,
        dxScript: { ...p.dxScript, name: script.name, code: script.code },
        addButtonDisabled: isCodeEmpty(script.code),
    })), option.fold(constVoid, p => handleLastUpdatedScript(p.dxScript)));
    const onAddedOnChart = (scriptId) => updatePopupState(scriptId, p => ({
        ...p,
        addedOnChart: true,
        isCompiling: false,
        dxScript: {
            ...p.dxScript,
            errors: [],
        },
    }));
    //#endregion
    //#region script creation
    const createScript = (name, code) => {
        const script = {
            name: findSuitableName(name, popups.getValue()),
            code,
            locked: false,
        };
        dxScriptProvider.createScript(script).then(scriptId => {
            addScriptToList({ ...script, id: scriptId });
            // when we have created a new script - open a popup
            onPopupOpen(scriptId);
        });
    };
    const addNewScript = () => createScript(localization.studiesPopup.newScript, '');
    const duplicateScript = (script) => createScript(script.name, script.code);
    //#endregion
    const compileScript = (script) => pipe(from([script]), observable.chain(script => from((async () => [script, await dxScriptRunner.compileScript(script.code)])())), observable.map(([script, data]) => {
        if (!script || isCodeEmpty(script.code)) {
            handleCompilationError([script.id, [emptyCodeError]]);
            return undefined;
        }
        const compileResponse = data;
        if (isSuccessCompile(compileResponse)) {
            return compileResponse;
        }
        if (compileResponse.scriptErrors) {
            handleCompilationError([script.id, compileResponse.scriptErrors]);
        }
        return undefined;
    }));
    const compileScriptStudy = (study) => pipe(from(dxScriptProvider.getScript(study.id)), observable.filterMap(script => (script ? option.some(script) : option.none)), observable.chain(compileScript), observable.map(compileResponse => pipe(compileResponse, option.fromNullable, option.chain(option.fromPredicate(isSuccessCompile)), option.map(compileResponse => {
        study.parameters = mapScriptParams(study, compileResponse);
        study.lines = mapScriptLines(study, compileResponse, colorsPool);
        dxStudiesProvider.updateStudy(study);
        return { ...study, uuid: uuid() };
    }))));
    const deleteScript = (scriptId) => {
        dxScriptProvider.deleteScript(scriptId);
        dxStudiesProvider.setStudies(dxStudiesProvider.getStudies().filter(s => s.id !== scriptId));
        removeScriptFromList(scriptId);
    };
    const syncScriptWithProvider = (script) => pipe(script, option.fromPredicate(s => s.locked === false), option.fold(() => of(script), () => pipe(from(dxScriptProvider.updateScript({
        id: script.id,
        code: script.code,
        name: script.name,
        locked: false,
    })), switchMap(() => of(script)))));
    const lastUpdatedScriptOnChart = pipe(lastUpdatedOnChartState, switchMap(syncScriptWithProvider));
    const lastAddedScriptOnChart = pipe(lastAddedOnChartState, switchMap(syncScriptWithProvider));
    //#region effects
    // since we have only 1 dx-script-edit vm for all charts, we have to change popups state's when
    // selected chart is changed
    const updatePopupsStateOnSelectedChartEffect = pipe(multichartViewModel.selectedChartId, observable.map(() => multichartViewModel.getSelectedChartInfo()), tap(info => pipe(popups.getValue(), array.map(p => info.studies.find(s => s.id === p.dxScript.id)
        ? { ...p, addedOnChart: true }
        : { ...p, addedOnChart: false }), setPopups)));
    const updateStudiesEffect = popups.pipe(tap(popups => {
        const studies = dxStudiesProvider.getStudies().filter(study => study.type !== 'dxScript');
        const scriptStudies = popups.map(p => mapScript2StudySettings(p.dxScript, dxStudiesProvider.getStudy(p.dxScript.id)));
        dxStudiesProvider.setStudies(sortStudies([...studies, ...scriptStudies]));
    }));
    const updateScriptEffect = pipe(lastUpdatedScript, debounceTime(2000), switchMap(script => {
        //saving starts after each debounce and is complete after provider update (saving time depends on a provider, so localstorage provider does it almost instantly)
        changePopupAutoSavingStatus(script.id, true);
        return from(dxScriptProvider
            .updateScript({
            id: script.id,
            code: script.code,
            name: script.name,
            locked: false,
        })
            .then(() => script.id));
    }), tap(id => changePopupAutoSavingStatus(id, false)));
    const updatePopupStateOnCompilationErrorEffect = pipe(compilationError, map(([scriptId, scriptErrors]) => updatePopupState(scriptId, p => ({
        ...p,
        popupOrder: 0,
        opened: true,
        dxScript: {
            ...p.dxScript,
            errors: scriptErrors,
        },
        addButtonDisabled: isCodeEmpty(p.dxScript.code),
        addedOnChart: false,
        isCompiling: false,
        updateButtonDisabled: true,
        isAutoSaving: false,
    }))));
    pipe(multichartViewModel.getAllCharts(), array.chain(ci => ci.studies), studies => combineLatest([
        studies.map(study => {
            const source = dxStudiesProvider.getStudy(study.id);
            if (source && source.type === 'dxScript') {
                return compileScriptStudy(source);
            }
            return EMPTY;
        }),
    ]), observable => observable.subscribe());
    const effects = merge(updateStudiesEffect, updateScriptEffect, updatePopupStateOnCompilationErrorEffect, updatePopupsStateOnSelectedChartEffect);
    //#endregion
    return newSink(callTracerProxy('dxScriptEditViewModel', {
        lastAddedScript: lastAddedScriptOnChart,
        lastUpdatedScript: lastUpdatedScriptOnChart,
        popups,
        addNewScript,
        duplicateScript,
        onPopupOpen,
        onPopupClose,
        onScriptEdit,
        onAddedOnChart,
        deleteScript,
        addToChart,
        updateScriptOnChart: updateOnChart,
        removeFromChart,
        compileScriptStudy,
        keywords,
    }), effects);
});
const findSuitableName = (name, dxScripts, counter = 2) => {
    if (!dxScripts.find(s => s.dxScript.name === name)) {
        return name;
    }
    if (dxScripts.find(s => s.dxScript.name === `${formatName(name)} (${counter})`)) {
        return findSuitableName(name, dxScripts, counter + 1);
    }
    return `${formatName(name)} (${counter})`;
};
const formatName = (name) => {
    const search = new RegExp(/(\(\d+\))$/g);
    const matcher = search.exec(name);
    if (matcher) {
        name = name.substring(0, matcher.index - 1);
    }
    return name;
};
const updatePopupsOrder = (popups) => {
    let popupCounter = 0;
    popups.forEach(p => {
        popupCounter = Math.max(popupCounter, p.popupOrder);
    });
    return popups.map(p => {
        if (p.opened) {
            return {
                ...p,
                popupOrder: p.popupOrder === 0 ? ++popupCounter : p.popupOrder,
            };
        }
        else {
            return {
                ...p,
                popupOrder: 0,
            };
        }
    });
};
const isCodeEmpty = (code) => code === undefined || code.trim().length === 0;
const getEmtptyErrorCode = (localization) => ({
    message: localization.codeEditor.errors.emptyCode,
    region: {
        sourceCodeId: '0',
        bounds: {
            beginChar: 0,
            beginLine: 0,
            endChar: 0,
            endLine: 0,
        },
    },
});
const scriptToPopupState = (script) => ({
    dxScript: {
        ...script,
        errors: [],
    },
    isCompiling: false,
    addedOnChart: false,
    opened: false,
    popupOrder: 0,
    addButtonDisabled: isCodeEmpty(script.code),
    updateButtonDisabled: true,
    isAutoSaving: false,
});
