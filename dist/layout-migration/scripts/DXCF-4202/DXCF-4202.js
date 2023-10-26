const addPLayerItemsVisibilityToGroup = (layerItems) => {
    return layerItems.map(layerItem => {
        if (layerItem.type === 'group') {
            layerItem.itemsVisibility = layerItem.items.map(item => ({ id: item.id, visible: item.visible }));
        }
        return layerItem;
    });
};
export const DXCF_4202 = {
    name: 'DXCF-4202',
    migrateFn: layout => {
        layout.charts = layout.charts.map((chart) => {
            const layerItems = {};
            Object.keys(chart.layers.layerItems).forEach(key => {
                Object.assign(layerItems, { [key]: addPLayerItemsVisibilityToGroup(chart.layers.layerItems[key]) });
            });
            return {
                ...chart,
                layers: {
                    ...chart.layers,
                    layerItems,
                },
            };
        });
        // eslint-disable-next-line no-restricted-syntax
        return layout;
    },
};
