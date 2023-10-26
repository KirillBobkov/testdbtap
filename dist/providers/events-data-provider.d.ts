export interface EventsData {
    events: Event[];
}
export interface EarningsEvent {
    kind: 'earnings';
    basic: number;
    diluted: number;
    timestamp: number;
    periodEnding: number;
}
export interface DividendsEvent {
    kind: 'dividends';
    gross: string;
    timestamp: number;
}
export interface SplitsEvent {
    kind: 'splits';
    splitFrom: number;
    splitTo: number;
    timestamp: number;
}
export interface ConferenceCallEvent {
    kind: 'conference-calls';
    timestamp: number;
    referencePeriod: string;
    eventType: string;
}
export type Event = EarningsEvent | DividendsEvent | SplitsEvent | ConferenceCallEvent;
export interface EventsDataProvider {
    /**
     * Returns Promise concerning selected symbol.
     */
    requestEventsData(symbol: string): Promise<EventsData>;
}
