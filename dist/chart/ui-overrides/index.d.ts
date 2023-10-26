import React, { ComponentType } from 'react';
import { CKColorPickerProps } from '../../chart-kit/ColorPicker/ColorPicker.component';
import { ChartToolbarProps } from '../components/chart-toolbar/chart-toolbar.component';
import { ChartReactAPI } from '../view-models/api/chart-react-api.view-model';
import { InstrumentSuggestComponentProps } from '../containers/instrument-selector/instrument-selector.model';
import { ToolbarButtonDeclaration } from './toolbar';
import { SnapshotMenuItemDeclaration } from './snapshot-menu-items';
import { TabDeclaration } from './settings';
export interface ChartReactAPIProps {
    readonly chartReactAPI: ChartReactAPI;
    readonly chartId: string;
}
export interface UIOverrides {
    rightClickMenus: {
        yAxisMenu: React.ComponentType<ChartReactAPIProps>;
        backgroundMenu: React.ComponentType<ChartReactAPIProps>;
        studiesMenu: React.ComponentType<ChartReactAPIProps>;
        drawingsMenu: React.ComponentType<ChartReactAPIProps>;
        orderMenu: React.ComponentType<ChartReactAPIProps>;
        positionMenu: React.FC<ChartReactAPIProps>;
        legendMenu: React.ComponentType<ChartReactAPIProps>;
        dataMenu: React.ComponentType<ChartReactAPIProps>;
    };
    ChartSettingsTabs: TabDeclaration[];
    SnapshotMenuItems: SnapshotMenuItemDeclaration[];
    ColorPickerComponent: React.ComponentType<CKColorPickerProps>;
    Toolbar: {
        ToolbarButtons: Array<ToolbarButtonDeclaration>;
        ToolbarContainer: Element | null;
        ToolbarComponent: ComponentType<ChartToolbarProps>;
    };
    InstrumentSuggest: React.ComponentType<InstrumentSuggestComponentProps>;
    Legend: {
        Header: React.ComponentType;
    };
}
export declare function useUIOverride<T1 extends keyof UIOverrides, T2 extends keyof UIOverrides[T1]>(path: [T1, T2]): UIOverrides[T1][T2] | undefined;
export declare function useUIOverride<T extends keyof UIOverrides>(path: [T]): UIOverrides[T] | undefined;
export declare function useUIOverrideComponent<T1 extends keyof UIOverrides, T2 extends keyof UIOverrides[T1]>(path: [T1, T2]): JSX.Element | undefined;
export declare function useUIOverrideComponent<T extends keyof UIOverrides>(path: [T]): JSX.Element | undefined;
export declare const UIOverridesContext: React.Context<Partial<UIOverrides>>;
