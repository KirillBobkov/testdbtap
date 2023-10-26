import { createPropertyAdapter } from '../../utils/property.utils';
import { isSome } from 'fp-ts/Option';
import { option } from 'fp-ts';
import { pipe } from 'fp-ts/function';
import { observable } from 'fp-ts-rxjs';
import { constVoid } from 'fp-ts/function';
import { replaceInArray } from '@devexperts/dxcharts-lite/dist/chart/utils/array.utils';
import { firstValueFrom } from 'rxjs';
export const INDICATOR_TEMPLATE_KEY = 'indicators';
export const createLocalStorageIndicatorsTemplateProvider = () => {
    const maybeInitialTemplate = pipe(option.fromNullable(localStorage.getItem(INDICATOR_TEMPLATE_KEY)), option.map(raw => JSON.parse(raw)));
    const [setTemplateData, templateData] = createPropertyAdapter(maybeInitialTemplate);
    return {
        createTemplate(template) {
            const id = Math.random().toString(36).substring(2, 11);
            console.log(`Creating new template: ${id}`);
            const templateWithId = { id, ...template };
            pipe(option.fromNullable(localStorage.getItem(INDICATOR_TEMPLATE_KEY)), option.fold(() => {
                const newTemplateData = [templateWithId];
                return newTemplateData;
            }, raw => {
                const templateDataStorage = JSON.parse(raw);
                const templateData = [...templateDataStorage, templateWithId];
                return templateData;
            }), templateData => {
                localStorage.setItem(INDICATOR_TEMPLATE_KEY, JSON.stringify(templateData));
                setTemplateData(option.some(templateData));
            });
            return Promise.resolve(id);
        },
        getTemplates() {
            return pipe(templateData, observable.map(data => {
                return isSome(data) ? data.value : [];
            }), templates => firstValueFrom(templates));
        },
        updateTemplate(template) {
            pipe(option.fromNullable(localStorage.getItem(INDICATOR_TEMPLATE_KEY)), option.map(raw => JSON.parse(raw)), option.fold(constVoid, templateData => {
                templateData = replaceInArray(templateData, item => item.id === template.id, template);
                localStorage.setItem(INDICATOR_TEMPLATE_KEY, JSON.stringify(templateData));
                setTemplateData(option.some(templateData));
            }));
            return Promise.resolve(void 0);
        },
        deleteTemplate(id) {
            pipe(option.fromNullable(localStorage.getItem(INDICATOR_TEMPLATE_KEY)), option.map(raw => JSON.parse(raw)), option.fold(constVoid, templateData => {
                templateData = templateData.filter(template => template.id !== id);
                localStorage.setItem(INDICATOR_TEMPLATE_KEY, JSON.stringify(templateData));
                setTemplateData(option.some(templateData));
            }));
            return Promise.resolve(void 0);
        },
    };
};
