interface TProperty<K> {
    path: [K];
    filterByCapitalLetters?: boolean;
    transformValue?: (value: string) => string;
}
export declare function filterListByProperties<T extends object, K extends keyof T>(list: T[], filter: string, properties: TProperty<K>[]): T[];
export {};
