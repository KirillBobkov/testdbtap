import React from 'react';
import { HoveredNews } from '../../../view-models/news/news.view-model';
import { CKPopoverProps } from '../../../../chart-kit/Popover/Popover.lazy-component';
export interface NewsContainerProps {
    readonly news: HoveredNews;
}
export declare const NewsPopoverWrapper: React.NamedExoticComponent<NewsContainerProps>;
export type NewsPopoverProps = CKPopoverProps & {
    readonly news: HoveredNews;
};
export declare const NewsPopover: React.NamedExoticComponent<NewsPopoverProps>;
