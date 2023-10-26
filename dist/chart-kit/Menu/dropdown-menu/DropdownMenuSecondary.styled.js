import styled from 'styled-components';
import { DropdownMenu } from './DropdownMenu.styled';
import { DropdownMenuItemStyled } from './DropdownMenuItem.styled';
export const DropdownMenuSecondaryStyled = styled(DropdownMenu).withConfig({ displayName: "DropdownMenuSecondaryStyled" }) `
	background-color: var(--dropdown_secondary-bg);
	${DropdownMenuItemStyled} {
		:hover {
			background-color: var(--dropdown_secondary-list_item_hovered-bg);
		}
	}
`;
