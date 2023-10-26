import { PropertiesByType } from '@dx-private/dxchart5-modules/dist/drawings/figures/model/properties-by-type';
import { DrawingType as DxChartDrawingType } from '@dx-private/dxchart5-modules/dist/drawings/model/drawing-types';
import { DrawingModel } from '@dx-private/dxchart5-modules/dist/drawings/model/drawing.model';
import { Drawing } from '@dx-private/dxchart5-modules/dist/drawings/drawings.config';
import { FibonacciCircle, FibonacciPart } from '@dx-private/dxchart5-modules/dist/drawings/figures/model/figure.model';
export type LineWidth = 'thin' | 'normal' | 'semibold' | 'bold';
export type LineDash = 'solid' | 'dashed';
export type DrawingsConfig<DT extends keyof PropertiesByType> = {
    [Type in DT]: {
        type: Type;
        properties: PropertiesByType[Type];
    };
};
/**
 * Developers-defined groups of drawings.
 */
export declare const DEFAULT_DRAWING_GROUPS: DrawingGroup[];
/**
 * @doc-tags drawings
 */
declare const textDrawingTypes: readonly ["text", "callout", "price_label"];
declare const scalingDrawingTypes: readonly ["magnifying_tool_time_range", "magnifying_tool_rectangle", "magnifying_tool_time_range_wheel"];
declare const plainDrawingTypesWithBackground: readonly ["curve", "arc", "date_price_range", "price_range", "date_range"];
declare const plainDrawingTypes: readonly ["line", "vertical_line", "extended_line", "trend_channel", "multichannel", "horizontal_ray", "path", "fibonacci_retracements", "gann_fan", "vertical_arrow_up", "vertical_arrow_down", "info_line", "ray", "arrow", "horizontal_line", "fibonacci_rays", "ellipse", "rectangle", "fibonacci_ark", "fibonacci_circles", "pitchfork", "brush", "elliott_wave", "elliott_correction_wave", "fibonacci_projection", "fibonacci_channel", "gann_box", "gann_square", "fibonacci_time_zones", "regression_trend", "fibonacci_spiral", "cycle_brackets", "fibonacci_time_extension", "fibonacci_time_ratios", "curve", "arc", "date_price_range", "price_range", "date_range"];
export declare const drawingTypes: readonly ["text", "callout", "price_label", "magnifying_tool_time_range", "magnifying_tool_rectangle", "magnifying_tool_time_range_wheel", "line", "vertical_line", "extended_line", "trend_channel", "multichannel", "horizontal_ray", "path", "fibonacci_retracements", "gann_fan", "vertical_arrow_up", "vertical_arrow_down", "info_line", "ray", "arrow", "horizontal_line", "fibonacci_rays", "ellipse", "rectangle", "fibonacci_ark", "fibonacci_circles", "pitchfork", "brush", "elliott_wave", "elliott_correction_wave", "fibonacci_projection", "fibonacci_channel", "gann_box", "gann_square", "fibonacci_time_zones", "regression_trend", "fibonacci_spiral", "cycle_brackets", "fibonacci_time_extension", "fibonacci_time_ratios", "curve", "arc", "date_price_range", "price_range", "date_range", "date_range", "price_range", "date_price_range", "icon", "brush", "highlighter"];
export declare const magnetDrawingTypes: readonly ["text", "callout", "price_label", "magnifying_tool_time_range", "magnifying_tool_rectangle", "magnifying_tool_time_range_wheel", "line", "vertical_line", "extended_line", "trend_channel", "multichannel", "horizontal_ray", "path", "fibonacci_retracements", "gann_fan", "vertical_arrow_up", "vertical_arrow_down", "info_line", "ray", "arrow", "horizontal_line", "fibonacci_rays", "ellipse", "rectangle", "fibonacci_ark", "fibonacci_circles", "pitchfork", "brush", "elliott_wave", "elliott_correction_wave", "fibonacci_projection", "fibonacci_channel", "gann_box", "gann_square", "fibonacci_time_zones", "regression_trend", "fibonacci_spiral", "cycle_brackets", "fibonacci_time_extension", "fibonacci_time_ratios", "curve", "arc", "date_price_range", "price_range", "date_range", "date_range", "price_range", "date_price_range"];
export declare const EditableTextDrawingTypes: readonly ["text", "callout"];
export type EditableTextDrawingType = (typeof EditableTextDrawingTypes)[number];
export declare const SimpleDrawingTypes: readonly ["icon", "price_label"];
export type DrawingType = (typeof drawingTypes)[number];
export declare const drawingTypeArrayEq: import("fp-ts/lib/Eq").Eq<("line" | "horizontal_line" | "horizontal_ray" | "vertical_line" | "extended_line" | "ellipse" | "pitchfork" | "ray" | "curve" | "arc" | "info_line" | "brush" | "path" | "date_price_range" | "date_range" | "price_range" | "highlighter" | "icon" | "rectangle" | "gann_box" | "gann_square" | "fibonacci_ark" | "fibonacci_circles" | "fibonacci_rays" | "gann_fan" | "trend_channel" | "multichannel" | "fibonacci_retracements" | "text" | "callout" | "price_label" | "magnifying_tool_rectangle" | "magnifying_tool_time_range" | "magnifying_tool_time_range_wheel" | "vertical_arrow_up" | "vertical_arrow_down" | "arrow" | "elliott_wave" | "elliott_correction_wave" | "fibonacci_projection" | "fibonacci_channel" | "fibonacci_time_zones" | "regression_trend" | "fibonacci_spiral" | "cycle_brackets" | "fibonacci_time_extension" | "fibonacci_time_ratios")[]>;
export declare function isDrawingType(type: string | number): type is DrawingType;
export declare function isAvailableDrawingType(type: DxChartDrawingType): type is DrawingType;
export declare const isEditableTextDrawingType: (type: DxChartDrawingType) => type is "text" | "callout";
export declare const isSimpleDrawingType: (type: DxChartDrawingType) => type is "line" | "horizontal_line" | "horizontal_ray" | "vertical_line" | "extended_line" | "ellipse" | "pitchfork" | "ray" | "curve" | "arc" | "info_line" | "brush" | "path" | "date_price_range" | "date_range" | "price_range" | "highlighter" | "icon" | "rectangle" | "gann_box" | "gann_square" | "fibonacci_ark" | "fibonacci_circles" | "fibonacci_rays" | "gann_fan" | "trend_channel" | "multichannel" | "fibonacci_retracements" | "text" | "callout" | "price_label" | "magnifying_tool_rectangle" | "magnifying_tool_time_range" | "magnifying_tool_time_range_wheel" | "vertical_arrow_up" | "vertical_arrow_down" | "arrow" | "elliott_wave" | "elliott_correction_wave" | "fibonacci_projection" | "fibonacci_channel" | "fibonacci_time_zones" | "regression_trend" | "fibonacci_spiral" | "cycle_brackets" | "fibonacci_time_extension" | "fibonacci_time_ratios";
export declare const isIconDrawingType: (type: DxChartDrawingType) => type is "line" | "horizontal_line" | "horizontal_ray" | "vertical_line" | "extended_line" | "ellipse" | "pitchfork" | "ray" | "curve" | "arc" | "info_line" | "brush" | "path" | "date_price_range" | "date_range" | "price_range" | "highlighter" | "icon" | "rectangle" | "gann_box" | "gann_square" | "fibonacci_ark" | "fibonacci_circles" | "fibonacci_rays" | "gann_fan" | "trend_channel" | "multichannel" | "fibonacci_retracements" | "text" | "callout" | "price_label" | "magnifying_tool_rectangle" | "magnifying_tool_time_range" | "magnifying_tool_time_range_wheel" | "vertical_arrow_up" | "vertical_arrow_down" | "arrow" | "elliott_wave" | "elliott_correction_wave" | "fibonacci_projection" | "fibonacci_channel" | "fibonacci_time_zones" | "regression_trend" | "fibonacci_spiral" | "cycle_brackets" | "fibonacci_time_extension" | "fibonacci_time_ratios";
export declare function isIconDrawingModel(drawing: DrawingModel<DxChartDrawingType>): drawing is DrawingModel<'icon'>;
export declare function isAvailableDrawingModel(drawing: DrawingModel<DxChartDrawingType>): drawing is DrawingModel<DrawingType>;
export declare function isAvailableDrawing(drawing: Drawing<DxChartDrawingType>): drawing is Drawing<DrawingType>;
export declare const fromNativeChartDrawings: (nativeDrawings: Record<string, Drawing<DxChartDrawingType>[]>) => Record<string, Drawing<DrawingType>[]>;
export type PlainDrawingTypeWithBackground = (typeof plainDrawingTypesWithBackground)[number];
export type PlainDrawingType = (typeof plainDrawingTypes)[number] | PlainDrawingTypeWithBackground;
export declare function isPlainDrawingType(type: DrawingType): type is PlainDrawingType;
export declare function isPlainDrawingModel(drawing: DrawingModel<DrawingType>): drawing is DrawingModel<PlainDrawingType>;
export declare function isExactDrawingType<T extends DrawingType>(type: DrawingType, castingType: T): type is T;
export declare function isExactDrawingModel<T extends DrawingType>(drawing: DrawingModel<DrawingType>, castingType: T): drawing is DrawingModel<T>;
export type ScalingDrawingType = (typeof scalingDrawingTypes)[number];
export declare function isScalingDrawing(type: DrawingType): type is ScalingDrawingType;
export type MagnetDrawingType = (typeof magnetDrawingTypes)[number];
export declare function isMagnetDrawing(type: DrawingType): type is MagnetDrawingType;
export type TextDrawingType = (typeof textDrawingTypes)[number];
export declare function isTextDrawing(type: DrawingType): type is TextDrawingType;
export declare function isTextDrawingModel(drawing: DrawingModel<DrawingType>): drawing is DrawingModel<TextDrawingType>;
export declare function isEditableTextDrawingModel(drawing: DrawingModel<DxChartDrawingType>): drawing is DrawingModel<EditableTextDrawingType>;
export interface DrawingGroup {
    groupName: string;
    drawings: Array<DrawingType>;
}
export declare function mapFibCirclesToFibParts(circles: FibonacciCircle[]): FibonacciPart[];
export declare function mapFibPartsToFibCircles(fibParts: FibonacciPart[]): FibonacciCircle[];
export {};
