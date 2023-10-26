import styled from 'styled-components';
import { Input } from '../../../../../../chart-kit/Input/Input.component';
import { ButtonIcon } from '../../../../../../chart-kit/Button/ButtonIcon.component';
import { ButtonInnerStyled } from '../../../../../../chart-kit/Button/Button.styled';
import { InputStyled } from '../../../../../../chart-kit/Input/Input.styled';
export const IndicatorListFilterContainerStyled = styled.div.withConfig({ displayName: "IndicatorListFilterContainerStyled" }) `
	display: flex;
	align-items: center;
	margin-bottom: 5px;
	position: relative;
	flex-grow: 1;
	width: 100%;
`;
export const IndicatorListInputStyled = styled(Input).withConfig({ displayName: "IndicatorListInputStyled" }) `
	width: 100%;
	height: 32px;
	font-weight: 500;
	font-size: var(--font-size-l);
	border-radius: var(--spacer-1);
	color: inherit;
	flex-grow: 1;
	${InputStyled} {
		width: 100%;
		font-family: var(--font-main-semibold);
	}

	&:hover {
		background: var(--input-default-bg);
	}

	@media (max-width: 680px) {
		min-width: 100px;
	}
`;
export const IndicatorAddScriptButtonStyled = styled(ButtonIcon).withConfig({ displayName: "IndicatorAddScriptButtonStyled" }) `
	padding: 0;
	width: 32px;
	min-width: 0;
	height: 32px;
	flex-shrink: 0;
	margin-left: 5px;

	${ButtonInnerStyled} {
		width: 24px;
		height: 24px;
	}

	&:hover {
		color: var(--link-hovered-text);
	}
`;
