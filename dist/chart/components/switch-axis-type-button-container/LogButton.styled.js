import styled, { css } from 'styled-components';
import { Button } from '../../../chart-kit/Button/Button.component';
export const LogButtonStyled = styled(Button).withConfig({ displayName: "LogButtonStyled" }) `
	height: 16px;
	width: 21px;
	min-width: 21px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 4px;
	padding: var(--spacer-1) var(--spacer-2);
	color: var(--main_chart-value-text);
	font-family: var(--font-main-semibold);
	font-size: var(--font-size-m);
	line-height: var(--line-height-m-px);
	text-align: right;
	box-sizing: unset !important;

	&:hover {
		background: var(--dropdown-list_item-hovered-bg);
	}

	${props => props.isActive &&
    css `
			color: var(--button-primary-default);
		`}
`;
