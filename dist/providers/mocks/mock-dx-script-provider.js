import { uuid } from '@devexperts/dxcharts-lite/dist/chart/utils/uuid.utils';
import { array, option } from 'fp-ts';
import { constUndefined, identity, pipe } from 'fp-ts/function';
import { createPropertyAdapter } from '../../utils/property.utils';
export const createMockDxScriptProvider = () => {
    const [setScriptList, scriptList] = createPropertyAdapter([]);
    const nextId = (id) => `MOCK_${id}`;
    return {
        fetchAllScripts() {
            return Promise.resolve(scriptList.getValue());
        },
        getScriptList() {
            return scriptList.getValue();
        },
        getScript(id) {
            return Promise.resolve(pipe(scriptList.getValue(), list => pipe(list, array.findFirst(script => script.id === id), option.fold(constUndefined, identity))));
        },
        createScript(script) {
            return Promise.resolve(pipe(scriptList.getValue(), list => {
                const newId = nextId(uuid());
                const newScript = {
                    id: newId,
                    ...script,
                };
                const newScriptList = [...list, newScript];
                setScriptList(newScriptList);
                return newId;
            }));
        },
        updateScript(script) {
            return Promise.resolve(pipe(scriptList.getValue(), array.map(s => (s.id === script.id ? { ...script } : s)), setScriptList));
        },
        deleteScript(id) {
            return Promise.resolve(pipe(scriptList.getValue(), array.filter(s => s.id !== id), setScriptList));
        },
    };
};
