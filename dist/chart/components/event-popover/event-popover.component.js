import * as React from 'react';
import { EventsPopoverAnchor, EventsPopoverStyled, EventsContentTitleStyled, EventsContentDataStyled, EventsContentDataNameColumnStyled, EventsContentDataNameStyled, EventsContentDataValueColumnStyled, EventsContentStyled, EventsContentDataValueStyled, } from './events-popover.styled';
import { constNull, pipe } from 'fp-ts/function';
import { option } from 'fp-ts';
export const EventPopover = (props) => {
    const { event, bounds } = props;
    const anchorRef = React.useRef(null);
    // 2 pipes here are intentional, first pipe will ALWAYS render the anchor
    // so it will be possible to correctly determine popover size and position the popover
    return (React.createElement(React.Fragment, null,
        pipe(event, option.getOrElse(() => ({ x: 0, y: 0 })), pos => (React.createElement(EventsPopoverAnchor, { x: pos.x, y: pos.y, ref: anchorRef }))),
        pipe(event, option.fold(constNull, ev => (React.createElement(EventsPopoverStyled, { anchorRef: anchorRef, customBounds: bounds, opened: true, align: "end", position: "right" },
            React.createElement(EventsContentStyled, null,
                React.createElement(EventsContentTitleStyled, { color: ev.color }, ev.title),
                React.createElement(EventsContentDataStyled, null,
                    React.createElement(EventsContentDataNameColumnStyled, null, ev.rows.map((row, id) => (React.createElement(EventsContentDataNameStyled, { key: id }, row.name)))),
                    React.createElement(EventsContentDataValueColumnStyled, null, ev.rows.map((row, id) => (React.createElement(EventsContentDataValueStyled, { key: id }, row.value))))))))))));
};
