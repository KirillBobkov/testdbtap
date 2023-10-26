import * as A from 'fp-ts/Array';
import { number } from 'fp-ts';
export function toCanvasLineDash(lineDash) {
    switch (lineDash) {
        case 'solid':
            return [0, 0];
        case 'dashed':
            return [6, 6];
    }
}
export function fromCanvasLineDash(lineDash) {
    const eq = A.getEq(number.Eq);
    if (eq.equals(lineDash, [0, 0])) {
        return 'solid';
    }
    if (eq.equals(lineDash, [6, 6])) {
        return 'dashed';
    }
    return 'solid';
}
export function toCanvasLineWidth(lineWidth) {
    switch (lineWidth) {
        case 'thin':
            return 1;
        case 'normal':
            return 2;
        case 'semibold':
            return 3;
        case 'bold':
            return 4;
    }
}
export function fromCanvasLineWidth(lineWidth) {
    switch (lineWidth) {
        case 1:
            return 'thin';
        case 2:
            return 'normal';
        case 3:
            return 'semibold';
        case 4:
            return 'bold';
        default:
            return 'thin';
    }
}
