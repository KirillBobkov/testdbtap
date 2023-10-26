export const DXCF_3762 = {
    name: 'DXCF-3762',
    migrateFn: layout => {
        layout.charts = layout.charts.map((chart) => {
            const coreConfigFitSettings = chart.chartCoreConfig.scale?.fit;
            const coreConfigUnderlaysResizer = chart.chartCoreConfig.components.underlaysResizer;
            const copy = JSON.parse(JSON.stringify(chart));
            delete copy.chartCoreConfig.components.underlaysResizer;
            coreConfigUnderlaysResizer &&
                (copy.chartCoreConfig.components.paneResizer = { ...coreConfigUnderlaysResizer });
            delete copy.chartCoreConfig.scale.fit;
            coreConfigFitSettings && (copy.chartReactConfig.scale = { fit: { ...coreConfigFitSettings } });
            return copy;
        });
        // eslint-disable-next-line no-restricted-syntax
        return layout;
    },
};
