import { Lens } from 'monocle-ts';
import { pipe } from 'fp-ts/function';
import { toCanvasLineDash, toCanvasLineWidth } from '../../../../utils/drawing.utils';
const lensLine = Lens.fromPath()(['properties', 'line']);
const lensBackground = Lens.fromPath()(['properties', 'background']);
/**
 * Updates the line color in drawing.
 * @param lineColor
 */
export const updateDrawingLineColor = (lineColor) => (drawingModel) => {
    const line = lensLine.get(drawingModel);
    // eslint-disable-next-line no-restricted-syntax
    return lensLine.set({
        ...line,
        lineColor,
    })(drawingModel);
};
/**
 * Updates the line color in drawing.
 * @param fillStyle
 */
export const updateDrawingBackgroundColor = (fillStyle) => (drawingModel) => {
    const line = lensBackground.get(drawingModel);
    // eslint-disable-next-line no-restricted-syntax
    return lensBackground.set({
        ...line,
        fillStyle,
    })(drawingModel);
};
/**
 * Updates the line width and dash in drawing;
 * @param lineWidthDash
 */
export const updateDrawingLineWidthDash = (lineWidthDash) => (drawingModel) => {
    const line = lensLine.get(drawingModel);
    return lensLine.set({
        ...line,
        ...lineWidthDash,
    })(drawingModel);
};
/**
 * Lens for complex drawings: fibonacci and gann.
 * Gets "zones" and "rays" to modify color / line.
 */
export const drawingLensFromPropNames = (path, propNames) => {
    return propNames.map(propName => {
        // @ts-ignore
        // eslint-disable-next-line no-restricted-syntax
        return Lens.fromPath()([...path, propName]);
    });
};
export const onLineAndBackgroundColorChange = (handler) => (drawingModel) => (color) => pipe(drawingModel, updateDrawingLineColor(color), updateDrawingBackgroundColor(color), handler);
export const createOnColorChange_FromLensArray = onValueChange => lensArray => drawingModel => color => {
    const lineColor = color;
    pipe(lensArray.reduce((acc, l) => {
        const part = l.get(acc);
        return l.set({
            ...part,
            lineColor,
        })(acc);
    }, drawingModel), updateDrawingLineColor(lineColor), onValueChange);
};
export const createOnColorChange_FromTraversal = onValueChange => traversal => drawingModel => color => {
    const lineColor = color;
    pipe(traversal.reduce((acc, t) => {
        return t.modify(l => ({
            ...l,
            lineColor,
        }))(acc);
    }, drawingModel), updateDrawingLineColor(lineColor), onValueChange);
};
export const createOnLineChange_FromTraversal = onValueChange => traversal => drawingModel => linePicker => {
    const linePropsCanvas = {
        lineWidth: toCanvasLineWidth(linePicker.lineWidth),
        lineDash: toCanvasLineDash(linePicker.lineDash),
    };
    pipe(traversal.reduce((acc, t) => {
        return t.modify(l => ({
            ...l,
            ...linePropsCanvas,
        }))(acc);
    }, drawingModel), updateDrawingLineWidthDash(linePropsCanvas), onValueChange);
};
