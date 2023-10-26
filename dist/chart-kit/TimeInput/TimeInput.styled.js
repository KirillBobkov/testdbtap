import styled from 'styled-components';
import { ifStyle } from '../../utils/styled.utils';
import { ButtonIconStyled, IconStyled } from '../Button/ButtonIcon.styled';
import { InputContainerStyled } from '../Input/Input.styled';
import { InputStyled } from '../SteppableInput/SteppableInput.styled';
export const SeparatorStyled = styled.span.withConfig({ displayName: "SeparatorStyled" }) `
	cursor: default;
`;
export const SectionStyled = styled.span.withConfig({ displayName: "SectionStyled" }) `
	cursor: default;
	${props => ifStyle(props.isActive) `
  	background-color: var(--dropdown-list_item-selected-text);
  `}
`;
export const TimeInputContentStyled = styled.div.withConfig({ displayName: "TimeInputContentStyled" }) `
	padding: var(--spacer-2) 38px var(--spacer-2) var(--spacer-2);
	font-size: var(--font-size-m);

	&:focus-visible {
		outline: 1px solid transparent;
	}
`;
export const TimeInputContainerStyled = styled.div.withConfig({ displayName: "TimeInputContainerStyled" }) `
	${ButtonIconStyled} {
		position: absolute;
		right: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 28px;
		height: 14px;
		padding: 0;
		margin: 1px 1px 1px 0;
		border-radius: 0;
		min-width: 0;

		&:nth-of-type(2) {
			top: 0;
			border-top-right-radius: 4px;
		}

		&:nth-of-type(1) {
			bottom: 0;
			border-bottom-right-radius: 4px;
		}
	}

	${IconStyled} {
		margin: 0;
		padding: 0;
		width: 8px;
	}

	${InputContainerStyled} {
		&:focus-within {
			border-color: var(--input-focused-border);
		}
	}

	${InputStyled} {
		position: relative;
		display: flex;
		justify-content: flex-end;
		min-width: 54px;
		width: 100%;
		height: 32px;
		padding: 1px;
		border-radius: 4px;
		background-color: transparent;
		border-width: 1px;
	}
`;
