import { Subject, merge } from 'rxjs';
import { context } from '../../../context/context2';
import { newSink } from '../../../context/sink2';
import { createPropertyAdapter } from '../../../utils/property.utils';
export const createDrawingSyncViewModel = context.of((initialSyncEnabled) => {
    const [setDrawingSync, isDrawingSyncEnabled] = createPropertyAdapter(initialSyncEnabled);
    const syncedDrawingUpdated = new Subject();
    const syncedDrawingRemoved = new Subject();
    const saveDrawings = new Subject();
    const effects = merge();
    return newSink({
        saveDrawings,
        isDrawingSyncEnabled,
        setDrawingSync,
        syncedDrawingUpdated,
        syncedDrawingRemoved,
    }, effects);
});
