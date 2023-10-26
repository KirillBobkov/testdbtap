import { DrawingType } from '../chart/model/drawing.model';
import { Position, Widget } from '../chart/view-models/user-data.view-model';
/**
 * !!!DEV_NOTES!!!
 * Properties in this structure should NEVER change
 * to escape migration problems.
 * if you need to alter the existing property somehow
 * you better create a new property (for ex. customPeriods2)
 * with desired data structure
 */
export interface UserData {
    customPeriods: string[];
    customColors: string[];
    favoriteDrawings: DrawingType[];
    recentDrawings: DrawingType[];
    isSidebarExpanded: boolean;
    timeframePresets: Array<string>;
    positions: Record<Widget, Position>;
}
/**
 * Provider to store custom user data
 * It's been applied across all charts in the multiChart
 */
export interface UserDataProvider {
    /**
     * Returns custom user data.
     * If no data available, Promise.reject() is also valid return value
     * @returns Promise<UserData | null>
     */
    getUserData(): Promise<UserData | null>;
    /**
     * Updates custom user data
     * @param userData
     * @returns Promise<void>
     */
    setUserData(userData: UserData): Promise<void>;
}
