import React from 'react';
import { RCMenuProps } from '../../../chart-kit/Popover/popover-menu-generic';
import { OrderData } from '../../model/trading/order.model';
import { ChartSettings } from '../../model/chart.model';
import { Lens } from 'monocle-ts';
import { ChartReactConfig } from '../../../config/chart-react-config';
import { ThemeType } from '../../model/theme.model';
import { DrawingType } from '../../model/drawing.model';
import { MainSeriesTradingData } from '../right-click-menu/right-click-menu-trading-btns';
export interface BackgroundMenuProps extends RCMenuProps {
    readonly mainSeriesTradingData: MainSeriesTradingData;
    readonly settings: ChartSettings;
    readonly onCreateOrder: (orderData: OrderData) => void;
    readonly onSettingsChange: (lens: Lens<ChartSettings, any>, value: any) => void;
    readonly chartReactConfig: ChartReactConfig;
    readonly sessionBreaksDisabled: boolean;
    readonly activeTheme: ThemeType;
    readonly onChangeTheme: (type: ThemeType) => void;
    readonly recentDrawings: DrawingType[];
    readonly onRecentDrawingSelect: (type: DrawingType) => void;
    readonly onClearIndicators: () => void;
    readonly onOpenSettings: () => void;
    readonly onResetChart: () => void;
    readonly drawingsVisible: boolean;
    readonly onChangeDrawingsVisibility: () => void;
    readonly onClearDrawings: () => void;
}
export declare const BackgroundMenu: React.NamedExoticComponent<BackgroundMenuProps>;
