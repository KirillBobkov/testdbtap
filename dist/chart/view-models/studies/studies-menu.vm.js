import { filter } from 'rxjs/operators';
import { context } from '../../../context/context2';
import { newSink } from '../../../context/sink2';
import { createPropertyAdapter } from '../../../utils/property.utils';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StudySeriesModel } from '@dx-private/dxchart5-modules/dist/studies/model/study-data-series.model';
export const createStudiesMenuViewModel = context.combine(context.key()('chart'), context.key()('studiesSettingsViewModel'), context.key()('dynamicObjectsVM'), (chart, studiesSettingsViewModel, dynamicObjectsVM) => {
    const [setIsOpened, isOpened] = createPropertyAdapter(false);
    const [setMenuPosition, menuPosition] = createPropertyAdapter({ x: 0, y: 0 });
    const closeMenu = () => setIsOpened(false);
    const bringToFrontStudy = (uuid) => {
        chart.studies.model.allStudies[uuid].dataSeries.forEach(series => dynamicObjectsVM.bringToFront(series.id));
    };
    const sendToBackStudy = (uuid) => chart.studies.model.allStudies[uuid].dataSeries.forEach(series => dynamicObjectsVM.sendToBack(series.id));
    const onDuplicateStudy = (uuid) => studiesSettingsViewModel.duplicateStudy(uuid);
    const onOpenSettings = (uuid) => studiesSettingsViewModel.onConfigureStudy(uuid);
    const openMenuOnRightClickEffect = chart.hitTestCanvasModel.observeRightClickOnElement().pipe(filter(ev => ev.model instanceof StudySeriesModel), tap(() => {
        setMenuPosition({ ...chart.canvasInputListener.currentPointDocument });
        setIsOpened(true);
    }));
    const effects = merge(openMenuOnRightClickEffect);
    return newSink({
        isOpened,
        closeMenu,
        menuPosition,
        bringToFrontStudy,
        sendToBackStudy,
        onOpenSettings,
        onDuplicateStudy,
    }, effects);
});
