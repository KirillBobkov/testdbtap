import { DEFAULT_MERGE_OPTIONS, merge } from '@devexperts/dxcharts-lite/dist/chart/utils/merge.utils';
import { mulberry32 } from './random';
export const defaultConfig = {
    quantity: 1000,
    startPrice: 50,
    startTimestamp: Date.now() - (Date.now() % 3600000),
    period: 3600000,
    candleSize: 1,
    candleDiversity: 4,
    highLowSize: 0.2,
    highLowDiversity: 2,
    volumeSize: 10000,
    volumeDiversity: 50000,
    avgTrendLength: {
        up: 10,
        down: 10,
        sw: 10,
    },
    randomSeed: 555,
};
export const generateCandle = (timestamp, open, type, config, random) => {
    let close;
    switch (type) {
        case 'bear':
            close = open - config.candleSize - config.candleDiversity * random();
            break;
        case 'bull':
            close = open + config.candleSize + config.candleDiversity * random();
            break;
        case 'doji':
            close = open;
            break;
    }
    const hi = Math.max(open, close) + config.highLowSize + random() * config.highLowDiversity;
    const lo = Math.min(open, close) - config.highLowSize - random() * config.highLowDiversity;
    const volume = config.volumeSize +
        (random() < 0.1 ? config.volumeDiversity : config.volumeDiversity / 10) +
        (random() * config.volumeDiversity) / 2;
    return {
        timestamp,
        volume,
        open,
        close,
        hi,
        lo,
    };
};
export function mergeCandleGeneratorConfig(config, defaultConf = defaultConfig) {
    merge(config, defaultConf, DEFAULT_MERGE_OPTIONS);
    // eslint-disable-next-line no-restricted-syntax
    return config;
}
/**
 * Generates mock candles data.
 *
 *   quantity - avg number of candles
 *   startY - avg candle Y to start generation with
 *   avgCandleSize - avg size of candle
 *   avgTrendLength:
 *     sw - avg length of SIDEWAYS trend
 *     down - avg length of DOWN trend
 *     up - avg length of UP trend
 *   withVolume - add random volumes or not
 *
 * @return Array<Candle>
 * @param _config
 */
export const generateCandles = (_config = {}) => {
    const config = mergeCandleGeneratorConfig(_config);
    const candles = [];
    let timestamp = config.startTimestamp;
    let startPrice = config.startPrice;
    const random = mulberry32(config.randomSeed);
    for (let i = 0; i < config.quantity; i++) {
        const r = random() * 10;
        if (r > 5) {
            const candle = generateCandle(timestamp, startPrice, 'bull', config, random);
            startPrice = candle.close;
            candles.push(candle);
        }
        else if (r > 1) {
            const candle = generateCandle(timestamp, startPrice, 'bear', config, random);
            startPrice = candle.close;
            candles.push(candle);
        }
        else {
            const candle = generateCandle(timestamp, startPrice, 'doji', config, random);
            startPrice = candle.close;
            candles.push(candle);
        }
        timestamp += config.period;
    }
    return candles;
};
