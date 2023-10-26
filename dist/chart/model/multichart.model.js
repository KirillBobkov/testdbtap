const layouts = ['1x1', '2x2', '2x1', '1x2', '3x1', '1x3'];
export const isChartVisibleInMultiChartLayout = (layout, chartId) => {
    switch (layout) {
        case '1x1':
            if (chartId === 0) {
                return true;
            }
            return false;
        case '1x2':
        case '2x1':
            if (chartId < 2) {
                return true;
            }
            return false;
        case '1x3':
        case '3x1':
            if (chartId < 3) {
                return true;
            }
            return false;
        case '2x2':
            return true;
        default:
            return true;
    }
};
