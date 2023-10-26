import * as React from 'react';
import { IconWrapper } from '../../../chart-kit/IconWrapper/IconWrapper.component';
export const getIconByLocalizationName = (name, iconsConfig) => {
    switch (name) {
        case 'downloadImage':
            return React.createElement(IconWrapper, null, iconsConfig.toolbar.export);
        case 'copyImage':
            return React.createElement(IconWrapper, null, iconsConfig.snapshot.image);
        case 'copyLink':
            return React.createElement(IconWrapper, null, iconsConfig.snapshot.link);
        case 'tweet':
            return React.createElement(IconWrapper, null, iconsConfig.snapshot.twitter);
        case 'telegram':
            return React.createElement(IconWrapper, null, iconsConfig.snapshot.telegram);
        default:
            return React.createElement(IconWrapper, null, iconsConfig.chartTypes.candle);
    }
};
