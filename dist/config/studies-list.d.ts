import { TRawStudySettings } from '../chart/model/studies.model';
import { StudiesDictionary } from './localization/studies';
export type StudiesList = TRawStudySettings[];
/**
 * List of all studies.
 * @doc-tags chart-react,default-config,studies
 */
export declare const DEFAULT_STUDIES_LIST: (studiesDictionary?: StudiesDictionary) => StudiesList;
