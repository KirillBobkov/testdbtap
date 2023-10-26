import { alignSessionsToCandles } from '../chart-sessions.model';
describe('alignHighlightsToCandles', () => {
    it('should align PRE_MARKET to 3hours candles', () => {
        const highlights = [
            {
                from: 1624953600000,
                to: 1624973400000,
                type: 'PRE_MARKET',
            },
        ];
        const candles = [
            {
                close: 134.07,
                hi: 134.1,
                idx: 1174,
                lo: 133.74,
                open: 133.78,
                timestamp: 1624946400000,
                volume: 1779,
            },
        ];
        const alignedHighlights = alignSessionsToCandles(highlights, candles, 60 * 60 * 3 * 1000);
        expect(alignedHighlights[0].from).toBe(candles[0].timestamp);
    });
});
