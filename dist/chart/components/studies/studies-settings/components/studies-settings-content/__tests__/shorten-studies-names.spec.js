import { shortenStudiesNames } from '../shorten-studies-names';
describe('shortenStudiesNames', () => {
    it('should return BB (capitalize the first letter of each word)', () => {
        const result = shortenStudiesNames('Bollinger Bands');
        expect(result).toBe('BB');
    });
    it('should return ABC(2) (capitalize the first letter of each word but remain the copy symbols)', () => {
        const result = shortenStudiesNames('aaaa bbb cc (2)');
        expect(result).toBe('ABC(2)');
    });
    it('should return A/D (one word, slash should not be removed)', () => {
        const result = shortenStudiesNames('Acceleration/Deceleration');
        expect(result).toBe('A/D');
    });
    it('should return A.M (part without dot = capitalized first letter)', () => {
        const result = shortenStudiesNames('A. MACD');
        expect(result).toBe('A.M');
    });
    it('should return full title (one word, 8 symbols or less)', () => {
        const result = shortenStudiesNames('Ichimoku');
        expect(result).toBe('Ichimoku');
    });
    it('should return first letter capitalized (one word, more than 9 symbols)', () => {
        const result = shortenStudiesNames('Acceleration');
        expect(result).toBe('A');
    });
});
