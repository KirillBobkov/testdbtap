import { StudySeriesConfig } from '@dx-private/dxchart5-modules/dist/studies/model/study-series';
import { StudiesCandle, TradingSessionData, com } from '@dx-private/dxstudies/dxstudies';
import { ChartModel } from '@devexperts/dxcharts-lite/dist/chart/components/chart/chart.model';
import { Candle } from '@devexperts/dxcharts-lite/dist/chart/model/candle.model';
import { TradingSession, TradingSessionsProvider } from '../sessions/trading-sessions-provider';
import { StudiesDataProvider } from './studies-data-provider';
type MapToUndefined<T> = {
    [K in keyof T]?: T[K];
};
type DxStudiesConstructor = <T extends MapToUndefined<ConstructorParameters<typeof com.devexperts.dxst.DxStudies>>>(...t: T) => com.devexperts.dxst.DxStudies;
export declare const createStudiesCalculator: Promise<DxStudiesConstructor>;
/**
 * Lazy Loading for dxstudies in chart react.
 * If dxstudies packages wasn't provided - fallback to mock solution.
 * @doc-tags tricky,studies
 **/
export declare const studiesLoaded: Promise<void>;
export declare class DxStudiesDataProvider implements StudiesDataProvider {
    private chartModel;
    private tradingSessionsProvider;
    private tradingHoursProvider;
    private studiesCalculator;
    private fullStudiesCalculator;
    private dxStudyConfigs;
    private dxStudyCache;
    private dxStudyDataCache;
    private firstCandleTimeStamp;
    private lastCandleIdx;
    private seriesLengthWithFake;
    constructor(chartModel: ChartModel, tradingSessionsProvider: TradingSessionsProvider, tradingHoursProvider?: () => string | undefined);
    /**
     * This promise indicates studies calculator init status.
     * Used to synchronize studies calculations, which should happend only after calculators init.
     */
    resolveCalculatorPromise: any;
    calculatorResolved: boolean;
    calculatorInitStatus: Promise<unknown>;
    private reinitCalculatorPromise;
    initStudiesCalculators(): Promise<void>;
    /**
     * Tricky logic which is intended to optimize studies calculations in case we have only last candle update
     * (or a new candle came)
     * @doc-tags tricky
     */
    updateCalculators(): void;
    private calculateOnlyLastValues;
    private addFakeCandleIfNeeded;
    private calculateWithDxStudies;
    calculateStudy(config: StudySeriesConfig): Promise<Array<Array<number>>>;
    private applySessions;
}
export declare const toStudiesSession: (session: TradingSession) => TradingSessionData;
export declare const toStudiesCandle: (candle: Candle) => StudiesCandle;
export declare const dxStudiesMock: com.devexperts.dxst.DxStudies;
export {};
