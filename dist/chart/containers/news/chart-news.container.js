import { context } from '../../../context/context2';
import { createElement, memo } from 'react';
import { NewsPopoverWrapper } from '../../components/chart-news/popover/news-popover.component';
import { useObservable } from '../../../utils/react.utils';
export const ChartNewsContainer = context.combine(context.key()('newsViewModel'), vm => memo(() => {
    const news = useObservable(vm.hoveredNews, null);
    return news
        ? createElement(NewsPopoverWrapper, {
            news,
        })
        : null;
}));
