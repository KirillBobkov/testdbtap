import React, { memo, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { pipe } from 'fp-ts/function';
import { array } from 'fp-ts';
const REDISPATCHED_EVENTS_LIST = [
    'onClick',
    'onDoubleClick',
    'onWheel',
    'onMouseMove',
    'onMouseDown',
    'onMouseUp',
    'onMouseOver',
    'onSelect',
    'onReset',
    'onDrag',
    'onDragStart',
    'onDragEnd',
    'onBlur',
    'onTouchMove',
    'onTouchCancel',
    'onTouchEnd',
    'onTouchStart',
];
export const RedispatchStyledContainer = styled.div.withConfig({ displayName: "RedispatchStyledContainer" }) ``;
/**
 * This component redispatches all events from children to chart instance container
 */
export const RedispatchToChart = memo(props => {
    const { chart, children, redispatchRef, blacklistOfEvents = [] } = props;
    const eventHandler = useCallback((e) => {
        const event = e.nativeEvent;
        chart.elements.mainCanvas.parentElement?.dispatchEvent(new event.constructor(event.type, event));
    }, [chart.elements]);
    const filteredListOfEvents = useMemo(() => {
        const copyOfEventsList = REDISPATCHED_EVENTS_LIST.slice();
        return pipe(copyOfEventsList, array.filter(item => !blacklistOfEvents.includes(item)), array.reduce({}, (acc, item) => {
            acc[item] = eventHandler;
            return acc;
        }));
    }, [blacklistOfEvents, eventHandler]);
    return (React.createElement(RedispatchStyledContainer, { ref: redispatchRef, ...filteredListOfEvents }, children));
});
