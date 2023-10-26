import { context } from '../context/context2';
/**
 * This context aggregates external configs.
 * Use it to reduce the amount of context.key's injections.
 * @arch-tangle-ignore
 */
export const Configs = context.combine(context.key()('chartReactConfig'), context.key()('drawingsConfig'), (chartReactConfig, drawingsConfig) => ({
    chartReactConfig,
    drawingsConfig,
}));
