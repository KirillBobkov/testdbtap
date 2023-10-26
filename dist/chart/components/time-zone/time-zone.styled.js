import styled from 'styled-components';
import { MenuItem } from '../../../chart-kit/Menu/MenuItem.component';
import { Popover } from '../../../chart-kit/Popover/Popover.lazy-component';
import { PopoverContentStyled } from '../../../chart-kit/Popover/Popover.styled';
import { StyledScrollableContainer } from '../../../chart-kit/Scrollable/Scrollable.styled';
import { ifStyle } from '../../../utils/styled.utils';
export const TimeZoneContainerStyled = styled.div.withConfig({ displayName: "TimeZoneContainerStyled" }) `
	position: relative;
	z-index: 19;
	background: var(--main_chart-bg);
	user-select: none;
	margin-right: var(--spacer-2);
	flex-shrink: 0;
`;
export const AdaptivePopoverStyled = styled(Popover).withConfig({ displayName: "AdaptivePopoverStyled" }) `
	background-color: var(--dropdown-default-bg) !important;
	border: none;
	border-radius: 8px;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.15), 0 25px 30px rgba(0, 0, 0, 0.35);
	padding-top: 35px;
	padding-bottom: 5px;

	${StyledScrollableContainer} {
		min-width: inherit;
	}

	${PopoverContentStyled} {
		overflow: visible;
		width: 170px;
	}
`;
export const TimeZoneMenuItemStyled = styled(MenuItem).withConfig({ displayName: "TimeZoneMenuItemStyled" }) `
	font-family: var(--font-main-semibold);
	font-size: var(--font-size-m);
	line-height: var(--line-height-m-px);
	padding: var(--spacer-1) var(--spacer-2);
	margin: 0;
	border-radius: 4px;
	justify-content: flex-start;
`;
export const TimeZoneMenuItemUTCDiffStyled = styled.span.withConfig({ displayName: "TimeZoneMenuItemUTCDiffStyled" }) `
	color: var(--dropdown-list_item-disabled-text);
	margin-left: var(--spacer-1);

	${props => ifStyle(props.isActive) `
		color: var(--dropdown-list_item-selected-text);
    `}
`;
