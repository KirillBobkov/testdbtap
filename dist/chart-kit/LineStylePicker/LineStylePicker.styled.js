import styled from 'styled-components';
import { Dropdown } from '../Dropdown/Dropdown';
import { Menu } from '../Menu/Menu.component';
import { MenuItem } from '../Menu/MenuItem.component';
import { Popover } from '../Popover/Popover.lazy-component';
export const LineStylePickerDropdownStyled = styled(Dropdown).withConfig({ displayName: "LineStylePickerDropdownStyled" }) ``;
export const LineStylePickerPopoverStyled = styled(Popover).withConfig({ displayName: "LineStylePickerPopoverStyled" }) `
	border: none;
	margin-top: 3px;
	top: 2px;
`;
export const LineStyleMenuWrapperStyled = styled.div.withConfig({ displayName: "LineStyleMenuWrapperStyled" }) `
	width: 100px;
	padding: var(--spacer-1);
	align-items: center;
	display: flex;
	flex-direction: column;
`;
export const LineStyleMenuStyled = styled(Menu).withConfig({ displayName: "LineStyleMenuStyled" }) `
	width: 100%;
	align-items: center;
	display: flex;
	flex-direction: column;
	margin: 0;
	padding: 0;
	list-style: none;
	position: relative;
`;
export const LineMenuItemStyled = styled(MenuItem).withConfig({ displayName: "LineMenuItemStyled" }) `
	width: 100%;
	height: 24px;
	margin: 0;
	padding: 0;
	flex-grow: 1;
	box-shadow: inherit;
`;
export const LineMenuItemContentWrapperStyled = styled.div.withConfig({ displayName: "LineMenuItemContentWrapperStyled" }) `
	width: 100%;
	height: 24px;
	display: flex;
	align-items: center;
	justify-content: flex-start;
`;
export const LineMenuItemContentStyled = styled.span.withConfig({ displayName: "LineMenuItemContentStyled" }) `
	display: block;
	width: 56px;
	height: ${props => props.lineWidth + 'px'};
	background: var(--icon-primary-default-bg);
`;
export const LineMenuItemIconStyled = styled.div.withConfig({ displayName: "LineMenuItemIconStyled" }) `
	height: 20px;
	width: 20px;
	padding: 0 var(--spacer-1);
`;
export const LineMenuSeparatorStyled = styled.span.withConfig({ displayName: "LineMenuSeparatorStyled" }) `
	display: block;
	width: 92px;
	height: 1px;
	background: var(--dropdown-list_item-divider-bg);
	border-radius: 1px;
	margin: 4px 0;
`;
export const LineMenuItemTextStyled = styled.span.withConfig({ displayName: "LineMenuItemTextStyled" }) `
	width: 56px;
	color: var(--dropdown-list_item-default-text);
	font-size: var(--font-size-m);
	line-height: var(--line-height-s-px);
	font-family: var(--font-main-semibold);
`;
