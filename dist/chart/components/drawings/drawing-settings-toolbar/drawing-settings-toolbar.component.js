import React, { Fragment, memo, useCallback, useEffect, useMemo, useRef, useContext, } from 'react';
import { isSome } from 'fp-ts/Option';
import { option, array } from 'fp-ts';
import { constNull, pipe } from 'fp-ts/function';
import { DrawingPopup } from '../drawing-popup/drawing-popup.component';
import { DownArrowSettings } from '../drawing-settings-popups/down-arrow-settings.component';
import { FibonacciArksSettings } from '../drawing-settings-popups/fibonacci-arks-settings.component';
import { FibonacciRaysSettings } from '../drawing-settings-popups/fibonacci-rays-settings.component';
import { GannFannSettings } from '../drawing-settings-popups/gann-fan-settings.component';
import { FibonacciRetracementsSettings } from '../drawing-settings-popups/fibonacci-retracements-settings.component';
import { NotImplementedSettings } from '../drawing-settings-popups/not-implemented-settings.component';
import { OvalSettings } from '../drawing-settings-popups/oval-settings.component';
import { PitchforkSettings } from '../drawing-settings-popups/pitchfork-settings.component';
import { PriceLineSettings } from '../drawing-settings-popups/price-line-settings.component';
import { RectangleSettings } from '../drawing-settings-popups/rectangle-settings.component';
import { TimeLineSettings } from '../drawing-settings-popups/time-line-settings.component';
import { HorizontalRaySettings } from '../drawing-settings-popups/horizontal-ray-settings.component';
import { TrendChannelSettings } from '../drawing-settings-popups/trend-channel-settings.component';
import { CurveSettings } from '../drawing-settings-popups/curve-settings.component';
import { UpArrowSettings } from '../drawing-settings-popups/up-arrow-settings.component';
import { TrendLineSettings } from '../drawing-settings-popups/trend-line-settings.component';
import { isEditableTextDrawingType, isExactDrawingModel, isScalingDrawing, isSimpleDrawingType, isTextDrawingModel, } from '../../../model/drawing.model';
import { TextDrawingSettingsShortcuts } from './drawing-settings-shortcuts/text-drawing-settings-shortcuts.component';
import { CommonDrawingSettingsShortcuts } from './drawing-settings-shortcuts/common-drawing-settings-shortcuts.component';
import { ToolbarItem } from './components/toolbar-item.component';
import { BrushSettings } from '../drawing-settings-popups/brush-settings.component';
import { PathSettings } from '../drawing-settings-popups/path-settings.component';
import { ExtendedLineSettings } from '../drawing-settings-popups/extended-line-settings.component';
import { IconDrawingSettingsShortcuts } from './drawing-settings-shortcuts/icon-drawing-settings-shortcuts.component';
import { HighlighterDrawingSettingsShortcuts } from './drawing-settings-shortcuts/highlighter-drawing-settings-shortcuts.component';
import { HighlighterSettings } from '../drawing-settings-popups/highlighter-settings.component';
import { ArrowSettings } from '../drawing-settings-popups/arrow-settings.component';
import { RaySettings } from '../drawing-settings-popups/ray-settings.component';
import { InfoLineSettings } from '../drawing-settings-popups/info-line-settings.component';
import { DatePriceRangeSettings } from '../drawing-settings-popups/date-price-range-settings.component';
import { PriceRangeSettings } from '../drawing-settings-popups/price-range-settings.component';
import { DateRangeSettings } from '../drawing-settings-popups/date-range-settings.component';
import { ElliottImpulseWaveSettings } from '../drawing-settings-popups/elliott-impulse-wave-settings.component';
import { FibonacciProjectionSettings } from '../drawing-settings-popups/fibonacci-projection-settings.component';
import { ArcSettings } from '../drawing-settings-popups/arc-settings.component';
import { FibonacciTimeZonesSettings } from '../drawing-settings-popups/fibonacci-time-zones.component';
import { FibonacciCirclesSettings } from '../drawing-settings-popups/fibonacci-circles-settings.component';
import { GannBoxSettings } from '../drawing-settings-popups/gann-box-settings.component';
import { ElliottCorrectionWaveSettings } from '../drawing-settings-popups/elliott-correction-wave-settings.component';
import { ButtonIconStyled, DrawingsToolbarContainerStyled, DrawingsToolbarStyled, ButtonDraggableStyled, ButtonSettingsIconStyled, DrawingsToolbarIconWrapperStyled, ButtonLockedIconStyled, } from './drawings-settings-toolbar.styled';
import { FibonacciChannelSettings } from '../drawing-settings-popups/fibonacci-channel.component';
import { GannSquareSettings } from '../drawing-settings-popups/gann-square-settings.component';
import DragWrapper from '../../drag-wrapper/drag-wrapper.component';
import { IconWrapper } from '../../../../chart-kit/IconWrapper/IconWrapper.component';
import { Lens, fromTraversable } from 'monocle-ts';
import { createOnColorChange_FromTraversal, createOnLineChange_FromTraversal, updateDrawingLineColor, updateDrawingLineWidthDash, onLineAndBackgroundColorChange, } from './drawing-toolbar-functions';
import { toCanvasLineDash, toCanvasLineWidth } from '../../../../utils/drawing.utils';
import { FullHeightToolbarSeparatorStyled, ToolbarSeparatorStyled } from './components/toolbar-separator.styled';
import { RegressionTrendSettings } from '../drawing-settings-popups/regression-trend-settings.component';
import { FibonacciSpiralSettings } from '../drawing-settings-popups/fibonacci-spiral-settings.component';
import { CycleBracketsSettings } from '../drawing-settings-popups/cycle-brackets-settings.component';
import { FibonacciTimeExtensionSettings } from '../drawing-settings-popups/fibonacci-time-extension-settings.component';
import { FibonacciTimeRatiosSettings } from '../drawing-settings-popups/fibonacci-time-ratios-settings.component';
import { DrawingToolbarEventTargetProvider } from './drawing-toolbar-event-target-context';
import { ChartReactAppContext } from '../../../defaults';
const DrawingSettingsToolbar = memo((props) => {
    const { drawing, instrument, onRemove, onDrawingChange, palette, isPopupOpened, togglePopup, requestRestoreDefaults, setMagnetMode, drawingsDict, className, iconsConfig, onDrag, toolbarWidth, updateToolbarWidth, toggleDrawingLocked, position, bounds, currentTimezone, } = props;
    const toolbarRef = useRef();
    const onRemoveClick = useCallback(() => isSome(drawing) && onRemove(drawing.value), [onRemove, drawing]);
    const openPopup = useCallback(() => togglePopup(true), [togglePopup]);
    const requestClose = useCallback(() => {
        togglePopup(false);
    }, [togglePopup]);
    const shiftKeyHandler = useCallback((e) => {
        if (e.key === 'Shift' && isSome(drawing)) {
            if (e.type === 'keydown') {
                setMagnetMode(true, false);
            }
            else {
                setMagnetMode(false, false);
            }
        }
    }, [setMagnetMode, drawing]);
    const updateToolbarRef = useCallback((ref) => {
        toolbarRef.current = ref;
        updateToolbarWidth(ref.offsetWidth);
    }, [updateToolbarWidth]);
    useEffect(() => {
        document.addEventListener('keydown', shiftKeyHandler);
        document.addEventListener('keyup', shiftKeyHandler);
        return () => {
            document.removeEventListener('keydown', shiftKeyHandler);
            document.removeEventListener('keyup', shiftKeyHandler);
        };
    }, [shiftKeyHandler]);
    const getDrawingToolbarContent = useCallback((drawing) => {
        const drawingPopupSettingsProps = {
            drawingsDict,
            onValueChange: onDrawingChange,
            palette,
            value: drawing,
            instrument: option.toUndefined(instrument),
            currentTimezone,
        };
        return (React.createElement(React.Fragment, null,
            React.createElement(ButtonSettingsIconStyled, { icon: React.createElement(DrawingsToolbarIconWrapperStyled, null, iconsConfig.drawings.settingsToolbar.settings), onClick: openPopup }),
            React.createElement(DrawingPopup, { title: getDrawingSettingsFormTitle(drawing, drawingsDict), isOpened: isPopupOpened, requestClose: requestClose, requestRestoreDefaults: requestRestoreDefaults, isModal: true }, getDrawingSettingsForm(drawing, drawingPopupSettingsProps))));
    }, [
        openPopup,
        drawingsDict,
        isPopupOpened,
        onDrawingChange,
        requestClose,
        requestRestoreDefaults,
        instrument,
        palette,
        iconsConfig.drawings.settingsToolbar.settings,
        currentTimezone,
    ]);
    const { isMobile } = useContext(ChartReactAppContext);
    const DraggableZoneClassName = 'draggableZone';
    const dragWrapperBounds = {
        left: 0,
        right: bounds.width - toolbarWidth,
        top: 0,
        bottom: bounds.height,
    };
    const isSelected = useMemo(() => option.isSome(drawing), [drawing]);
    const toggleLockedHandler = useCallback((e) => {
        e.stopPropagation();
        isSome(drawing) && toggleDrawingLocked(drawing.value, !drawing.value.locked);
    }, [drawing, toggleDrawingLocked]);
    const lockedBtnIcon = useMemo(() => {
        const locked = isSome(drawing) && drawing.value.locked;
        return (React.createElement(DrawingsToolbarIconWrapperStyled, { preventIconFill: locked, width: 25, height: 25 }, locked ? iconsConfig.chartLayers.unlock : iconsConfig.chartLayers.lock));
    }, [drawing, iconsConfig.chartLayers.lock, iconsConfig.chartLayers.unlock]);
    return (React.createElement(React.Fragment, null,
        React.createElement(DragWrapper, { handle: `.${DraggableZoneClassName}`, drag: onDrag, position: position, bounds: dragWrapperBounds },
            React.createElement(DrawingsToolbarContainerStyled, { isSelected: isSelected, className: className, ref: node => node && updateToolbarRef(node) }, pipe(drawing, option.chain(drawing => (isScalingDrawing(drawing.type) ? option.none : option.some(drawing))), option.fold(constNull, drawing => (React.createElement(DrawingToolbarEventTargetProvider, { value: toolbarRef.current },
                React.createElement(DrawingsToolbarStyled, null,
                    React.createElement("span", { className: DraggableZoneClassName },
                        React.createElement(ButtonDraggableStyled, { icon: React.createElement(IconWrapper, null, iconsConfig.drawings.settingsToolbar.drag) })),
                    React.createElement(FullHeightToolbarSeparatorStyled, null),
                    getToolbarShortcuts({
                        drawingModel: drawing,
                        onValueChange: onDrawingChange,
                        palette,
                        drawingsDict,
                        currentTimezone,
                    }),
                    !isEditableTextDrawingType(drawing.type) && React.createElement(ToolbarSeparatorStyled, null),
                    !isMobile &&
                        !isEditableTextDrawingType(drawing.type) &&
                        !isSimpleDrawingType(drawing.type) && (React.createElement(ToolbarItem, null, getDrawingToolbarContent(drawing))),
                    React.createElement(ToolbarItem, null,
                        React.createElement(ButtonLockedIconStyled, { icon: lockedBtnIcon, onClick: toggleLockedHandler })),
                    React.createElement(ToolbarItem, null,
                        React.createElement(ButtonIconStyled, { icon: React.createElement(DrawingsToolbarIconWrapperStyled, null, iconsConfig.drawings.settingsToolbar.remove), onClick: onRemoveClick })))))))))));
});
const lensCircles = Lens.fromPath()(['properties', 'circles'])
    .composeTraversal(fromTraversable(array.Traversable)())
    .composeLens(Lens.fromProp()('line'));
