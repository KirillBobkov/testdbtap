import { EventPopoverData } from '../../view-models/events-data.view-model';
import { Option } from 'fp-ts/Option';
import { Bounds } from '../../../chart-kit/Popover/Popover.model';
export interface EventPopoverProps {
    readonly event: Option<EventPopoverData>;
    readonly bounds?: Bounds;
}
export declare const EventPopover: (props: EventPopoverProps) => JSX.Element;
