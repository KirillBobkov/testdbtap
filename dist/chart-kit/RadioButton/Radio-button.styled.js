import styled, { css } from 'styled-components';
export const RadioButtonWrapperStyled = styled.div.withConfig({ displayName: "RadioButtonWrapperStyled" }) ``;
export const RadioButtonInputStyled = styled.input.withConfig({ displayName: "RadioButtonInputStyled" }) ``;
export const RadioButtonIconStyled = styled.span.withConfig({ displayName: "RadioButtonIconStyled" }) ``;
export const RadioButtonTextStyled = styled.span.withConfig({ displayName: "RadioButtonTextStyled" }) ``;
export const RadioButtonViewStyled = styled.span.withConfig({ displayName: "RadioButtonViewStyled" }) ``;
export const RadioButtonContainerStyled = styled.div.withConfig({ displayName: "RadioButtonContainerStyled" }) `
	display: flex;
	position: relative;
	user-select: none;
	align-items: center;
	opacity: ${props => (props.isDisabled ? '0.5' : '1')};

	${RadioButtonViewStyled} {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 18px;
		height: 18px;
		box-sizing: border-box;
		margin-right: 0.66em;
		flex-shrink: 0;
		text-align: center;
		overflow: hidden;
		border-radius: 50%;
		outline: 1px solid transparent;
		cursor: pointer;
		background: var(--radiobutton-default-bg);
	}

	${props => props.isChecked &&
    css `
			${RadioButtonViewStyled}:before {
				content: '';
				position: relative;
				width: 6px;
				height: 6px;
				border-radius: 4px;
				background-color: var(--radiobutton-default-dot);
			}
		`}

	&:focus {
		outline: 1px solid transparent;
		${RadioButtonViewStyled} {
			outline: 1px solid var(--button-focus-border);
		}
	}

	${props => !props.isDisabled &&
    css `
			&:hover ${RadioButtonViewStyled} {
				color: var(--radiobutton-hover-bg);
			}

			&:active ${RadioButtonViewStyled} {
				background-color: var(--radiobutton-default-bg);
			}
		`}
`;
export const RadioButtonStyled = styled.div.withConfig({ displayName: "RadioButtonStyled" }) `
	cursor: pointer;
	font-size: var(--font-size-m);
	user-select: none;
	color: var(--checkbox-default-text);

	${RadioButtonIconStyled} {
		color: var(--radiobutton-default-dot);
		background-color: var(--radiobutton-default-bg);
	}

	${RadioButtonViewStyled} {
		color: var(--radiobutton-default-bg);

		&::after {
			content: '';
			position: absolute;
			top: -2px;
			left: 0;
			width: 20px;
			height: 20px;
			z-index: 9;
			border-radius: 50%;
			background-color: transparent;
		}
	}

	${props => !props.isDisabled &&
    css `
			&:hover ${RadioButtonViewStyled} {
				color: var(--radiobutton-hover-bg);
			}

			&:hover ${RadioButtonIconStyled} {
				color: var(--radiobutton-default-dot) !important;
			}

			&:active ${RadioButtonViewStyled} {
				background-color: var(--radiobutton-default-bg);
			}

			&:active ${RadioButtonIconStyled} {
				color: var(--radiobutton-default-dot) !important;
			}
		`}
`;