const lensGannFanRays = Lens.fromPath()(['properties', 'rays'])
    .composeTraversal(fromTraversable(array.Traversable)())
    .composeLens(Lens.fromProp()('line'));
const PitchforkLevels = Lens.fromPath()(['properties', 'levels']).composeTraversal(fromTraversable(array.Traversable)());
const fibonacciRays = Lens.fromPath()(['properties', 'rays']).composeTraversal(fromTraversable(array.Traversable)());
const fibonacciTimeZones = Lens.fromPath()([
    'properties',
    'zones',
]).composeTraversal(fromTraversable(array.Traversable)());
const fibonacciRetracements = Lens.fromPath()([
    'properties',
    'levels',
]).composeTraversal(fromTraversable(array.Traversable)());
const lensGannBoxPriceLevels = Lens.fromPath()(['properties', 'coefficients', 'priceLevel'])
    .composeTraversal(fromTraversable(array.Traversable)())
    .composeLens(Lens.fromProp()('line'));
const lensGannBoxTimeLevels = Lens.fromPath()(['properties', 'coefficients', 'timeLevel'])
    .composeTraversal(fromTraversable(array.Traversable)())
    .composeLens(Lens.fromProp()('line'));
const lensGannSquareLevels = Lens.fromPath()(['properties', 'coefficients', 'levels'])
    .composeTraversal(fromTraversable(array.Traversable)())
    .composeLens(Lens.fromProp()('line'));
