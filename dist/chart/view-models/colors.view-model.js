import { context } from '../../context/context2';
import { constVoid, identity, pipe } from 'fp-ts/function';
import { observable } from 'fp-ts-rxjs';
import { combineLatest, merge, of } from 'rxjs';
import { array, option } from 'fp-ts';
import { string } from 'fp-ts';
import { newSink } from '../../context/sink2';
import { callTracerProxy } from '../../utils/debug/call-tracer';
export const createColorsViewModel = context.combine(context.key()('userDataViewModel'), context.key()('colorPalette'), (userDataViewModel, defaultColorPalette) => {
    //#region state shortcuts
    const currentCustomColors = () => userDataViewModel.userData.getValue().customColors;
    const currentColors = () => pipe(defaultColorPalette, array.concat(currentCustomColors()));
    const customColors = pipe(userDataViewModel.userData, observable.map(ud => ud.customColors));
    const colors = pipe(combineLatest([of(defaultColorPalette), customColors]), observable.map(([dc, cc]) => pipe(dc, array.concat(cc))));
    //#endregion
    //#region vm methods
    const isDefaultColor = (color) => pipe(defaultColorPalette, checkForColorDuplicates(color));
    const doAddColor = (color) => pipe(currentCustomColors(), array.append(color), userDataViewModel.updateCustomColors);
    const addNewColor = (color) => {
        pipe(currentColors(), checkForColorDuplicates(color), option.fromPredicate(identity), option.fold(() => {
            doAddColor(color);
        }, constVoid));
    };
    const updateColor = (color, updateAtIndex) => pipe(currentColors(), checkForColorDuplicates(color), option.fromPredicate(identity), option.fold(() => {
        pipe(isDefaultColor(color), option.fromPredicate(identity), option.fold(() => pipe(currentCustomColors(), array.updateAt(updateAtIndex, color), option.fold(constVoid, userDataViewModel.updateCustomColors)), () => doAddColor(color)));
    }, constVoid));
    const deleteColor = (color) => pipe(currentCustomColors(), array.filter(c => c !== color), userDataViewModel.updateCustomColors);
    //#endregion
    const effects = merge();
    return newSink(callTracerProxy('colorsViewModel', {
        customColors,
        colors,
        addNewColor,
        deleteColor,
        updateColor,
        isDefaultColor,
    }), effects);
});
//#region utils
export const checkForColorDuplicates = (color) => (colors) => pipe(colors, array.elem(string.Eq)(color));
//#endregion
