import { Position } from '../../chart/view-models/user-data.view-model';
declare const popoverPositions: readonly ["top", "right", "left", "bottom"];
export type PopoverPosition = (typeof popoverPositions)[number];
declare const popoverAlignments: readonly ["start", "center", "end"];
export type PopoverAlign = (typeof popoverAlignments)[number];
export interface Bounds {
    top: number;
    left: number;
    width: number;
    height: number;
}
export interface PopoverSize {
    width: number;
    height: number;
}
export interface PopoverCoordinates {
    x: number;
    y: number;
}
export interface PopoverPlacementArgs {
    position: PopoverPosition;
    align: PopoverAlign;
    anchorPosition: Bounds;
    popoverSize: PopoverSize;
    parentContainer: Bounds;
}
export declare function calculatePopoverPlacement({ position, align, anchorPosition, popoverSize, parentContainer, }: PopoverPlacementArgs): PopoverCoordinates;
export declare function compareCoordinates(cs1: PopoverCoordinates, cs2: PopoverCoordinates): boolean;
export declare function mapPositionToCoordinates(position: Position): PopoverCoordinates;
export declare function limitCoordinatesToBounds(coords: PopoverCoordinates, bounds: Bounds, popoverSize: PopoverSize): PopoverCoordinates;
export {};
