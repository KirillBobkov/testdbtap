export type SessionType = 'NO_TRADING' | 'PRE_MARKET' | 'REGULAR' | 'AFTER_MARKET';
export interface TradingSession {
    readonly from: number;
    readonly to: number;
    readonly type: SessionType;
}
export interface GenerateSessionOptions {
    /**
     * Trading hours description.
     * @example NewYorkUS(rt=0300;0=p04000930r09301600a16002000)
     */
    tradingHours?: string;
    /**
     * Trading instrument symbol
     */
    symbol: string;
}
export interface TradingSessionsProvider {
    /**
     * Generates trading sessions
     * @param from timestamp
     * @param to timestamp
     * @param options see @interface GenerateSessionOptions
     */
    generateSessions(from: number, to: number, options: GenerateSessionOptions): Promise<TradingSession[]>;
    /**
     * Returns timezone for specified symbol and trading hours
     */
    getTimeZone(options: GenerateSessionOptions): Promise<string>;
}
