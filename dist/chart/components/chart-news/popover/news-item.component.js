import React, { memo } from 'react';
import { NewsItemLinkStyled } from './news-item-link.styled';
export const NewsItem = memo(props => {
    const { title, url } = props;
    return (React.createElement(NewsItemLinkStyled, { href: url, target: '_blank' }, title));
});
