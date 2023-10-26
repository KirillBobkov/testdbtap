import styled, { css } from 'styled-components';
import { MenuItem } from '../MenuItem.component';
export const DropdownMenuItemStyled = styled(MenuItem).withConfig({ displayName: "DropdownMenuItemStyled" }) `
	margin: 0;
	flex: 0 0 100%;
	min-width: 120px;
	border-radius: var(--spacer-1);

	${props => props.isActive &&
    css `
			${DropdownMenuItemIconStyled},
			${DropdownMenuItemLabelStyled} {
				color: var(--dropdown-list_item-selected-text);
			}
		`}

	${props => props.disabled &&
    css `
			${DropdownMenuItemIconStyled},
			${DropdownMenuItemLabelStyled} {
				color: var(--dropdown-list_item-disabled-text);
			}
		`}
`;
export const DropdownMenuItemPopoverIconStyled = styled.div.withConfig({ displayName: "DropdownMenuItemPopoverIconStyled" }) `
	position: absolute;
	top: 50%;
	right: 0;
	transform: translateY(-50%);
	color: var(--icon-disabled-default-bg);
`;
export const DropdownMenuItemContainerStyled = styled.div.withConfig({ displayName: "DropdownMenuItemContainerStyled" }) `
	display: flex;
	align-items: center;
	width: 100%;
`;
export const DropdownMenuItemIconStyled = styled.div.withConfig({ displayName: "DropdownMenuItemIconStyled" }) `
	width: 20px;
	height: 20px;
	margin: -2px var(--spacer-1) -2px 0;
	color: var(--dropdown-list_item-default-text);
`;
export const DropdownMenuItemLabelStyled = styled.div.withConfig({ displayName: "DropdownMenuItemLabelStyled" }) `
	color: var(--dropdown-list_item-default-text);
	font-size: var(--font-size-m);
	line-height: var(--line-height-s-px);
	user-select: none;
	-moz-user-select: none;
	flex-grow: 2;
	font-family: var(--font-main-semibold);
`;
