import styled from 'styled-components';
import { MenuItem } from '../../Menu/MenuItem.component';
import { Popover } from '../../Popover/Popover.lazy-component';
import { PopoverContentStyled } from '../../Popover/Popover.styled';
import { Selectbox } from '../../Selectbox/Selectbox.component';
import { SelectboxAnchorStyled, SelectboxAnchorCaretStyled } from '../../Selectbox/SelectboxAnchor.styled';
import { IconWrapperStyled } from '../../IconWrapper/IconWrapper.styled';
import { Menu } from '../../Menu/Menu.component';
import { SelectboxAnchor } from '../../Selectbox/SelectboxAnchor.component';
export const YearSelectboxStyled = styled(Selectbox).withConfig({ displayName: "YearSelectboxStyled" }) `
	flex: 1;
	width: 70px;
	height: 23px;
	background: transparent;
	fill: var(--input-default-bg-color);
	border-bottom: 1px solid var(--dropdown-list_item-divider-bg);

	&:before {
		display: none;
	}

	&:hover {
		fill: var(--icon-secondary-default-bg);
	}

	&[disabled] {
		background: transparent;
	}

	&:focus {
		box-shadow: none;
	}

	${IconWrapperStyled} {
		display: block;
		width: 17px;
		height: 9px;
	}

	${SelectboxAnchorStyled} {
		width: 60px;
	}
`;
export const YearSelectboxAnchorStyled = styled(SelectboxAnchor).withConfig({ displayName: "YearSelectboxAnchorStyled" }) `
	background-color: var(--input-default-bg-color);
	${SelectboxAnchorCaretStyled} {
		display: none;
	}
`;
export const YearMenuItemStyled = styled(MenuItem).withConfig({ displayName: "YearMenuItemStyled" }) `
	line-height: var(--line-height-xl);
	padding: 0 0 0 var(--spacer-1);
`;
export const YearPopoverStyled = styled(Popover).withConfig({ displayName: "YearPopoverStyled" }) `
	${PopoverContentStyled}:not(:empty) {
		background-color: var(--dropdown-default-bg);
	}
`;
export const YearSelectboxMenuStyled = styled(Menu).withConfig({ displayName: "YearSelectboxMenuStyled" }) `
	max-height: 321px;
	padding: 0;
`;
