import { array, option } from 'fp-ts';
import { pipe } from 'fp-ts/function';
export const mapScript2StudySettings = (script, study) => {
    return {
        id: `${script.id}`,
        uuid: `${script.id}`,
        title: script.name,
        type: 'dxScript',
        parameters: study?.parameters || [],
        lines: study?.lines || [],
        calculateFutureData: study?.calculateFutureData || false,
        overlaying: study?.overlaying || false,
        categories: study?.categories || '',
        locked: script.locked,
    };
};
// map the parameters and plots of compiled script
const getStudyParamType = (type) => {
    switch (type) {
        case 'boolean':
            return 'BOOLEAN';
        case 'number':
        default:
            return 'INTEGER_RANGE';
    }
};
export const mapScriptParams = (study, response) => response.params.map(param => pipe(study.parameters, array.findFirst(p => p.id === param.id), option.getOrElse(() => {
    const p = {
        id: param.id,
        studyParamType: getStudyParamType(param.paramType),
        value: option.some(param.value),
        validation: option.none,
        visible: option.some(true),
    };
    return p;
})));
export const mapScriptLines = (study, response, colorsPool) => response.lines.map(line => pipe(study.lines, array.findFirst(l => option.isSome(l.title) && l.title.value === line.title), option.getOrElse(() => {
    const color = line.color ? line.color : colorsPool.getColor();
    const l = {
        title: option.some(line.title ?? ''),
        colors: option.some([color]),
        thickness: option.some(line.thickness ?? 1),
        studyLineType: option.some(line.studyLineType ?? 'LINEAR'),
        visible: option.some(true),
    };
    return l;
})));
