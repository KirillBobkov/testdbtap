import { Event as ProviderEvent } from '../../providers/events-data-provider';
export interface EventsGeneratorConfig {
    readonly quantity: number;
    readonly startTimestamp: number;
    readonly period: number;
}
export declare const defaultConfig: EventsGeneratorConfig;
/**
 * Generates mock events data.
 *
 * @param config
 *   quantity - avg number of events
 *
 * @return Array<ProviderEvent>
 */
export declare const generateEvents: (config?: EventsGeneratorConfig) => ProviderEvent[];
