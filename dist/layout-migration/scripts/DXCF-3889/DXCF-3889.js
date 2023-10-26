const toNewStudyLineType = (oldType) => {
    switch (oldType) {
        case 'RECTANGULAR_TYPE':
            return 'RECTANGULAR';
        case 'DIFFERENCE_TYPE':
            return 'DIFFERENCE';
        case 'TREND_HISTOGRAM_TYPE':
            return 'TREND_HISTOGRAM';
        case 'HISTOGRAM_TYPE':
            return 'HISTOGRAM';
        case 'ABOVE_CANDLE_TRIANGLE':
            return 'TRIANGLE';
        case 'POINTS_TYPE':
            return 'POINTS';
        case 'ABOVE_CANDLE_TEXT':
        case 'BELOW_CANDLE_TEXT':
            return 'TEXT';
        case 'COMPARATIVE_TYPE':
        case 'UNDEFINED_TYPE':
        case 'LINEAR_TYPE':
        default:
            return 'LINEAR';
    }
};
export const DXCF_3889 = {
    name: 'DXCF-3889',
    migrateFn: layout => {
        layout.charts = layout.charts.map((chart) => ({
            ...chart,
            studies: chart.studies.map((study) => ({
                ...study,
                lines: study.lines.map((l) => ({ ...l, studyLineType: toNewStudyLineType(l.studyLineType) })),
            })),
        }));
        // eslint-disable-next-line no-restricted-syntax
        return layout;
    },
};
