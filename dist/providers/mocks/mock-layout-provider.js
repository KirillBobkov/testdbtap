import { replaceInArray } from '@devexperts/dxcharts-lite/dist/chart/utils/array.utils';
import { createPropertyAdapter } from '../../utils/property.utils';
export const createMockLayoutProvider = () => {
    const [setLayoutData, layoutData] = createPropertyAdapter({
        selectedLayoutId: '0',
        layouts: [],
    });
    const mockLayoutProvider = {
        createLayout(layout) {
            const id = Math.random().toString(36).substr(2, 9);
            const layoutWithId = { id, ...layout };
            const lastUpdateTimeStamp = Date.now();
            const newLayoutData = {
                selectedLayoutId: id,
                layouts: [...layoutData.getValue().layouts, { ...layoutWithId, lastUpdateTimeStamp }],
            };
            setLayoutData(newLayoutData);
            return Promise.resolve(id);
        },
        getLayouts() {
            return Promise.resolve(layoutData.getValue());
        },
        updateLayout(layout) {
            const _layoutData = layoutData.getValue();
            _layoutData.layouts = replaceInArray(_layoutData.layouts, (item) => item.id === layout.id, layout);
            setLayoutData(_layoutData);
            return Promise.resolve();
        },
        updateSelectedLayout(id) {
            const _layoutData = layoutData.getValue();
            _layoutData.selectedLayoutId = id;
            setLayoutData(_layoutData);
            return Promise.resolve();
        },
        deleteLayout(id) {
            const _layoutData = layoutData.getValue();
            _layoutData.layouts = _layoutData.layouts.filter(layout => layout.id !== id);
            setLayoutData(_layoutData);
            return Promise.resolve();
        },
    };
    return mockLayoutProvider;
};
