import styled from 'styled-components';
import { Button } from '../../../../chart-kit/Button/Button.component';
import { MenuItem } from '../../../../chart-kit/Menu/MenuItem.component';
export const DrawingSelectorFooterStyled = styled.div.withConfig({ displayName: "DrawingSelectorFooterStyled" }) `
	margin-top: 3px;
	margin-bottom: 5px;
	padding-top: 5px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	position: relative;

	&::after {
		position: absolute;
		content: '';
		top: 0;
		left: 15px;
		right: 15px;
		height: 1px;
		background-color: var(--dropdown-list_item-divider-bg);
	}
`;
export const DrawingSelectorFooterMenuItemStyled = styled(MenuItem).withConfig({ displayName: "DrawingSelectorFooterMenuItemStyled" }) `
	margin: 0;
	padding: 0;
`;
export const DrawingSelectorFooterButtonContainerStyled = styled.div.withConfig({ displayName: "DrawingSelectorFooterButtonContainerStyled" }) `
	&:focus-visible {
		outline: 1px solid var(--button-focus-border);
		margin-right: 1px;
		border-radius: 4px;
		background-color: var(--dropdown-list_item-hovered-bg);
	}
`;
export const DrawingSelectorFooterButtonStyled = styled(Button).withConfig({ displayName: "DrawingSelectorFooterButtonStyled" }) `
	position: relative;
	width: 190px;
	box-sizing: border-box;
	background-color: transparent;
	color: var(--dropdown-list_item-default-text);
	height: 24px;
	text-align: start;
	cursor: pointer;
	transform-origin: top center;
	transition: color 220ms ease-in;
	margin: 0 5px;
	padding: 0 7px 0 28px;
	font-size: var(--font-size-m);
	font-family: var(--font-main-semibold);

	&:hover {
		background: var(--dropdown-list_item-hovered-bg);
		border-radius: 4px;
	}

	&:disabled,
	&[disabled] {
		background-color: transparent;
		color: var(--button-secondary-disabled-text);
	}
`;
