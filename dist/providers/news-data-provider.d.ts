import { AtLeastOne } from '@devexperts/dxcharts-lite/dist/chart/utils/object.utils';
interface RequestNewsOptions {
    /**
     * You can specify fromTime to reduce amount of news loaded to the chart
     */
    readonly fromTime: number;
}
export interface NewsDataProvider {
    requestNews(symbol: string, options?: AtLeastOne<RequestNewsOptions>): Promise<NewsData>;
}
export interface News {
    readonly title: string;
    readonly timestamp: number;
    readonly sourceLink: string;
}
export interface NewsData {
    readonly news: News[];
}
export {};
