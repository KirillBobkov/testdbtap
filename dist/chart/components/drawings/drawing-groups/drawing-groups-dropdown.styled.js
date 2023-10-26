import styled from 'styled-components';
import { MenuItemActionButton } from '../../../../chart-kit/Menu/action-button/MenuItemActionButton.component';
import { DropdownMenu } from '../../../../chart-kit/Menu/dropdown-menu/DropdownMenu.styled';
import { MenuItem } from '../../../../chart-kit/Menu/MenuItem.component';
import { Popover } from '../../../../chart-kit/Popover/Popover.lazy-component';
import { PopoverContentStyled } from '../../../../chart-kit/Popover/Popover.styled';
export const DrawingGroupsPopoverStyled = styled(Popover).withConfig({ displayName: "DrawingGroupsPopoverStyled" }) `
	${PopoverContentStyled} {
		padding: var(--spacer-1);
		width: 170px;
	}
`;
export const DrawingGroupsDropdownMenuStyled = styled(DropdownMenu).withConfig({ displayName: "DrawingGroupsDropdownMenuStyled" }) `
	padding: 0;
`;
export const DrawingGroupsDropdownMenuItemStyled = styled(MenuItem).withConfig({ displayName: "DrawingGroupsDropdownMenuItemStyled" }) `
	height: 24px;
	display: flex;
	align-items: center;

	&:focus-visible {
		border-radius: 4px;
	}
`;
export const DrawingGroupsMenuItemText = styled.span.withConfig({ displayName: "DrawingGroupsMenuItemText" }) `
	max-width: 110px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;
export const DrawingGroupMIDeleteButton = styled(MenuItemActionButton).withConfig({ displayName: "DrawingGroupMIDeleteButton" }) `
	position: absolute;
	right: 12px;
	margin-left: 7px;
	transform: translateX(12px);

	&:hover svg path,
	&:focus svg path {
		fill: var(--main_chart-candle-bear-body-bg);
	}
`;
export const DrawingGroupMIEditButton = styled(MenuItemActionButton).withConfig({ displayName: "DrawingGroupMIEditButton" }) `
	position: absolute;
	right: 32px;
	margin-left: auto;
	transform: translateX(12px);
`;
