import { option } from 'fp-ts';
export const priceType = ['last', 'mark', 'bid', 'ask'];
export function parsePriceTypeFromStringSafe(str) {
    switch (str) {
        case 'last':
            return option.some(str);
        case 'mark':
            return option.some(str);
        case 'bid':
            return option.some(str);
        case 'ask':
            return option.some(str);
        default:
            return option.none;
    }
}
export const candleAlignment = ['session_start', 'midnight'];
export function parseCandleAlignmentFromStringSafe(str) {
    switch (str) {
        case 'session_start':
            return option.some(str);
        case 'midnight':
            return option.some(str);
        default:
            return option.none;
    }
}
