export declare const eventsDictionary: {
    earnings: {
        type: string;
        basicEps: string;
        dilutedEps: string;
        periodEnding: string;
        date: string;
    };
    dividends: {
        type: string;
        gross: string;
        date: string;
    };
    splits: {
        type: string;
        date: string;
    };
    'conference-calls': {
        type: string;
        title: string;
        date: string;
    };
};
export type EventsDictionary = typeof eventsDictionary;
