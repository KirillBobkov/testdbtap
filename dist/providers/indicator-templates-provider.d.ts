import { TStudyLine, TStudyParameter } from '../chart/model/studies.model';
export type IndicatorTemplates = IndicatorTemplate[];
export interface IndicatorTemplate extends IndicatorTemplateNamed {
    id: string;
}
export interface IndicatorTemplateStudySettings {
    id: string;
    parameters: Array<TStudyParameter>;
    lines: Array<TStudyLine>;
    overlaying: boolean;
}
export interface IndicatorTemplateNamed {
    studies: IndicatorTemplateStudySettings[];
    name: string;
}
export interface IndicatorsTemplateProvider {
    /**
     * Creates the new template. Returns either the ID or error.
     * @param template - new indicator template to create
     */
    createTemplate(template: IndicatorTemplateNamed): Promise<string>;
    deleteTemplate(id: string): Promise<void>;
    updateTemplate(template: IndicatorTemplate): Promise<void>;
    getTemplates(): Promise<IndicatorTemplates>;
}
