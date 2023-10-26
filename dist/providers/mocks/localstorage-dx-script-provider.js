import { uuid } from '@devexperts/dxcharts-lite/dist/chart/utils/uuid.utils';
import { array, option } from 'fp-ts';
import { constUndefined, identity, pipe } from 'fp-ts/function';
import { createPropertyAdapter } from '../../utils/property.utils';
export const DXSCRIPTS_KEY = 'dxscripts';
export const createLocalStorageDxScriptProvider = () => {
    const [setScriptList, scriptList] = createPropertyAdapter([]);
    const nextId = (id) => `LS_${id}`;
    const getDxScriptsFromLS = () => pipe(option.fromNullable(localStorage.getItem(DXSCRIPTS_KEY)), option.map(raw => JSON.parse(raw)));
    const saveToLS = () => localStorage.setItem(DXSCRIPTS_KEY, JSON.stringify(scriptList.getValue()));
    return {
        setScriptList,
        scriptList,
        fetchAllScripts() {
            return pipe(getDxScriptsFromLS(), option.getOrElse(() => []), scripts => {
                setScriptList(scripts);
                return Promise.resolve(scriptList.getValue());
            });
        },
        getScriptList() {
            return scriptList.getValue();
        },
        getScript(id) {
            return Promise.resolve(pipe(scriptList.getValue(), array.findFirst(script => script.id === id), option.fold(constUndefined, identity)));
        },
        createScript(script) {
            return Promise.resolve(pipe(scriptList.getValue(), list => {
                const newId = nextId(uuid());
                const newScript = {
                    id: newId,
                    ...script,
                };
                setScriptList([...list, newScript]);
                saveToLS();
                return newId;
            }));
        },
        updateScript(script) {
            return Promise.resolve(pipe(scriptList.getValue(), array.map(s => (s.id === script.id ? { ...script } : s)), setScriptList, saveToLS));
        },
        deleteScript(id) {
            return Promise.resolve(pipe(scriptList.getValue(), array.filter(s => s.id !== id), setScriptList, saveToLS));
        },
    };
};
