import React from 'react';
import { newSink } from '../../context/sink2';
import { context } from '../../context/context2';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { option } from 'fp-ts';
import { constVoid, pipe } from 'fp-ts/function';
import { ORDER_ENTRY_HEIGHT } from '../view-models/trading/order-entry.view-model';
export const createOrderEntryDomMutationModel = context.combine(context.key()('orderEntryVM'), (vm) => {
    const containerRef = React.createRef();
    const updateYPositionEffect = vm.orderEntryYPosition.pipe(tap((y) => {
        updateYPosition(y, containerRef);
    }));
    const effects = merge(updateYPositionEffect);
    return newSink({
        containerRef,
        updateYPosition: y => updateYPosition(y, containerRef),
    }, effects);
});
const updateYPosition = (yPosition, positionNode) => pipe(option.fromNullable(positionNode.current), 
// ORDER_ENTRY_HEIGHT / 2 is a value used to make yPosition prop coordinate to be in the center of a component
option.fold(constVoid, node => (node.style.transform = `translateY(${yPosition - ORDER_ENTRY_HEIGHT / 2}px)`)));
