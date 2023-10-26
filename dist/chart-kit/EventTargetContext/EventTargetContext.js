import React from 'react';
/**
 * EventTargetContext is needed for a situations when Popover
 * is placed inside Popup, another Popover and other popup-like component
 * It binds the closeOnClickAway event to the element in the context
 * for example, popover inside a popup won't close when clicking outside of a popup
 * if popup is passed down with the context to the popover
 * TODO: for now that context is fixing the problem of the event propogation in the DrawingToolbar popovers
 * research what can be done to fix that without that context
 */
export function createEventTargetContext() {
    const EventTargetContext = React.createContext(undefined);
    const { Provider: EventTargetProvider, Consumer: EventTargetConsumer } = EventTargetContext;
    return { EventTargetProvider, EventTargetConsumer };
}
