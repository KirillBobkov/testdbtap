import React, { ReactNode } from 'react';
import { ChartWithModules } from '../canvas-chart-renderer/chart-with-modules';
declare const REDISPATCHED_EVENTS_LIST: readonly ["onClick", "onDoubleClick", "onWheel", "onMouseMove", "onMouseDown", "onMouseUp", "onMouseOver", "onSelect", "onReset", "onDrag", "onDragStart", "onDragEnd", "onBlur", "onTouchMove", "onTouchCancel", "onTouchEnd", "onTouchStart"];
type RedispatchedEventsType = typeof REDISPATCHED_EVENTS_LIST[number];
export interface RedispatchProps {
    readonly chart: ChartWithModules;
    readonly children: ReactNode;
    readonly redispatchRef?: React.RefObject<HTMLDivElement>;
    readonly blacklistOfEvents?: Array<RedispatchedEventsType>;
}
export declare const RedispatchStyledContainer: import("styled-components").StyledComponent<"div", any, {}, never>;
/**
 * This component redispatches all events from children to chart instance container
 */
export declare const RedispatchToChart: React.NamedExoticComponent<RedispatchProps>;
export {};
