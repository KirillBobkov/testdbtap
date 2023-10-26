import { drawingTypes } from '../../../model/drawing.model';
export function isDrawingType(value) {
    const types = drawingTypes;
    return typeof value === 'string' && types.includes(value);
}
