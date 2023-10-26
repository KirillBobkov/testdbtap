import { Option } from 'fp-ts/Option';
export interface Suggest {
    symbol: string;
    description?: string;
    sortIndex: number;
    type: string;
    priceIncrements: number[];
    tradingHours?: string;
    tradable?: boolean;
}
export declare const getSuggest: (symbol: string) => (suggests: Suggest[]) => Option<Suggest>;
export declare const nextSuggest: (selectedId: Option<string>) => (suggests: Suggest[]) => Option<Suggest>;
export declare const prevSuggest: (selectedId: Option<string>) => (suggests: Suggest[]) => Option<Suggest>;
