import styled, { css } from 'styled-components';
import { MenuItemWithTooltip } from '../tooltip-menu/MenuItemWithTooltip.component';
import { DropdownMenuItemIconStyled, DropdownMenuItemLabelStyled } from './DropdownMenuItem.styled';
export const DropdownMenuItemWithTooltipStyled = styled(MenuItemWithTooltip).withConfig({ displayName: "DropdownMenuItemWithTooltipStyled" }) `
	margin: 0;
	display: flex;
	flex: 0 0 100%;

	${props => props.isActive &&
    css `
			${DropdownMenuItemIconStyled},
			${DropdownMenuItemLabelStyled} {
				color: var(--dropdown-list_item-selected-text);
			}
		`}
`;
