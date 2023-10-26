import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { HoveredExecutedOrderPopoverLabel, HoveredExecutedOrderPopoverStyled, POPOVER_HEIGHT, } from './hovered-executed-order.styled';
import { capitalize } from '../../../utils/string.utils';
import { HoveredElementPopoverAnchor } from '../../../chart-kit/Popover/Popover.styled';
import { triangleSize } from '@dx-private/dxchart5-modules/dist/executed-orders/drawers/executed-orders.drawer';
// figma paddings
const POPOVER_DESIGN_PADDINGS = { left: 8, top: -triangleSize.height - Math.ceil(POPOVER_HEIGHT / 2) };
export const HoveredExecutedOrderComponent = memo(props => {
    const { hoveredExecutedOrder } = props;
    const anchorRef = useRef(null);
    //#region HACK
    /**
     * a hack to make popover rendered twice
     * if not, popover wouldn't rendered at the correct position
     *
     * for alternative approach please see event-popover.component.tsx
     * it uses fp-ts and double pipe to render anchor first and only then popover
     */
    const [opened, setOpened] = useState(false);
    useEffect(() => setOpened(true), []);
    //#endregion
    const anchorPosition = useMemo(() => {
        return {
            x: hoveredExecutedOrder.x + POPOVER_DESIGN_PADDINGS.left,
            y: hoveredExecutedOrder.y +
                POPOVER_DESIGN_PADDINGS.top +
                // triangles are drawn at the relative top Y,
                // so the sell orders need a triangle height compensation to be placed correctly
                (hoveredExecutedOrder.side === 'sell' ? 0 : triangleSize.height),
        };
    }, [hoveredExecutedOrder]);
    const popoverLabel = useMemo(() => {
        return `${capitalize(hoveredExecutedOrder.side)} ${hoveredExecutedOrder.quantity ?? 0} @ ${hoveredExecutedOrder.price}`;
    }, [hoveredExecutedOrder]);
    return (React.createElement(React.Fragment, null,
        React.createElement(HoveredElementPopoverAnchor, { ref: anchorRef, style: { left: anchorPosition.x, top: anchorPosition.y } }),
        React.createElement(HoveredExecutedOrderPopoverStyled, { align: "start", anchorRef: { ...anchorRef }, opened: opened },
            React.createElement(HoveredExecutedOrderPopoverLabel, null, popoverLabel))));
});
