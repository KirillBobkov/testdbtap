import { context } from '../../../context/context2';
import { createPropertyAdapter } from '../../../utils/property.utils';
import { subscribeSingle } from '../../../utils/rx.utils';
import { EMPTY, from } from 'rxjs';
import { callTracerProxy } from '../../../utils/debug/call-tracer';
import { constVoid, pipe } from 'fp-ts/function';
import { sink } from '../../../utils/sink';
import { either, string } from 'fp-ts';
import { validateEmptyString, validateExistenceInArray, validateNoDuplicatesInArray, } from '../utils/validators';
import { compareLowerCasedStrings } from '../../../utils/string.utils';
const INITIAL_TEMPLATES = [];
export const createIndicatorsTemplateViewModel = context.combine(context.key()('multiChartViewModel'), context.key()('indicatorsTemplateProvider'), context.key()('dxStudiesProvider'), context.key()('studiesSettingsVMs'), context.key()('localization'), (multiChartViewModel, indicatorsTemplateProvider, dxStudiesProvider, studiesSettingsVMs, localization) => {
    const [setTemplateData, templateData] = createPropertyAdapter(INITIAL_TEMPLATES);
    const [setPopupOpen, isOpened] = createPropertyAdapter(false);
    // initial templates data fetch
    indicatorsTemplateProvider.getTemplates().then(setTemplateData);
    const addTemplate = (name) => pipe(name, string.trim, validateEmptyString(), either.chain(validateIndicatorTemplateName(localization.indicatorTemplates.validation_nameAlreadyExists)(templateData.getValue())), either.fold(either.left, name => {
        const defaultStudiesIds = dxStudiesProvider.getStudies().map(study => study.id);
        const studiesToAdd = [];
        const currentStudies = multiChartViewModel.getSelectedChartInfo().studies;
        currentStudies.forEach(study => {
            const foundStudy = defaultStudiesIds.find(id => id === study.id);
            if (foundStudy) {
                const { id, parameters, lines, overlaying } = study;
                const indicatorTemplateStudy = {
                    id,
                    parameters,
                    lines,
                    overlaying,
                };
                studiesToAdd.push(indicatorTemplateStudy);
            }
        });
        const template = {
            name,
            studies: studiesToAdd,
        };
        pipe(from(indicatorsTemplateProvider.createTemplate(template)), subscribeSingle((id) => {
            setPopupOpen(false);
            setTemplateData([...templateData.getValue(), { ...template, id }]);
        }));
        return either.right(void 0);
    }));
    const deleteTemplate = (id) => {
        indicatorsTemplateProvider.deleteTemplate(id);
        setTemplateData(templateData.getValue().filter(template => template.id !== id));
    };
    const updateTemplate = (id, name) => pipe(id, validateIndicatorTemplateExists(localization.indicatorTemplates.validation_cannotFindTemplateToUpdate)(templateData.getValue()), either.chain(template => pipe(name, string.trim, validateEmptyString(), either.chain(validateIndicatorTemplateNameWithId(localization.indicatorTemplates.validation_nameAlreadyExists)(template, templateData.getValue())), either.map(name => [template, name]))), either.fold(either.left, ([currentTemplate, name]) => {
        const updatedTemplate = { ...currentTemplate, name };
        indicatorsTemplateProvider.updateTemplate(updatedTemplate);
        setTemplateData(templateData.getValue().map(template => (template.id === id ? updatedTemplate : template)));
        return either.right(void 0);
    }));
    const selectTemplate = (id) => {
        const template = templateData.getValue().find(t => t.id === id);
        if (template) {
            const defaultStudies = dxStudiesProvider.getStudies();
            const templateStudies = [];
            template.studies.forEach(templateStudy => {
                const defaultStudy = defaultStudies.find(study => study.id === templateStudy.id);
                if (defaultStudy) {
                    const fullStudy = mergeTStudySettingsWithTemplateStudySettings(defaultStudy, templateStudy);
                    templateStudies.push(fullStudy);
                }
            });
            const selectedChartIdx = Number(multiChartViewModel.getSelectedChartInfo().id);
            studiesSettingsVMs[selectedChartIdx].setStudies(templateStudies);
            setPopupOpen(false);
        }
    };
    return sink.newSink(callTracerProxy('indicatorTemplateViewModel', {
        templateData,
        isOpened,
        addTemplate,
        deleteTemplate,
        updateTemplate,
        setPopupOpen,
        selectTemplate,
    }), EMPTY);
});
const mergeTStudySettingsWithTemplateStudySettings = (defaultStudy, templateStudy) => ({
    ...defaultStudy,
    ...templateStudy,
});
const validateIndicatorTemplateExists = (errorMessage) => (templates) => (id) => validateExistenceInArray(errorMessage)(templates)(t => t.id === id);
const validateIndicatorTemplateName = (errorMessage) => (templates) => (name) => validateNoDuplicatesInArray(errorMessage)(templates, t => compareLowerCasedStrings(t.name, name))(name);
const validateIndicatorTemplateNameWithId = (errorMessage) => (template, templates) => (name) => pipe(name, either.fromPredicate(name => compareLowerCasedStrings(name, template.name), constVoid), either.fold(() => validateIndicatorTemplateName(errorMessage)(templates)(name), either.right));
