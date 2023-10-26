import styled, { css } from 'styled-components';
import { Button } from '../Button/Button.component';
export const ButtonsRadioGroupStyled = styled.div.withConfig({ displayName: "ButtonsRadioGroupStyled" }) `
	display: flex;
`;
export const ButtonsRadioGroupButtonStyled = styled(Button).withConfig({ displayName: "ButtonsRadioGroupButtonStyled" }) `
	min-width: auto;
	height: 24px;
	padding-left: var(--spacer-1);
	padding-right: var(--spacer-1);
	color: var(--checkbox-default-text);

	${props => props.isActive &&
    css `
			transition: 0.2s;
			color: var(--button-primary-default);
			&:hover {
				color: var(--button-primary-default);
			}
		`}

	&:hover {
		background-color: var(--dropdown-hovered-bg);
		border-radius: var(--spacer-1);
	}
`;
