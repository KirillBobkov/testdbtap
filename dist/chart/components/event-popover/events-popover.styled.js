import styled from 'styled-components';
import { Popover } from '../../../chart-kit/Popover/Popover.lazy-component';
import { PopoverContentStyled } from '../../../chart-kit/Popover/Popover.styled';
export const EventsPopoverAnchor = styled.div.withConfig({ displayName: "EventsPopoverAnchor" }) `
	position: absolute;
	opacity: 0;
	width: 0;
	height: 0;
	left: ${(props) => props.x}px;
	top: ${(props) => props.y}px;
`;
export const EventsPopoverStyled = styled(Popover).withConfig({ displayName: "EventsPopoverStyled" }) `
	border-width: 2px;
	& {
		top: 0;
	}
	margin-left: var(--spacer-1);
	margin-bottom: var(--spacer-6);
	${PopoverContentStyled}:not(:empty) {
		font-size: var(--font-size-m);
	}
`;
export const EventsContentStyled = styled.div.withConfig({ displayName: "EventsContentStyled" }) `
	white-space: nowrap;
	padding: 7px 20px 6px 10px;
`;
export const EventsContentTitleStyled = styled.h3.withConfig({ displayName: "EventsContentTitleStyled" }) `
	margin: 0;
	padding: 0;
	border: 0;
	vertical-align: baseline;
	margin-bottom: 4px;
	color: ${props => props.color};
	font-size: var(--font-size-m);
	line-height: var(--line-height-m-px);
	text-transform: capitalize;
	font-family: var(--font-main-semibold);
`;
export const EventsContentDataStyled = styled.div.withConfig({ displayName: "EventsContentDataStyled" }) `
	display: flex;
	line-height: 23px;
	font-size: var(--font-size-m);
	font-family: var(--font-main-semibold);
`;
export const EventsContentDataNameColumnStyled = styled.div.withConfig({ displayName: "EventsContentDataNameColumnStyled" }) ``;
export const EventsContentDataNameStyled = styled.div.withConfig({ displayName: "EventsContentDataNameStyled" }) ``;
export const EventsContentDataValueColumnStyled = styled.div.withConfig({ displayName: "EventsContentDataValueColumnStyled" }) `
	padding: 0;
	margin-left: 10px;
`;
export const EventsContentDataValueStyled = styled.div.withConfig({ displayName: "EventsContentDataValueStyled" }) ``;
