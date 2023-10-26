import { News, NewsData, NewsDataProvider } from '../../../providers/news-data-provider';
import { Sink } from '../../../context/sink2';
import { Observable } from 'rxjs';
import { ChartWithModules } from '../../components/canvas-chart-renderer/chart-with-modules';
import { ChartConfiguratorViewModel } from '../chart-configurator.view-model';
import { ChartDataViewModel } from '../data/chart-data.view-model';
export interface HoveredNews {
    readonly news: News[];
    readonly x: number;
    readonly y: number;
}
export interface NewsViewModel {
    readonly news: Observable<NewsData>;
    readonly hoveredNews: Observable<HoveredNews | null>;
}
export declare const createNewsViewModel: import("../../../context/context2").Context<Record<"newsDataProvider", NewsDataProvider> & Record<"chart", ChartWithModules> & Record<"chartConfiguratorViewModel", ChartConfiguratorViewModel> & Record<"chartDataViewModel", ChartDataViewModel>, Sink<NewsViewModel>>;
