import styled from 'styled-components';
import { ButtonStyled } from '../../Button/Button.styled';
import { ifStyle } from '../../../utils/styled.utils';
export const MonthButtonStyled = styled(ButtonStyled).withConfig({ displayName: "MonthButtonStyled" }) `
	color: var(--button-tertiary-default-text);
	font-size: var(--font-size-m);
	width: 100%;
	height: 23px;
	box-shadow: none;
	border-radius: 1px;
	text-align: left;
	box-sizing: border-box;
	padding: var(--spacer-1) var(--spacer-1) var(--spacer-1) var(--spacer-2);
	line-height: var(--line-height-m);
	background-color: transparent;
	cursor: pointer;
	margin-bottom: var(--spacer-1);
	border: 0;

	${props => ifStyle(props.isFlat) `color: var(--button-tertiary-default-text)`}
	&:before {
		content: none;
	}

	&:hover {
		background-color: var(--button-tertiary-hover);
		color: var(--dropdown-list_item-selected-text);
	}

	&:focus {
		padding-left: var(--spacer-2);
	}

	&:disabled {
		color: var(--button-tertiary-disabled-text);
		background: none;
		box-shadow: none;
	}

	&:disabled:hover {
		color: var(--button-tertiary-disabled-text);
	}
`;
