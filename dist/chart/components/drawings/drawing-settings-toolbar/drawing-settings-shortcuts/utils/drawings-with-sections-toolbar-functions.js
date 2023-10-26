import { isExactDrawingModel } from '../../../../../model/drawing.model';
export const isSameColor = (drawingModel) => {
    if (isExactDrawingModel(drawingModel, 'fibonacci_rays')) {
        return (drawingModel.properties.rays.find((ray) => ray.lineColor !== drawingModel.properties.line.lineColor) === undefined);
    }
    if (isExactDrawingModel(drawingModel, 'fibonacci_time_zones') ||
        isExactDrawingModel(drawingModel, 'fibonacci_channel')) {
        return (drawingModel.properties.zones.find((zone) => zone.lineColor !== drawingModel.properties.line.lineColor) === undefined);
    }
    if (isExactDrawingModel(drawingModel, 'gann_fan')) {
        return (drawingModel.properties.rays.find((ray) => ray.line.lineColor !== drawingModel.properties.line.lineColor) === undefined);
    }
    if (isExactDrawingModel(drawingModel, 'gann_box')) {
        for (const priceLevel of drawingModel.properties.coefficients.priceLevel) {
            if (priceLevel.line.lineColor !== drawingModel.properties.line.lineColor) {
                return false;
            }
        }
        for (const timeLevel of drawingModel.properties.coefficients.timeLevel) {
            if (timeLevel.line.lineColor !== drawingModel.properties.line.lineColor) {
                return false;
            }
        }
        return true;
    }
    if (isExactDrawingModel(drawingModel, 'gann_square')) {
        for (const level of drawingModel.properties.coefficients.levels) {
            if (level.line.lineColor !== drawingModel.properties.line.lineColor) {
                return false;
            }
        }
        for (const fan of drawingModel.properties.coefficients.fans) {
            if (fan.line.lineColor !== drawingModel.properties.line.lineColor) {
                return false;
            }
        }
        for (const arc of drawingModel.properties.coefficients.arcs) {
            if (arc.line.lineColor !== drawingModel.properties.line.lineColor) {
                return false;
            }
        }
        return true;
    }
    return true;
};
