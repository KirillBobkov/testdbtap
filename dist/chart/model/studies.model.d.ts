import { Eq } from 'fp-ts/Eq';
import { Option } from 'fp-ts/Option';
export type StudyParameterType = 'INTEGER_RANGE' | 'DOUBLE_RANGE' | 'AGGREGATION' | 'AVERAGE' | 'PRICE_FIELD' | 'BOOLEAN' | 'STRING' | 'UNDEFINED';
export type StudyParamType = 'INTEGER_RANGE' | 'DOUBLE_RANGE' | 'PRICE_FIELD' | 'STRING' | 'AGGREGATION' | 'BOOLEAN' | 'AVERAGE' | 'UNDEFINED';
export type StudyLineType = 'POINTS' | 'LINEAR' | 'HISTOGRAM' | 'TREND_HISTOGRAM' | 'DIFFERENCE' | 'TEXT' | 'ABOVE_CANDLE_TEXT' | 'BELOW_CANDLE_TEXT' | 'ABOVE_CANDLE_TRIANGLE' | 'TRIANGLE' | 'COLOR_CANDLE' | 'RECTANGULAR';
export type StudyParamAggregationType = 'DEFAULT' | 'DAY' | 'WEEK' | 'MONTH';
export type StudyParamAverageType = 'SIMPLE' | 'WILDERS' | 'WEIGHTED' | 'EXPONENTIAL';
export type StudyParamPriceType = 'OPEN' | 'HIGH' | 'LOW' | 'CLOSE' | 'MEDIAN' | 'TYPICAL' | 'OHLC_AVERAGE' | 'VOLUME';
export type StudyParamSelectableType = StudyParamAggregationType | StudyParamAverageType | StudyParamPriceType;
export interface TRawStudySettingsValidation {
    min?: number | null;
    max?: number | null;
    precision?: number | null;
}
export interface TStudySettingsValidation {
    min: Option<number>;
    max: Option<number>;
    precision: Option<number>;
}
export interface TRawStudyParameter {
    id: string;
    studyParamType: StudyParameterType;
    value?: StudyParamSelectableType | string | number | boolean | null;
    validationTO?: TRawStudySettingsValidation | null;
    visible?: boolean | null;
}
export interface TStudyParameter {
    id: string;
    studyParamType: StudyParameterType;
    value: Option<StudyParamSelectableType | string | number | boolean>;
    validation: Option<TStudySettingsValidation>;
    visible: Option<boolean>;
}
export interface TRawStudyLine {
    title: string;
    studyLineType: StudyLineType;
    thickness?: number;
    colors?: string[];
    visible?: boolean;
    labelVisible?: boolean;
    offset?: number;
    symbolMapping?: string;
}
export interface TStudyLine {
    title: Option<string>;
    studyLineType: Option<StudyLineType>;
    thickness: Option<number>;
    colors: Option<Array<string>>;
    visible: Option<boolean>;
}
export type IndicatorType = 'dxStudy' | 'dxScript';
export interface TRawStudySettings {
    id: string;
    uuid?: string;
    title: string;
    description?: string;
    link?: string;
    type?: IndicatorType;
    parameters: TRawStudyParameter[];
    lines: TRawStudyLine[];
    overlaying: boolean;
    categories: string;
    calculateFutureData?: boolean;
}
export interface TStudySettings {
    id: string;
    uuid: string;
    title: string;
    description?: string;
    link?: string;
    type: IndicatorType;
    parameters: Array<TStudyParameter>;
    lines: Array<TStudyLine>;
    calculateFutureData: boolean;
    overlaying: boolean;
    categories: string;
    locked?: boolean;
}
export declare function fromRawStudiesSettings(item: TRawStudySettings): TStudySettings;
export declare const toRawStudiesSettings: (studiesList: TRawStudySettings[]) => (item: TStudySettings) => TRawStudySettings;
export declare const eqStudyList: Eq<TStudySettings[]>;
export declare const sortStudies: <A extends TStudySettings>(as: A[]) => A[];
