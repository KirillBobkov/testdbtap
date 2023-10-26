import { Property } from '../../utils/property.utils';
import { UserData, UserDataProvider } from '../../providers/user-data-provider';
import { Sink } from '../../context/sink2';
type CustomColors = UserData['customColors'];
type CustomPeriods = UserData['customPeriods'];
type FavoriteDrawings = UserData['favoriteDrawings'];
type RecentDrawings = UserData['recentDrawings'];
export interface UserDataViewModel {
    readonly userData: Property<UserData>;
    readonly updateCustomColors: (colors: CustomColors) => void;
    readonly updateCustomPeriods: (periods: CustomPeriods) => void;
    readonly updateFavoriteDrawings: (drawings: FavoriteDrawings) => void;
    readonly updateRecentDrawings: (drawings: RecentDrawings) => void;
    readonly updateSidebarMode: (isExpanded: boolean) => void;
    readonly updateTimeframePresetsList: (timeframePresets: Array<string>) => void;
    readonly updateWidgetPosition: (widget: Widget, position: Position) => void;
}
export type Widget = 'chartLayersPopover' | 'drawingsToolbar';
export interface Position {
    top: number;
    left: number;
}
export interface Size {
    height: number;
    width: number;
}
export declare const INITIAL_USER_DATA: UserData;
export declare const createUserDataViewModel: import("../../context/context2").Context<Record<"userDataProvider", UserDataProvider> & Record<"userDataLoaded", UserData>, Sink<UserDataViewModel>>;
export {};
