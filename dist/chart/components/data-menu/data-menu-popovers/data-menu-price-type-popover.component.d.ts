import React from 'react';
import { PriceType } from '../../../../providers/chart-data-provider';
export interface DataMenuPriceTypePopoverProps {
    readonly isOpened: boolean;
    readonly onClose: () => void;
    readonly value: PriceType;
    readonly priceTypes: PriceType[];
    readonly onChangePriceType: (value: PriceType) => void;
    readonly anchorRef: ReactRef;
}
export declare const DataMenuPriceTypePopover: React.NamedExoticComponent<DataMenuPriceTypePopoverProps>;
