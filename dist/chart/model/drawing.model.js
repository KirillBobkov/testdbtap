import { record, array } from 'fp-ts';
import { getEq } from 'fp-ts/Array';
import { string } from 'fp-ts';
import { pipe } from 'fp-ts/function';
/**
 * Developers-defined groups of drawings.
 */
export const DEFAULT_DRAWING_GROUPS = [
    {
        groupName: 'LineDrawings',
        drawings: [
            'line',
            'extended_line',
            'horizontal_line',
            'info_line',
            'arrow',
            'horizontal_ray',
            'ray',
            'vertical_line',
            'trend_channel',
        ],
    },
    {
        groupName: 'Geometric Drawings',
        drawings: [
            'ellipse',
            'rectangle',
            'curve',
            'arc',
            'path',
            'vertical_arrow_up',
            'vertical_arrow_down',
            'cycle_brackets',
        ],
    },
    { groupName: 'Text Drawings', drawings: ['price_label', 'callout', 'icon', 'text'] },
    {
        groupName: 'Brush and highlighter',
        drawings: ['brush', 'highlighter'],
    },
    {
        groupName: 'Fibonacci and Gann Drawings',
        drawings: [
            'pitchfork',
            'fibonacci_rays',
            'fibonacci_ark',
            'fibonacci_circles',
            'fibonacci_retracements',
            'fibonacci_projection',
            'fibonacci_channel',
            'fibonacci_time_zones',
            'fibonacci_time_extension',
            'fibonacci_time_ratios',
            'gann_square',
            'gann_box',
            'gann_fan',
            'regression_trend',
            'fibonacci_spiral',
        ],
    },
    { groupName: 'Elliott Drawings', drawings: ['elliott_wave', 'elliott_correction_wave'] },
    {
        groupName: 'Range Drawings',
        drawings: ['price_range', 'date_range', 'date_price_range'],
    },
];
/**
 * @doc-tags drawings
 */
const textDrawingTypes = ['text', 'callout', 'price_label'];
const predictionAndMeasurementDrawingTypes = ['date_range', 'price_range', 'date_price_range'];
const scalingDrawingTypes = [
    'magnifying_tool_time_range',
    'magnifying_tool_rectangle',
    'magnifying_tool_time_range_wheel',
];
const plainDrawingTypesWithBackground = ['curve', 'arc', 'date_price_range', 'price_range', 'date_range'];
const plainDrawingTypes = [
    'line',
    'vertical_line',
    'extended_line',
    'trend_channel',
    'multichannel',
    'horizontal_ray',
    'path',
    'fibonacci_retracements',
    'gann_fan',
    'vertical_arrow_up',
    'vertical_arrow_down',
    'info_line',
    'ray',
    'arrow',
    'horizontal_line',
    'fibonacci_rays',
    'ellipse',
    'rectangle',
    'fibonacci_ark',
    'fibonacci_circles',
    'pitchfork',
    'brush',
    'elliott_wave',
    'elliott_correction_wave',
    'fibonacci_projection',
    'fibonacci_channel',
    'gann_box',
    'gann_square',
    'fibonacci_time_zones',
    'regression_trend',
    'fibonacci_spiral',
    'cycle_brackets',
    'fibonacci_time_extension',
    'fibonacci_time_ratios',
    ...plainDrawingTypesWithBackground,
];
export const drawingTypes = [
    ...textDrawingTypes,
    ...scalingDrawingTypes,
    ...plainDrawingTypes,
    ...predictionAndMeasurementDrawingTypes,
    'icon',
    'brush',
    'highlighter',
];
export const magnetDrawingTypes = [
    ...textDrawingTypes,
    ...scalingDrawingTypes,
    ...plainDrawingTypes,
    ...predictionAndMeasurementDrawingTypes,
];
export const EditableTextDrawingTypes = ['text', 'callout'];
export const SimpleDrawingTypes = ['icon', 'price_label'];
export const drawingTypeArrayEq = getEq(string.Eq);
export function isDrawingType(type) {
    return drawingTypes.some(t => t === type);
}
export function isAvailableDrawingType(type) {
    return drawingTypes.some(t => t === type);
}
export const isEditableTextDrawingType = (type) => {
    return EditableTextDrawingTypes.some(t => t === type);
};
export const isSimpleDrawingType = (type) => {
    return SimpleDrawingTypes.some(t => t === type);
};
export const isIconDrawingType = (type) => {
    return type === 'icon';
};
export function isIconDrawingModel(drawing) {
    return isIconDrawingType(drawing.type);
}
export function isAvailableDrawingModel(drawing) {
    return isAvailableDrawingType(drawing.type);
}
export function isAvailableDrawing(drawing) {
    return isAvailableDrawingType(drawing.type);
}
export const fromNativeChartDrawings = (nativeDrawings) => {
    return record.map(drawings => drawings.filter(isAvailableDrawing))(nativeDrawings);
};
export function isPlainDrawingType(type) {
    return plainDrawingTypes.some(t => t === type);
}
export function isPlainDrawingModel(drawing) {
    return isPlainDrawingType(drawing.type);
}
//#endregion
//#region drawing type type guards
export function isExactDrawingType(type, castingType) {
    return type === castingType;
}
export function isExactDrawingModel(drawing, castingType) {
    return isExactDrawingType(drawing.type, castingType);
}
export function isScalingDrawing(type) {
    return scalingDrawingTypes.some(t => t === type);
}
export function isMagnetDrawing(type) {
    return magnetDrawingTypes.some(t => t === type);
}
export function isTextDrawing(type) {
    return textDrawingTypes.some(t => t === type);
}
export function isTextDrawingModel(drawing) {
    return isTextDrawing(drawing.type);
}
export function isEditableTextDrawingModel(drawing) {
    return isEditableTextDrawingType(drawing.type);
}
export function mapFibCirclesToFibParts(circles) {
    return pipe(circles, array.map(c => ({ ...c, ...c.line })));
}
export function mapFibPartsToFibCircles(fibParts) {
    return pipe(fibParts, array.map(fp => ({
        coefficient: fp.coefficient,
        visible: fp.visible,
        line: {
            lineColor: fp.lineColor,
            lineDash: fp.lineDash,
            lineWidth: fp.lineWidth,
            lineVisibility: fp.lineVisibility,
            lineCap: fp.lineCap,
        },
    })));
}
