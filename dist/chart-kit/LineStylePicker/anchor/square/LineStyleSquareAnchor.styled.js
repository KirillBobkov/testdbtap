import styled from 'styled-components';
import { Button } from '../../../Button/Button.component';
import { ButtonInnerStyled } from '../../../Button/Button.styled';
export const LineStyleSquareAnchorButtonStyled = styled(Button).withConfig({ displayName: "LineStyleSquareAnchorButtonStyled" }) `
	height: 24px;
	width: 24px;
	min-width: 24px;
	padding: 0;
	border: 0;
	border-radius: 4px;
	background: transparent;

	&:hover {
		background: var(--dropdown-list_item-hovered-bg);
	}

	&:focus {
		background: var(--button-tertiaty-pressed);
	}

	&:active {
		background: var(--button-tertiaty-pressed);
	}

	${ButtonInnerStyled} {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: nowrap;
	}

	${ButtonInnerStyled}:after {
		content: '';
		position: absolute;
		bottom: -2px;
		left: 0;
		border: 2px solid transparent;
		border-bottom: 2px solid #6e6c6b;
		border-left: 2px solid #6e6c6b;
		border-radius: 1px;
	}
`;
export const LineStyleSquareAnchorContentStyled = styled.div.withConfig({ displayName: "LineStyleSquareAnchorContentStyled" }) `
	position: relative;
`;
