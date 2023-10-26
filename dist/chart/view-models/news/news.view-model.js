import { context } from '../../../context/context2';
import { newSink } from '../../../context/sink2';
import { combineLatest, merge, of, zip } from 'rxjs';
import { catchError, distinctUntilChanged, filter, shareReplay, switchMap, tap } from 'rxjs/operators';
import { createPropertyAdapter } from '../../../utils/property.utils';
import { pipe } from 'fp-ts/function';
import { observable } from 'fp-ts-rxjs';
import { filterOption } from '../../../utils/monad-functions';
export const createNewsViewModel = context.combine(context.key()('newsDataProvider'), context.key()('chart'), context.key()('chartConfiguratorViewModel'), context.key()('chartDataViewModel'), (newsDataProvider, chart, chartConfiguratorVM, chartDataVM) => {
    const [setCurrentNews, currentNews] = createPropertyAdapter({ news: [] });
    const newsVisible = pipe(chartConfiguratorVM.state, observable.map(s => s.settings.chartCore.components.news.visible), distinctUntilChanged(), tap(visible => visible));
    const newsData = combineLatest([
        chartDataVM.instrument.pipe(filterOption()),
        newsVisible,
        chart.chartModel.candlesSetSubject,
    ]).pipe(filter(([_, visible]) => visible), switchMap(([instrument]) => {
        return newsDataProvider.requestNews(instrument.symbol);
    }), catchError(() => of({ news: [] })), shareReplay({ bufferSize: 1, refCount: true }));
    const hoveredNews = chart.newsComponent.newsHoveredSubject.pipe(observable.map(hoveredNews => hoveredNews === null
        ? null
        : {
            ...hoveredNews,
            news: currentNews
                .getValue()
                .news.filter(n => hoveredNews.news.find(hn => hn.id === n.title)),
        }));
    const showNewsEffect = pipe(chartConfiguratorVM.state, observable.map(s => s.settings.chartCore.components.news), distinctUntilChanged(), tap(newsConfig => {
        chart.newsComponent.setVisible(newsConfig.visible);
    }));
    const setNewsEffect = pipe(zip(chart.chartModel.candlesSetSubject, newsData), observable.map(([, nData]) => nData), tap(data => {
        setCurrentNews(data);
        const chartCoreNews = mapNewsToChartCore(data.news);
        chart.newsComponent.setNews(chartCoreNews);
    }));
    const effects = merge(setNewsEffect, showNewsEffect);
    return newSink({
        news: currentNews,
        hoveredNews,
    }, effects);
});
const mapNewsToChartCore = (news) => news.map(n => ({
    timestamp: n.timestamp,
    id: n.title,
}));
