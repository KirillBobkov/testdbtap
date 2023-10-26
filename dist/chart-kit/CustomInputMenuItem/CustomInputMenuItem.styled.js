import styled from 'styled-components';
import { InputContainerStyled } from '../Input/Input.styled';
import { InputStyled } from '../Input/Input.styled';
import { MenuItemActionButton } from '../Menu/action-button/MenuItemActionButton.component';
import { MenuItem } from '../Menu/MenuItem.component';
export const CustomInputMenuItemStyled = styled(MenuItem).withConfig({ displayName: "CustomInputMenuItemStyled" }) `
	display: flex;
	align-items: center;

	${InputContainerStyled} {
		background-color: inherit;
		padding: 0;

		${InputStyled} {
			height: 16px;
		}

		${InputStyled} {
			width: 100%;
		}
	}

	&:focus-visible {
		border-radius: 4px;
	}
`;
export const CustomInputMenuItemInputContainerStyled = styled.div.withConfig({ displayName: "CustomInputMenuItemInputContainerStyled" }) `
	display: flex;
	align-items: center;
	width: 100%;
	position: relative;

	&::after {
		position: absolute;
		display: block;
		content: '';
		bottom: -4px;
		left: 0;
		right: 0;
		height: 1px;
		background-color: ${props => props.error ? 'var(--main_chart-candle-bear-wick-bg)' : 'var(--dropdown-list_item-divider-bg)'};
	}
`;
export const CustomInputMenuItemErrorStyled = styled.span.withConfig({ displayName: "CustomInputMenuItemErrorStyled" }) `
	display: block;
	padding: var(--spacer-1);
	color: #ec3f44;
	font-size: var(--font-size-m);
	font-weight: 600;
	line-height: var(--line-height-m);
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;
export const CustomInputMenuItemInactiveStyled = styled.div.withConfig({ displayName: "CustomInputMenuItemInactiveStyled" }) `
	width: 100%;

	&:focus-visible {
		outline: 1px solid var(--button-focus-border);
		border-radius: var(--spacer-1);
		background-color: var(--dropdown-list_item-hovered-bg);
	}
`;
export const CustomInputConfirmButton = styled(MenuItemActionButton).withConfig({ displayName: "CustomInputConfirmButton" }) `
	height: 16px;
	color: var(--icon-primary-default-bg);

	&:hover {
		color: var(--icon-active-bg);
	}

	svg path,
	:hover svg path,
	:focus svg path {
		fill: none;
	}
`;
