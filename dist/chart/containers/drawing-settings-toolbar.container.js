import { isSome, none } from 'fp-ts/Option';
import { cloneUnsafe } from '@devexperts/dxcharts-lite/dist/chart/utils/object.utils';
import { createElement, memo, useContext, useMemo } from 'react';
import { context } from '../../context/context2';
import { IconsOverridingContext } from '../../utils/icons-overriding-context';
import { namedMemo } from '../../utils/named-memo';
import { importIdle } from '../../utils/react.utils';
import { useObservable } from '../../utils/use-observable';
import { useProperty } from '../../utils/use-property';
import { EXCHANGE } from '../view-models/time-zone.view-model';
const DrawingSettingsToolbar = importIdle(() => import(
/* webpackChunkName: "drawing-settings-toolbar" */ '../components/drawings/drawing-settings-toolbar/drawing-settings-toolbar.component'));
// This division between container and component in context for this file exists because
// we don't want to active hooks below if toolbar isn't rendered - they cause unnecessary React rerenders
const DrawingToolbarComponent = context.combine(context.key()('drawingViewModel'), context.key()('chartDataViewModel'), context.key()('chartConfiguratorViewModel'), context.key()('timeZoneViewModel'), context.key()('colorPalette'), context.key()('localization'), (vm, chartDataVM, chartConfigVM, timeZoneViewModel, colorPalette, localization) => memo((props) => {
    const instrument = useProperty(chartDataVM.instrument);
    const drawing = useObservable(vm.currentEditableDrawing, none);
    const isPopupOpened = useObservable(vm.isSettingsPopupOpened, false);
    const { settings } = useProperty(chartConfigVM.state);
    const drawingsDict = localization.drawings;
    const iconsConfig = useContext(IconsOverridingContext);
    const position = useProperty(vm.toolbarPositionPixels);
    const bounds = useProperty(vm.chartBounds);
    const toolbarWidth = useProperty(vm.toolbarWidth);
    const currentTZ = useObservable(timeZoneViewModel.currentTimezone, '');
    const exchangeTZ = useObservable(timeZoneViewModel.currentExchange, '');
    const currentTimezone = useMemo(() => (currentTZ === EXCHANGE ? exchangeTZ : currentTZ), [currentTZ, exchangeTZ]);
    return createElement(DrawingSettingsToolbar, {
        onDrag: vm.handleDrag,
        onRemove: vm.removeDrawing,
        drawing: cloneUnsafe(drawing),
        instrument,
        currentTimezone,
        onDrawingChange: vm.updateDrawing,
        palette: colorPalette,
        togglePopup: vm.toggleSettingsPopup,
        isPopupOpened,
        requestRestoreDefaults: vm.resetChanges,
        magnetMode: settings.chartCore.components.drawings.magnet !== 0,
        setMagnetMode: chartConfigVM.setMagnetMode,
        drawingsDict,
        iconsConfig,
        updateToolbarWidth: vm.updateToolbarWidth,
        toggleDrawingLocked: vm.toggleDrawingLocked,
        position,
        bounds,
        toolbarWidth,
        ...props,
    });
}));
export const DrawingSettingsToolbarContainer = context.combine(DrawingToolbarComponent, context.key()('drawingViewModel'), (DrawingToolbarComponent, vm) => namedMemo('DrawingSettingsToolbarContainer', (props) => {
    const disabled = useObservable(vm.isDisabled, false);
    const drawing = useObservable(vm.currentEditableDrawing, none);
    return !disabled && isSome(drawing) ? createElement(DrawingToolbarComponent, props) : null;
}));
