import { ChartConfiguratorViewModel } from '../chart-configurator.view-model';
import { ChartWithModules } from '../../components/canvas-chart-renderer/chart-with-modules';
import { Property } from '../../../utils/property.utils';
import { Pixel, Price } from '@devexperts/dxcharts-lite/dist/chart/model/scaling/viewport.model';
import { Sink } from '../../../utils/sink';
import { Point } from '@devexperts/dxcharts-lite/dist/chart/inputlisteners/canvas-input-listener.component';
export interface TradingCoreViewModel {
    readonly marketPrice: Property<number>;
    readonly marketPriceY: Property<number>;
    readonly showTrading: Property<boolean>;
    readonly yToPrice: (y: Pixel) => Price;
    readonly priceToY: (price: Price) => Pixel;
    readonly boundTradingPosition: Property<Point>;
    readonly clampY: (y: number) => number;
}
export declare const createTradingCoreViewModel: import("../../../context/context2").Context<Record<"chartConfiguratorViewModel", ChartConfiguratorViewModel> & Record<"chart", ChartWithModules>, Sink<TradingCoreViewModel>>;
export declare function clampMap({ value, min, max, mapTo, mapFrom, }: {
    value: number;
    min?: number;
    max?: number;
    mapTo: (a: number) => number;
    mapFrom: (a: number) => number;
}): number;
