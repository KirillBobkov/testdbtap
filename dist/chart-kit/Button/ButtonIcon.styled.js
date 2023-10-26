import styled from 'styled-components';
import { Button } from './Button.component';
import { ButtonInnerStyled } from './Button.styled';
export const ButtonIconStyled = styled(Button).withConfig({ displayName: "ButtonIconStyled" }) `
	width: 50px;
	min-width: 50px;
	height: 32px;
	margin-right: 1px;
	padding: 1px 6px;
	display: flex;
	align-items: center;
	justify-content: center;

	${ButtonInnerStyled} {
		width: 20px;
		height: 20px;
	}
`;
export const IconStyled = styled.span.withConfig({ displayName: "IconStyled" }) ``;