const lensGannSquareFans = Lens.fromPath()(['properties', 'coefficients', 'fans'])
    .composeTraversal(fromTraversable(array.Traversable)())
    .composeLens(Lens.fromProp()('line'));
const lensGannSquareArcs = Lens.fromPath()(['properties', 'coefficients', 'arcs'])
    .composeTraversal(fromTraversable(array.Traversable)())
    .composeLens(Lens.fromProp()('line'));
const regressionTrendSectionsLens = Lens.fromPath()(['properties', 'sections'])
    .composeTraversal(fromTraversable(array.Traversable)())
    .composeLens(Lens.fromProp()('line'));
/**
 * Returns toolbar for specific drawing.
 * There are 3 main types of toolbar - look in figma.
 * Color / line change callbacks are different per drawing.
 * @param props
 */
const getToolbarShortcuts = (props) => {
    const { drawingModel, onValueChange } = props;
    /* Override the onColorChange and onLinePickerChange for particular drawing */
    let onColorChange = (color) => pipe(drawingModel, updateDrawingLineColor(color), onValueChange);
    let onLinePickerChange = (linePicker) => {
        const linePropsCanvas = {
            lineWidth: toCanvasLineWidth(linePicker.lineWidth),
            lineDash: toCanvasLineDash(linePicker.lineDash),
        };
        pipe(drawingModel, updateDrawingLineWidthDash(linePropsCanvas), onValueChange);
    };
    switch (drawingModel.type) {
        case 'highlighter':
            if (isExactDrawingModel(drawingModel, 'highlighter')) {
                return React.createElement(HighlighterDrawingSettingsShortcuts, { ...props, value: drawingModel });
            }
            return React.createElement(Fragment, null);
        case 'icon':
            if (isExactDrawingModel(drawingModel, 'icon')) {
                return React.createElement(IconDrawingSettingsShortcuts, { ...props, value: drawingModel });
            }
            return React.createElement(Fragment, null);
        case 'text':
        case 'callout':
        case 'price_label':
            // TODO: find out, how we can escape these typeguards. I guess descriminated unions is a way to go
            // TODO "yes, discriminated unions is a way to go, but let's wait for safe moment - after DEMO is great" (Alexey)
            if (isTextDrawingModel(drawingModel)) {
                return React.createElement(TextDrawingSettingsShortcuts, { ...props, value: drawingModel });
            }
            return React.createElement(Fragment, null);
        case 'fibonacci_ark':
        case 'fibonacci_circles':
            // @ts-ignore
            onColorChange = createOnColorChange_FromTraversal(onValueChange)([lensCircles])(drawingModel);
            // @ts-ignore
            onLinePickerChange = createOnLineChange_FromTraversal(onValueChange)([lensCircles])(drawingModel);
            break;
        case 'fibonacci_retracements':
            // @ts-ignore
            onColorChange = createOnColorChange_FromTraversal(onValueChange)([fibonacciRetracements])(drawingModel);
            // @ts-ignore
            onLinePickerChange = createOnLineChange_FromTraversal(onValueChange)([fibonacciRetracements])(drawingModel);
            break;
        case 'fibonacci_rays': {
            // @ts-ignore
            onColorChange = createOnColorChange_FromTraversal(onValueChange)([fibonacciRays])(drawingModel);
            // @ts-ignore
            onLinePickerChange = createOnLineChange_FromTraversal(onValueChange)([fibonacciRays])(drawingModel);
            break;
        }
        case 'fibonacci_projection':
        case 'fibonacci_channel':
        case 'fibonacci_time_zones': {
            // @ts-ignore
            onColorChange = createOnColorChange_FromTraversal(onValueChange)([fibonacciTimeZones])(drawingModel);
            // @ts-ignore
            onLinePickerChange = createOnLineChange_FromTraversal(onValueChange)([fibonacciTimeZones])(drawingModel);
            break;
        }
        case 'pitchfork':
            // @ts-ignore
            onColorChange = createOnColorChange_FromTraversal(onValueChange)([PitchforkLevels])(drawingModel);
            // @ts-ignore
            onLinePickerChange = createOnLineChange_FromTraversal(onValueChange)([PitchforkLevels])(drawingModel);
            break;
        case 'gann_fan':
            // @ts-ignore
            onColorChange = createOnColorChange_FromTraversal(onValueChange)([lensGannFanRays])(drawingModel);
            // @ts-ignore
            onLinePickerChange = createOnLineChange_FromTraversal(onValueChange)([lensGannFanRays])(drawingModel);
            break;
        case 'gann_box':
            // prettier-ignore
            // @ts-ignore
            onColorChange = createOnColorChange_FromTraversal(onValueChange)([lensGannBoxPriceLevels, lensGannBoxTimeLevels,])(drawingModel);
            // prettier-ignore
            // @ts-ignore
            onLinePickerChange = createOnLineChange_FromTraversal(onValueChange)([lensGannBoxPriceLevels, lensGannBoxTimeLevels,])(drawingModel);
            break;
        case 'gann_square':
            // prettier-ignore
            // @ts-ignore
            onColorChange = createOnColorChange_FromTraversal(onValueChange)([lensGannSquareLevels, lensGannSquareFans, lensGannSquareArcs,])(drawingModel);
            // prettier-ignore
            // @ts-ignore
            onLinePickerChange = createOnLineChange_FromTraversal(onValueChange)([lensGannSquareLevels, lensGannSquareFans, lensGannSquareArcs,])(drawingModel);
            break;
        case 'regression_trend':
            // @ts-ignore
            onColorChange = createOnColorChange_FromTraversal(onValueChange)([regressionTrendSectionsLens])(drawingModel);
            // @ts-ignore
            onLinePickerChange = createOnLineChange_FromTraversal(onValueChange)([regressionTrendSectionsLens])(drawingModel);
            break;
        case 'curve':
        case 'arc':
        case 'date_price_range':
        case 'price_range':
        case 'date_range':
            onColorChange = onLineAndBackgroundColorChange(onValueChange)(drawingModel);
            break;
        case 'line':
        case 'arrow':
        case 'extended_line':
        case 'ellipse':
        case 'horizontal_line':
        case 'horizontal_ray':
        case 'brush':
        case 'path':
        case 'rectangle':
        case 'info_line':
        case 'ray':
        case 'vertical_line':
        case 'trend_channel':
        case 'vertical_arrow_up':
        case 'vertical_arrow_down':
        case 'elliott_wave':
        case 'elliott_correction_wave':
        case 'fibonacci_spiral':
        default:
    }
    return (React.createElement(CommonDrawingSettingsShortcuts, { ...props, onLinePickerChange: onLinePickerChange, onColorChange: onColorChange, value: drawingModel }));
};
const getDrawingSettingsForm = (drawing, props) => {
    const type = drawing.type;
    switch (type) {
        case 'vertical_arrow_down':
            return React.createElement(DownArrowSettings, { ...props });
        case 'arrow':
            return React.createElement(ArrowSettings, { ...props });
        case 'fibonacci_ark':
            return React.createElement(FibonacciArksSettings, { ...props });
        case 'fibonacci_circles':
            return React.createElement(FibonacciCirclesSettings, { ...props });
        case 'fibonacci_rays':
            return React.createElement(FibonacciRaysSettings, { ...props });
        case 'gann_fan':
            return React.createElement(GannFannSettings, { ...props });
        case 'fibonacci_retracements':
            return React.createElement(FibonacciRetracementsSettings, { ...props });
        case 'fibonacci_time_zones':
            return React.createElement(FibonacciTimeZonesSettings, { ...props });
        case 'fibonacci_channel':
            return React.createElement(FibonacciChannelSettings, { ...props });
        case 'extended_line':
            return React.createElement(ExtendedLineSettings, { ...props });
        case 'ellipse':
            return React.createElement(OvalSettings, { ...props });
        case 'pitchfork':
            return React.createElement(PitchforkSettings, { ...props });
        case 'horizontal_line':
            return React.createElement(PriceLineSettings, { ...props });
        case 'info_line':
            return React.createElement(InfoLineSettings, { ...props });
        case 'horizontal_ray':
            return React.createElement(HorizontalRaySettings, { ...props });
        case 'brush':
            return React.createElement(BrushSettings, { ...props });
        case 'rectangle':
            return React.createElement(RectangleSettings, { ...props });
        case 'gann_box':
            return React.createElement(GannBoxSettings, { ...props });
        case 'gann_square':
            return React.createElement(GannSquareSettings, { ...props });
        case 'ray':
            return React.createElement(RaySettings, { ...props });
        case 'vertical_line':
            return React.createElement(TimeLineSettings, { ...props });
        case 'path':
            return React.createElement(PathSettings, { ...props });
        case 'date_price_range':
            return React.createElement(DatePriceRangeSettings, { ...props });
        case 'price_range':
            return React.createElement(PriceRangeSettings, { ...props });
        case 'date_range':
            return React.createElement(DateRangeSettings, { ...props });
        case 'trend_channel':
            return React.createElement(TrendChannelSettings, { ...props });
        case 'curve':
            return React.createElement(CurveSettings, { ...props });
        case 'arc':
            return React.createElement(ArcSettings, { ...props });
        case 'vertical_arrow_up':
            return React.createElement(UpArrowSettings, { ...props });
        case 'fibonacci_projection':
            return React.createElement(FibonacciProjectionSettings, { ...props });
        case 'line':
            return React.createElement(TrendLineSettings, { ...props });
        case 'highlighter':
            return React.createElement(HighlighterSettings, { ...props });
        case 'elliott_wave':
            return React.createElement(ElliottImpulseWaveSettings, { ...props });
        case 'elliott_correction_wave':
            return React.createElement(ElliottCorrectionWaveSettings, { ...props });
        case 'regression_trend':
            return React.createElement(RegressionTrendSettings, { ...props });
        case 'fibonacci_spiral':
            return React.createElement(FibonacciSpiralSettings, { ...props });
        case 'cycle_brackets':
            return React.createElement(CycleBracketsSettings, { ...props });
        case 'fibonacci_time_extension':
            return React.createElement(FibonacciTimeExtensionSettings, { ...props });
        case 'fibonacci_time_ratios':
            return React.createElement(FibonacciTimeRatiosSettings, { ...props });
        default:
            return React.createElement(NotImplementedSettings, { ...props });
    }
};
const getDrawingSettingsFormTitle = (drawing, drawingsDict) => {
    const type = drawing.type;
    return drawingsDict.popup.title[type] || drawingsDict.popup.title.default;
};
export default DrawingSettingsToolbar;
