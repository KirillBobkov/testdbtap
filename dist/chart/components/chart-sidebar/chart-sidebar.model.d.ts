export interface ButtonsState {
    magnetOn: boolean;
    drawingModeOn: boolean;
    drawingsVisible: boolean;
    drawingSyncEnabled: boolean;
}
export declare const sidebarFooterButtonTypes: readonly ["MAGNET", "DRAWING_MODE", "SYNC_DRAWINGS", "HIDE_DRAWINGS", "DELETE_DRAWINGS"];
export type SidebarFooterButtonType = (typeof sidebarFooterButtonTypes)[number];
export declare const SidebarFooterButtonTypes: {
    readonly MAGNET: "MAGNET";
    readonly DRAWING_MODE: "DRAWING_MODE";
    readonly HIDE_DRAWINGS: "HIDE_DRAWINGS";
    readonly DELETE_DRAWINGS: "DELETE_DRAWINGS";
    readonly SYNC_DRAWINGS: "SYNC_DRAWINGS";
};
