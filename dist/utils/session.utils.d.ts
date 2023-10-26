import { HighlightType } from '@devexperts/dxcharts-lite/dist/chart/components/highlights/highlights.model';
import { Candle } from '@devexperts/dxcharts-lite/dist/chart/model/candle.model';
import { TradingSession, TradingSessionsProvider } from '../providers/sessions/trading-sessions-provider';
export declare const generateSessions: (tradingSessionsProvider: TradingSessionsProvider, options: {
    filter: HighlightType[];
    tradingHours?: string;
    candles: Candle[];
    symbol: string;
    from?: number;
    to?: number;
}) => Promise<Record<HighlightType, TradingSession[]>>;
/**
 * Generates sessions limited to @param to and filters them. In other words - if @param to is in the middle of the session,
 * the session will be limited to this parameter
 */
export declare const generateSessionsStrict: (provider: TradingSessionsProvider, from: number, to: number, options: {
    tradingHours: string;
    candles: Candle[];
    period: number;
    symbol: string;
    filter: string[];
}) => Promise<TradingSession[]>;
