import { SuccessCompileResponse, TDxScriptWithoutCode } from '../../providers/dx-script-provider';
import { ColorsPool } from '../../utils/colorspool/ColorsPool';
import { TStudyLine, TStudyParameter, TStudySettings } from './studies.model';
export declare const mapScript2StudySettings: (script: TDxScriptWithoutCode, study?: TStudySettings) => TStudySettings;
export declare const mapScriptParams: (study: TStudySettings, response: SuccessCompileResponse) => TStudyParameter[];
export declare const mapScriptLines: (study: TStudySettings, response: SuccessCompileResponse, colorsPool: ColorsPool) => TStudyLine[];
