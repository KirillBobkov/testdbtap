import { Option } from 'fp-ts/Option';
import { Property } from '../../../utils/property.utils';
import { Sink } from '../../../utils/sink';
import { ChartWithModules } from '../../components/canvas-chart-renderer/chart-with-modules';
import { ChartDrawingViewModel } from './drawing.view-model';
import { MultiChartViewModel } from '../multi-chart.view-model';
export interface TextDrawingViewModel {
    readonly data: Property<Option<TextDrawingData>>;
    readonly onChange: (value: string) => void;
    readonly onSubmit: () => void;
    readonly onCancel: () => void;
}
export declare const createTextDrawingViewModel: import("../../../context/context2").Context<Record<"multiChartViewModel", MultiChartViewModel> & Record<"chart", ChartWithModules> & Record<"drawingViewModel", ChartDrawingViewModel>, Sink<TextDrawingViewModel>>;
interface DrawingPosition {
    readonly x: number;
    readonly y: number;
    readonly width?: number;
    readonly height?: number;
}
export interface TextDrawingData {
    readonly text: string;
    readonly position: DrawingPosition;
    readonly id: string;
    readonly fontSize: string;
    readonly background: string;
    readonly color: string;
    readonly font: string;
}
export {};
