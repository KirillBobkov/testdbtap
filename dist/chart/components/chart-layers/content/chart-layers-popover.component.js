import React, { memo, useContext } from 'react';
import { ChartLayersPopoverStyled } from './chart-layers-popover.styled';
import { ChartLayersContent } from './chart-layers-content.component';
import { MultiChartComponentContext } from '../../multi-chart/multi-chart-context';
export const ChartLayersPopover = memo(props => {
    const { onClose, bounds, anchorRef, isOpened, updatePopoverCustomPosition, customPosition } = props;
    const { keyboardModeEnabled } = useContext(MultiChartComponentContext);
    return (React.createElement(ChartLayersPopoverStyled, { opened: isOpened, anchorRef: anchorRef, draggableBounds: 'parent', customBounds: bounds, onRequestClose: onClose, draggable: true, keyboardMode: keyboardModeEnabled, updatePopoverCustomPosition: updatePopoverCustomPosition, customPosition: customPosition, draggableHandlerClass: "draggable-header", closeOnClickAway: false },
        React.createElement(ChartLayersContent, { headerClassName: "draggable-header", ...props })));
});
export default ChartLayersPopover;
