import { Option } from 'fp-ts/Option';
import { StudyParamSelectableType, TStudySettings } from '../../../model/studies.model';
export * from '../../../model/studies.model';
export interface StudyParamSelectableTypeOptions extends Array<{
    value: StudyParamSelectableType;
    caption: string;
}> {
}
export declare const getStudyById: (studies: TStudySettings[], id: string) => Option<TStudySettings>;
export declare const getStudyByUUID: (studies: TStudySettings[], uuid: string) => Option<TStudySettings>;
