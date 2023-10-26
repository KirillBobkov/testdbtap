import React, { memo, useEffect, useRef, useState } from 'react';
import { NewsItem } from './news-item.component';
import { NewsListStyled, NewsPopoverDivider, NewsPopoverStyled } from './news-popover.styled';
import { interleave } from '@devexperts/dxcharts-lite/dist/chart/utils/array.utils';
import { Scrollable } from '../../../../chart-kit/Scrollable/Scrollable';
import { HoveredElementPopoverAnchor } from '../../../../chart-kit/Popover/Popover.styled';
export const NewsPopoverWrapper = memo(props => {
    const { news } = props;
    const anchorRef = useRef(null);
    //#region HACK
    /**
     * a hack to make popover rendered twice
     * if not, popover wouldn't rendered at the correct position
     *
     * for alternative approach please see event-popover.component.tsx
     * it uses fp-ts and double pipe to render anchor first and only then popover
     */
    const [opened, setOpened] = useState(false);
    useEffect(() => setOpened(true), []);
    //#endregion
    return (React.createElement(React.Fragment, null,
        React.createElement(HoveredElementPopoverAnchor, { ref: anchorRef, style: { left: news.x, top: news.y } }),
        React.createElement(NewsPopover, { news: news, opened: opened, align: "center", anchorRef: anchorRef })));
});
export const NewsPopover = memo(props => {
    const { news, ...rest } = props;
    return (React.createElement(NewsPopoverStyled, { ...rest },
        React.createElement(Scrollable, null,
            React.createElement(NewsListStyled, null, interleave(news.news, 'divider').map((n, idx) => typeof n === 'string' ? (React.createElement(NewsPopoverDivider, { key: `divider_${idx}` })) : (React.createElement(NewsItem, { url: n.sourceLink, title: n.title, key: `news_${idx}` })))))));
});
