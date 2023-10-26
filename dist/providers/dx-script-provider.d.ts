import { TickValues } from '@dx-private/dxchart5-modules/dist/studies/model/studies.model';
import { Candle } from '@devexperts/dxcharts-lite/dist/chart/model/candle.model';
import { StudyLineType, TStudyLine, TStudyParameter, TStudySettings } from '../chart/model/studies.model';
export interface TDxScript {
    id: string;
    name: string;
    code: string;
    locked: boolean;
}
export interface TDxScriptWithoutId extends Omit<TDxScript, 'id'> {
}
export interface TDxScriptWithoutCode extends Omit<TDxScript, 'code'> {
    code?: string;
}
export interface ScriptParameter {
    readonly id: string;
    readonly value: string;
}
export interface ScriptError {
    region: {
        sourceCodeId: string;
        bounds: {
            beginLine: number;
            beginChar: number;
            endLine: number;
            endChar: number;
        };
    };
    message: string;
}
export interface RunScriptRequest {
    script: string;
    parameters: Array<ScriptParameter>;
    candles: Array<Candle>;
}
export type RunScriptResult = SuccessfulRunResult | FailureRunResult;
export interface ScriptResult {
    readonly scriptId: string;
    readonly successful: boolean;
}
export interface FailureRunResult extends ScriptResult {
    errorMsg?: string;
    scriptErrors: ScriptError[];
}
export interface SuccessfulRunResult extends ScriptResult {
    ticks: TickValues[];
}
export interface CompileScriptRequest {
    script: string;
}
export interface ScriptCompiledParameter {
    id: string;
    value: string;
    paramType: string;
}
export declare const fromTStudyParam: (param: TStudyParameter) => ScriptCompiledParameter;
export type CompileScriptResult = SuccessCompileResponse | FailureCompileResponse;
export interface StudyLine {
    title?: string;
    studyLineType?: StudyLineType;
    thickness?: number;
    color?: string;
}
export declare const fromTStudyLine: (line: TStudyLine) => StudyLine;
export interface SuccessCompileResponse extends ScriptResult {
    params: ScriptCompiledParameter[];
    lines: StudyLine[];
}
export interface FailureCompileResponse extends ScriptResult {
    errorMsg?: string;
    scriptErrors: ScriptError[];
}
export declare const isSuccessCompile: (result: CompileScriptResult) => result is SuccessCompileResponse;
export interface ModuleKeywords {
    moduleName: string;
    keywords: Array<Keyword>;
}
export interface Keyword {
    keywordName: string;
    keywordType: string;
    description: string;
    funSignature: string;
}
export interface DxScriptProvider {
    getScriptList(): Array<TDxScriptWithoutCode>;
    fetchAllScripts(): Promise<Array<TDxScriptWithoutCode>>;
    getScript(id: string): Promise<TDxScript | undefined>;
    createScript(script: TDxScriptWithoutId): Promise<string>;
    updateScript(script: TDxScriptWithoutCode): Promise<void>;
    deleteScript(id: string): Promise<void>;
}
/**
 * Provider for dxScript backend.
 */
export interface DxScriptRunner {
    /**
     * Compiles the script and returns result of compilation or errors.
     * @param scriptId
     */
    compileScript(script: string): Promise<CompileScriptResult>;
    /**
     * Calculates the script result. Should be executed after compilation.
     * @param script
     * @param params
     * @param candles
     */
    runScript(script: string, params: Array<ScriptParameter>, candles: Array<Candle>): Promise<RunScriptResult>;
    keywords(): Promise<Array<ModuleKeywords>>;
    updateDxScriptParams(study: TStudySettings): Promise<void>;
}
