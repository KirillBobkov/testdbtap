import React, { useMemo } from 'react';
import { isEditDrawingMode } from '../view-models/drawings/drawing.view-model';
import { context } from '../../context/context2';
import { DrawingsSelector } from '../components/drawings/drawings-selector/drawings-selector.component';
import { useObservable } from '../../utils/use-observable';
import { namedMemo } from '../../utils/named-memo';
import { useProperty } from '../../utils/use-property';
import { createAdapter } from '../../utils/adapter.utils';
export const DrawingsSelectorContainer = context.combine(context.key()('drawingViewModel'), context.key()('localization'), context.key()('chartReactConfig'), (vm, localization, chartReactConfig) => namedMemo('DrawingsSelectorContainer', () => {
    const [changeDrawingType, drawingType$] = createAdapter();
    const drawingsList = chartReactConfig.drawings.drawingsList.map(group => group.drawings).flat();
    const drawingType = useObservable(drawingType$, drawingsList[0]);
    const drawingMode = useProperty(vm.drawingMode);
    const isClearButtonEnabled = useObservable(vm.doesChartHaveDrawings, false);
    const isVisibilityButtonEnabled = useObservable(vm.doesChartHaveDrawings, false);
    const areDrawingsVisible = useObservable(vm.isVisible, true);
    const areDrawingsDisabled = useObservable(vm.isDisabled, true);
    const isPopoverOpened = useObservable(vm.isPopoverOpened, false);
    const mappedDrawingMode = useMemo(() => {
        if (isEditDrawingMode(drawingMode)) {
            const drawingModel = drawingMode.drawing;
            return drawingModel.fixedPoints < drawingModel.figure.points ? 'NewDrawing' : 'EditDrawing';
        }
        return 'Default';
    }, [drawingMode]);
    return (React.createElement(React.Fragment, null, chartReactConfig.drawings.toolbar.enabled && (React.createElement(DrawingsSelector, { changeDrawingType: changeDrawingType, startNewDrawing: vm.startNewDrawing, startNewIconDrawing: vm.startNewIconDrawing, cancelDrawing: vm.cancelDrawing, changeVisibility: vm.changeVisibility, clearDrawings: vm.clearDrawings, onTogglePopover: vm.togglePopover, isPopoverOpened: isPopoverOpened, areDrawingsDisabled: areDrawingsDisabled, areDrawingsVisible: areDrawingsVisible, isClearButtonEnabled: isClearButtonEnabled, isVisibilityButtonEnabled: isVisibilityButtonEnabled, drawingType: drawingType, drawingMode: mappedDrawingMode, localization: localization, icons: vm.iconDrawingIcons, drawingsList: drawingsList }))));
}));
