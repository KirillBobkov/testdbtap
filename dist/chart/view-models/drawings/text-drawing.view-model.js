import { CanvasElement } from '@devexperts/dxcharts-lite/dist/chart/canvas/canvas-bounds-container';
import { formatText } from '@dx-private/dxchart5-modules/dist/drawings/common/text-drawing-functions';
import { option } from 'fp-ts';
import { observable } from 'fp-ts-rxjs';
import { sequenceT } from 'fp-ts/Apply';
import { Apply } from 'fp-ts/Option';
import { constVoid, pipe } from 'fp-ts/function';
import { merge } from 'rxjs';
import { filter, pairwise, tap } from 'rxjs/operators';
import { context } from '../../../context/context2';
import { createPropertyAdapter } from '../../../utils/property.utils';
import { sink } from '../../../utils/sink';
import { isAvailableDrawingModel, isEditableTextDrawingModel, isEditableTextDrawingType, isTextDrawingModel, } from '../../model/drawing.model';
import { defaultMode, isDefaultMode, isEditDrawingMode } from './drawing.view-model';
export const createTextDrawingViewModel = context.combine(context.key()('multiChartViewModel'), context.key()('chart'), context.key()('drawingViewModel'), (multiChartViewModel, chart, drawingVM) => {
    //#region state
    const [changeData, data] = createPropertyAdapter(option.none);
    const [selectDrawing, selectedDrawing] = createPropertyAdapter(option.none);
    const [setDrawingPosition, drawingPosition] = createPropertyAdapter(option.none);
    //#endregion
    //#region methods
    const updateData = (drawing) => {
        const text = pipe(option.fromNullable(drawing.properties), option.map(drawingProperties => drawingProperties['textValue'] ?? ''));
        pipe(sequenceT(Apply)(text, drawingPosition.getValue(), option.some(drawing)), dm => {
            // @ts-ignore
            if (drawing.figure.textBlockBounds) {
                pipe(dm, option.map(([text, point, drawing]) => [
                    text,
                    {
                        ...point,
                        // @ts-ignore
                        width: drawing.figure.textBlockBounds.width,
                        // @ts-ignore
                        height: drawing.figure.textBlockBounds.height,
                    },
                    drawing,
                ]), option.map(mapPropsToDrawingData), changeData);
            }
            else {
                pipe(dm, option.map(mapPropsToDrawingData), changeData);
            }
        });
    };
    const adjustEditableDrawingOnYScaleChanged = pipe(
    // last candle changes xScale and yScale => adjust text position
    chart.scale.changed, tap(() => {
        pipe(data.getValue(), option.map(data => {
            // @ts-ignore
            const newPoint = chart.drawings.model.viewModels[data.id]?.keyViewPoints?.[1];
            return option.fromNullable({
                ...data,
                position: {
                    ...data.position,
                    ...newPoint,
                },
            });
        }), option.map(changeData));
    }));
    const setDrawingText = (value) => pipe(sequenceT(Apply)(value, selectedDrawing.getValue()), option.map(([data, selectedDrawing]) => {
        if (isEditableTextDrawingModel(selectedDrawing)) {
            selectedDrawing.properties.textValue = data.text;
            if (!selectedDrawing.figure.isEditing) {
                selectedDrawing.properties.textValue = data.text;
            }
            chart.drawings.model.handleDataUpdates();
        }
    }));
    const toggleTextDrawingEditable = (drawing, isEditing) => {
        drawing.figure.isEditing = isEditing;
        drawingVM.updateDrawing(drawing);
    };
    const selectDrawingHandler = (drawing) => pipe(drawing, option.fromPredicate(isEditableTextDrawingModel), option.fold(deselectCurrentTextDrawing, drawing => {
        selectDrawing(option.some(drawing));
        setDrawingPosition(option.fromNullable(drawing.figure.textToolPoint));
        toggleTextDrawingEditable(drawing, true);
        updateData(drawing);
        chart.chartPanComponent.deactivatePanHandlers();
    }));
    const deselectCurrentTextDrawing = () => {
        const currentDrawing = selectedDrawing.getValue();
        if (option.isSome(currentDrawing)) {
            chart.chartPanComponent.activateChartPanHandlers();
            toggleTextDrawingEditable(currentDrawing.value, false);
        }
        selectDrawing(option.none);
        changeData(option.none);
    };
    const onChange = (value) => pipe(data.getValue(), option.map(data => changeData(option.some({ ...data, text: formatText(value, data.font, data.fontSize) }))));
    const onCancel = deselectCurrentTextDrawing;
    const onSubmit = deselectCurrentTextDrawing;
    //#endregion
    //#region effects
    // it's hard to sync react text-note with actual canvas coordinates on resize,
    // so we decided to remove focus from the drawing (deselect)
    const deselectCurrentTextDrawingOnResizeEffect = pipe(chart.canvasBoundsContainer.observeBoundsChanged(CanvasElement.ALL_PANES), tap(deselectCurrentTextDrawing));
    const drawingModeForTextEffect = pipe(selectedDrawing, pairwise(), observable.filter(() => multiChartViewModel.state.getValue().drawingMode), observable.map(([prev, cur]) => {
        if (option.isNone(cur) && option.isSome(prev)) {
            const drawing = prev.value;
            drawingVM.changeMode(defaultMode);
            drawingVM.startNewDrawing(drawing.type);
        }
    }));
    const syncDrawingModeEffect = pipe(drawingVM.drawingMode, filter(mode => isDefaultMode(mode)), tap(deselectCurrentTextDrawing));
    const drawingDoneEffect = pipe(chart.drawings.model.events.drawingFinished, filter(isEditableTextDrawingModel), tap(selectDrawingHandler));
    const dblClickOnDrawingEffect = pipe(chart.drawings.model.events.drawingDblClick, observable.map(option.fromNullable), tap(drawing => pipe(drawing, option.fold(constVoid, drawing => isAvailableDrawingModel(drawing) &&
        isEditableTextDrawingType(drawing.type) &&
        selectDrawingHandler(drawing)))));
    const updateDrawingDataEffect = drawingVM.drawingMode.pipe(tap(mode => {
        const curData = data.getValue();
        if (isEditDrawingMode(mode) && isTextDrawingModel(mode.drawing) && option.isSome(curData)) {
            changeData(option.some(mapPropsToDrawingData([curData.value.text, curData.value.position, mode.drawing])));
        }
    }));
    const updateTextValueEffect = data.pipe(tap(data => {
        pipe(option.fromNullable(data), option.map(data => {
            if (option.isSome(data)) {
                setDrawingText(option.some({ ...data.value }));
            }
        }));
    }));
    //#endregion
    const effects$ = merge(deselectCurrentTextDrawingOnResizeEffect, drawingDoneEffect, dblClickOnDrawingEffect, updateDrawingDataEffect, drawingModeForTextEffect, updateTextValueEffect, syncDrawingModeEffect, adjustEditableDrawingOnYScaleChanged);
    return sink.newSink({
        data,
        onSubmit,
        onCancel,
        onChange,
    }, effects$);
});
const mapPropsToDrawingData = ([text, point, drawing]) => ({
    text,
    position: {
        ...point,
    },
    id: drawing.id,
    fontSize: drawing.properties.text.textSize,
    background: drawing.properties.text.textBg,
    color: drawing.properties.text.textFill,
    font: `${drawing.properties.text.textSize} ${drawing.properties.text.textFontFamily ?? 'monoscape'}`,
});
