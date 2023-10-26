import styled from 'styled-components';
import { SIButtonStyled, SIInnerStyled } from '../SteppableInput/SteppableInput.styled';
import { ButtonInnerStyled } from '../Button/Button.styled';
import { SteppableInput } from '../SteppableInput/SteppableInput.component';
import { InputContainerStyled } from '../Input/Input.styled';
import { Input } from '../Input/Input.component';
export const NumericInputStyled = styled(Input).withConfig({ displayName: "NumericInputStyled" }) ``;
export const NumericStepperStyled = styled.div.withConfig({ displayName: "NumericStepperStyled" }) `
	${NumericInputStyled} {
		padding: 0 28px 0 0;
		box-shadow: none;
		border: none;
		border-radius: 0;
		font-size: var(--font-size-m);
	}

	${SIButtonStyled} {
		flex-shrink: 0;
		width: 28px;
		min-width: 28px;
		height: 14px;
		margin: 1px;
		margin-left: 0;
		padding: 0;
		border-radius: 1px;
		position: absolute;
		right: 0;

		&:active:not([disabled]) {
			padding-top: 1px;
		}

		&:nth-of-type(2) {
			top: 0;
			border-top-right-radius: 4px;
		}

		&:nth-of-type(1) {
			bottom: 0;
			border-bottom-right-radius: 4px;
		}

		${ButtonInnerStyled} {
			color: var(--icon-primary-default-bg);

			.icon:only-child {
				margin-right: 50%;
				transform: translateX(50%);
			}
		}
	}

	${InputContainerStyled} {
		background-color: transparent;
	}
`;
export const NumericSteppableInputStyled = styled(SteppableInput).withConfig({ displayName: "NumericSteppableInputStyled" }) `
	width: 100%;
	height: 32px;
	border-radius: 6px;
	border-width: 1px;
	background-color: var(--input-default-bg);

	&:hover {
		${SIInnerStyled} {
			${InputContainerStyled} {
				background: transparent;
			}
		}
	}

	&:focus-within {
		border-color: var(--input-focused-border);
	}

	${SIInnerStyled} {
		${InputContainerStyled} {
			&:focus-within {
				outline: solid transparent 1px;
			}
		}
	}
`;
