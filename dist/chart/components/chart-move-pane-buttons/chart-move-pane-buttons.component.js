import { option } from 'fp-ts';
import React, { memo, useCallback, useContext } from 'react';
import { IconsOverridingContext } from '../../../utils/icons-overriding-context';
import { ChartMovePaneButtonStyled, ChartMovePaneContainerStyled } from './chart-move-pane-buttons.component.styled';
import { CHART_UUID } from '@devexperts/dxcharts-lite/dist/chart/canvas/canvas-bounds-container';
const MOVE_BUTTON_TRADING_OE_OFFSET = 25;
export const ChartMovePaneButtons = memo(props => {
    const { panesData, hoveredPane, tradingOEEnabled, movePaneUp, movePaneDown } = props;
    const right = panesData.right;
    const hoveredPaneId = option.toUndefined(hoveredPane);
    const iconsConfig = useContext(IconsOverridingContext);
    const movePaneUpHandler = useCallback(() => hoveredPaneId && movePaneUp(hoveredPaneId), [movePaneUp, hoveredPaneId]);
    const movePaneDownHandler = useCallback(() => hoveredPaneId && movePaneDown(hoveredPaneId), [movePaneDown, hoveredPaneId]);
    const addTradingOEOffset = useCallback((paneId) => (tradingOEEnabled && paneId === CHART_UUID ? MOVE_BUTTON_TRADING_OE_OFFSET : 0), [tradingOEEnabled]);
    // Don't display buttons if only one pane
    return panesData.panes.length > 1 ? (React.createElement(React.Fragment, null, panesData.panes.map(pane => (React.createElement(ChartMovePaneContainerStyled, { key: pane.uuid, isHovered: pane.uuid === hoveredPaneId, right: right + addTradingOEOffset(pane.uuid), top: pane.bounds.y },
        !pane.isBottom && (React.createElement(ChartMovePaneButtonStyled, { onClick: movePaneDownHandler, icon: iconsConfig.pane.movePaneDown })),
        !pane.isTop && (React.createElement(ChartMovePaneButtonStyled, { onClick: movePaneUpHandler, icon: iconsConfig.pane.movePaneUp }))))))) : null;
});
