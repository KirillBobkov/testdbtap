import { option } from 'fp-ts';
import { pipe } from 'fp-ts/function';
export const fromTStudyParam = (param) => ({
    id: param.id,
    value: pipe(param.value, option.map(v => v.toString()), option.getOrElse(() => '')),
    paramType: param.studyParamType.toString(),
});
export const fromTStudyLine = (line) => ({
    title: option.toUndefined(line.title),
    studyLineType: option.toUndefined(line.studyLineType),
    thickness: option.toUndefined(line.thickness),
    color: pipe(line.colors, option.map(c => c[0]), option.toUndefined),
});
export const isSuccessCompile = (result) => result.successful;
