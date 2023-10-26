import { contramap, struct } from 'fp-ts/Eq';
import { fromNullable, getEq as getOptionEq, getOrElse, isSome, some, toNullable } from 'fp-ts/Option';
import { option, string } from 'fp-ts';
import { getEq as getArrayEq, sort } from 'fp-ts/Array';
import { contramap as ordContramap } from 'fp-ts/Ord';
import { pipe } from 'fp-ts/function';
import { eqStrict } from 'fp-ts/Eq';
import { uuid } from '@devexperts/dxcharts-lite/dist/chart/utils/uuid.utils';
function fromRawStudiesSettingsValidation(item) {
    return {
        min: fromNullable(item.min),
        max: fromNullable(item.max),
        precision: fromNullable(item.precision),
    };
}
function toRawStudiesSettingsValidation(item) {
    return {
        min: toNullable(item.min),
        max: toNullable(item.max),
        precision: toNullable(item.precision),
    };
}
function fromRawStudiesSettingsParameter(item) {
    return {
        id: item.id,
        studyParamType: item.studyParamType,
        value: fromNullable(item.value),
        validation: option.map(fromRawStudiesSettingsValidation)(fromNullable(item.validationTO)),
        visible: fromNullable(item.visible),
    };
}
function toRawStudiesSettingsParameter(item) {
    return {
        id: item.id,
        studyParamType: item.studyParamType,
        validationTO: pipe(item.validation, option.map(toRawStudiesSettingsValidation), option.toNullable),
        value: toNullable(item.value),
        visible: toNullable(item.visible),
    };
}
function fromRawStudiesSettingsLine(item) {
    return {
        colors: fromNullable(item.colors),
        studyLineType: fromNullable(item.studyLineType),
        thickness: fromNullable(item.thickness),
        title: fromNullable(item.title),
        visible: pipe(fromNullable(item.visible), visible => (isSome(visible) ? visible : some(true))),
    };
}
function toRawStudiesSettingsLine(item, rawStudyLine) {
    return {
        ...rawStudyLine,
        colors: getOrElse(() => [])(item.colors),
        studyLineType: getOrElse(() => 'LINEAR')(item.studyLineType),
        thickness: getOrElse(() => 1)(item.thickness),
        title: getOrElse(() => '')(item.title),
        visible: getOrElse(() => true)(item.visible),
    };
}
export function fromRawStudiesSettings(item) {
    return {
        categories: item.categories,
        id: item.id,
        lines: item.lines.map(fromRawStudiesSettingsLine),
        overlaying: item.overlaying,
        parameters: item.parameters.map(fromRawStudiesSettingsParameter),
        title: item.title,
        description: item.description,
        link: item.link,
        type: item.type ?? 'dxStudy',
        uuid: item.uuid ?? uuid(),
        calculateFutureData: item.calculateFutureData ?? false,
    };
}
export const toRawStudiesSettings = (studiesList) => (item) => {
    if (item.type === 'dxScript') {
        return {
            id: item.id,
            uuid: item.uuid,
            title: item.title,
            description: item.description,
            type: 'dxScript',
            parameters: item.parameters.map(param => {
                return {
                    id: param.id,
                    studyParamType: param.studyParamType,
                    value: toNullable(param.value),
                    visible: toNullable(param.visible),
                };
            }),
            lines: item.lines.map(line => {
                return {
                    title: toNullable(line.title) ?? '',
                    studyLineType: toNullable(line.studyLineType) ?? 'LINEAR',
                    thickness: toNullable(line.thickness) ?? 1,
                    colors: toNullable(line.colors) ?? [],
                    visible: toNullable(line.visible) ?? false,
                };
            }),
            calculateFutureData: item.calculateFutureData,
            overlaying: item.overlaying,
            categories: item.categories,
        };
    }
    else {
        const rawStudy = studiesList.find(study => study.id === item.id) ?? studiesList[0];
        return {
            ...rawStudy,
            lines: item.lines.map((line, idx) => {
                const tRawStudyLine = rawStudy.lines[idx];
                return toRawStudiesSettingsLine(line, tRawStudyLine);
            }),
            parameters: item.parameters.map(toRawStudiesSettingsParameter),
            type: item.type,
            uuid: item.uuid,
            overlaying: item.overlaying,
        };
    }
};
//#endregion
//#region eqStudyList
const eqOptionStrict = getOptionEq(eqStrict);
const eqStudyParam = contramap(({ id, value }) => ({ id, value }))(struct({
    id: string.Eq,
    value: eqStrict,
}));
const eqStudyLineColors = contramap(arr => arr || [])(getArrayEq(string.Eq));
const eqStudyLine = contramap(({ title, thickness, colors }) => ({ title, thickness, colors }))(struct({
    title: eqOptionStrict,
    thickness: eqOptionStrict,
    colors: getOptionEq(eqStudyLineColors),
}));
const eqStudy = struct({
    id: string.Eq,
    parameters: getArrayEq(eqStudyParam),
    lines: getArrayEq(eqStudyLine),
});
export const eqStudyList = getArrayEq(eqStudy);
//#endregion
const ordStudies = ordContramap(item => item.title.toLowerCase())(string.Ord);
export const sortStudies = sort(ordStudies);
