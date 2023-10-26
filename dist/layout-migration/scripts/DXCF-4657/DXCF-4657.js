const studiesIds = ['AccelerationDeceleration', 'GatorOscillator', 'AwesomeOscillator'];
export const DXCF_4657 = {
    name: 'DXCF_4657',
    migrateFn: layout => {
        layout.charts = layout.charts.map((chart) => ({
            ...chart,
            studies: chart.studies.map((study) => {
                if (studiesIds.includes(study.id)) {
                    return {
                        ...study,
                        lines: study.lines.map((l) => ({
                            ...l,
                            studyLineType: updateStudyLineType(l.studyLineType),
                        })),
                    };
                }
                else {
                    return study;
                }
            }),
        }));
        // eslint-disable-next-line no-restricted-syntax
        return layout;
    },
};
const updateStudyLineType = (studyLineType) => {
    if (studyLineType === 'HISTOGRAM') {
        return 'TREND_HISTOGRAM';
    }
    return studyLineType;
};
