import { TradingSessionsProvider } from './trading-sessions-provider';
export interface DxFeedScheduleOptions {
    readonly feedURL: string;
}
export declare const DEFAULT_OPTIONS: DxFeedScheduleOptions;
export declare const createDefaultTradingSessionsProvider: (initOptions?: DxFeedScheduleOptions) => TradingSessionsProvider;
