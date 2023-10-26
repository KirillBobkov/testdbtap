import { TStudySettings } from '../../chart/model/studies.model';
import { Observable } from 'rxjs';
/**
 * Used to feed studies data to DXChart.
 * Also can be used to store studies parameter changes.
 */
export interface DxStudiesProvider {
    getStudies(): Array<TStudySettings>;
    observeStudies(): Observable<Array<TStudySettings>>;
    setStudies(studies: Array<TStudySettings>): void;
    updateStudy(study: TStudySettings): void;
    getStudy(id: string): TStudySettings | undefined;
}
/**
 * Default impl of studies provider. Has dxScript specific updateStudy.
 * TODO think how this should work with "dxScript=false" feature toggle
 * @param initialStudies
 * @param dxScriptProvider
 */
export declare const createDxStudiesProvider: (initialStudies: TStudySettings[]) => DxStudiesProvider;
