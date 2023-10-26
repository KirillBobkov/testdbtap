import { array } from 'fp-ts';
import { pipe } from 'fp-ts/function';
import { createElement, useContext } from 'react';
import { context } from '../../context/context2';
import { namedMemo } from '../../utils/named-memo';
import { ChartSnapshotDropdown, } from '../components/chart-snapshot/chart-snapshot-dropdown.component';
import { createShareTelegramLink, createShareTwitterLink, } from '../components/chart-snapshot/chart-snapshot-dropdown.model';
import { openLinkInNewTab } from '../view-models/snapshot/chart-snapshot.view-model';
import { IconsOverridingContext } from '../../utils/icons-overriding-context';
import { useUIOverride } from '../ui-overrides';
import { DEFAULT_SNAPSHOT_MENU_ITEMS } from '../ui-overrides/snapshot-menu-items';
export const ChartSnapshotDropdownContainer = context.combine(context.key()('snapshotSharingVM'), context.key()('localization'), context.key()('chartReactApiViewModel'), (snapshotVM, localization) => namedMemo('ChartSnapshotDropdownContainer', () => {
    const OverridenSnapshotMenuItems = useUIOverride(['SnapshotMenuItems']) ?? DEFAULT_SNAPSHOT_MENU_ITEMS;
    const iconsConfig = useContext(IconsOverridingContext);
    const defaultSnapshotOptions = {
        downloadImage: {
            key: 'downloadImage',
            label: localization.chartSnapshot.downloadImage,
            icon: iconsConfig.toolbar.export,
            onSelect: snapshotVM.downloadSnapshot,
        },
        copyImage: {
            key: 'copyImage',
            label: localization.chartSnapshot.copyImage,
            icon: iconsConfig.snapshot.image,
            onSelect: snapshotVM.copySnapshot,
        },
        copyLink: {
            key: 'copyLink',
            label: localization.chartSnapshot.copyLink,
            icon: iconsConfig.snapshot.link,
            onSelect: snapshotVM.copySnapshotLink,
        },
        tweet: {
            key: 'tweet',
            label: localization.chartSnapshot.tweet,
            icon: iconsConfig.snapshot.twitter,
            onSelect: () => snapshotVM
                .shareToExternalResource({ target: 'twitter' })
                .then(url => createShareTwitterLink(localization.chartSnapshot.shareTelegramText, url))
                .then(openLinkInNewTab),
        },
        telegram: {
            key: 'telegram',
            label: localization.chartSnapshot.telegram,
            icon: iconsConfig.snapshot.telegram,
            onSelect: () => snapshotVM
                .shareToExternalResource({ target: 'telegram' })
                .then(url => createShareTelegramLink(localization.chartSnapshot.shareTelegramText, url))
                .then(openLinkInNewTab),
        },
    };
    const items = pipe(OverridenSnapshotMenuItems, array.map(renderItem => typeof renderItem === 'object' ? renderItem : defaultSnapshotOptions[renderItem]));
    return createElement(ChartSnapshotDropdown, {
        localization,
        items,
    });
}));
