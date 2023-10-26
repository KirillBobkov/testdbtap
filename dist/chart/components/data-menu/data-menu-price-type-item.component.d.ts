import React from 'react';
import { PriceType } from '../../../providers/chart-data-provider';
export interface DataMenuPriceTypeItemProps {
    readonly value: PriceType;
    readonly priceTypes: PriceType[];
    readonly onChangeType: (type: PriceType) => void;
    readonly onPopoverClose: () => void;
}
export declare const DataMenuPriceTypeItem: React.NamedExoticComponent<DataMenuPriceTypeItemProps>;
