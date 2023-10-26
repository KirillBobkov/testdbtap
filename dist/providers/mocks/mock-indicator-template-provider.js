import { createPropertyAdapter } from '../../utils/property.utils';
import { pipe } from 'fp-ts/function';
import { replaceInArray } from '@devexperts/dxcharts-lite/dist/chart/utils/array.utils';
import { uuid } from '@devexperts/dxcharts-lite/dist/chart/utils/uuid.utils';
import { firstValueFrom } from 'rxjs';
export const createMockIndicatorsTemplateProvider = () => {
    const [setTemplateData, templateData] = createPropertyAdapter([]);
    return {
        createTemplate: (template) => pipe(uuid(), id => ({ id, ...template }), templateWithId => {
            setTemplateData([...templateData.getValue(), templateWithId]);
            return Promise.resolve(templateWithId.id);
        }),
        getTemplates: () => pipe(templateData, indicators => firstValueFrom(indicators)),
        updateTemplate: (template) => pipe(replaceInArray(templateData.getValue(), item => item.id === template.id, template), setTemplateData, () => Promise.resolve(void 0)),
        deleteTemplate: (id) => pipe(templateData.getValue().filter(template => template.id !== id), setTemplateData, () => Promise.resolve(void 0)),
    };
};
