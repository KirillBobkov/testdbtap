import { createPropertyAdapter } from '../../utils/property.utils';
export const createMockDxStudiesProvider = (initialStudies) => {
    const [setStudies, studies] = createPropertyAdapter(initialStudies);
    return {
        observeStudies() {
            return studies;
        },
        getStudies() {
            return studies.getValue();
        },
        setStudies,
        updateStudy(study) {
            const studiesList = studies.getValue();
            const found = studiesList.find(s => s.id === study.id);
            if (found) {
                setStudies(studiesList.map(s => {
                    if (s.id === study.id) {
                        return study;
                    }
                    return s;
                }));
            }
            else {
                console.warn(`Unable to find a study with id ${study.id}!`);
            }
        },
        getStudy(id) {
            return studies.getValue().find(s => s.id === id);
        },
    };
};
