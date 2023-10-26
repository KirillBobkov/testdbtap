import styled from 'styled-components';
import { ifStyle } from '../../utils/styled.utils';
import { ButtonIcon } from '../Button/ButtonIcon.component';
import { IconStyled } from '../Button/ButtonIcon.styled';
import { SteppableInput } from '../SteppableInput/SteppableInput.component';
export const SectionStyled = styled.span.withConfig({ displayName: "SectionStyled" }) `
	${props => ifStyle(props.isActive) `
  	background-color: var(--dropdown-list_item-selected-text);
  `}
`;
export const SeparatorStyled = styled.span.withConfig({ displayName: "SeparatorStyled" }) ``;
export const DateInputContent = styled.div.withConfig({ displayName: "DateInputContent" }) `
	user-select: none;
	flex: 1;
	&:focus-visible {
		outline: none;
	}
`;
export const DateSteppableInputStyled = styled(SteppableInput).withConfig({ displayName: "DateSteppableInputStyled" }) `
	border: none;
	box-shadow: none;
	background-color: transparent;
	font-size: var(--font-size-m);
	padding: 0 0 0 var(--spacer-2);
	cursor: text;
	&:focus {
		${props => ifStyle(!props.isDisabled) `
		border: none;
    	background-color: transparent;
	`}
	}
	&:hover {
		background-color: transparent;
	}
`;
export const DateInputContainerStyled = styled.div.withConfig({ displayName: "DateInputContainerStyled" }) `
	box-sizing: border-box;
	display: flex;
	align-items: center;
	border-width: 1px;
	border-style: solid;
	border-color: var(--input-default-border);
	border-radius: 4px;
	height: 32px;

	&:hover {
		border-color: var(--input-hovered-border);
	}
	&:focus-within {
		border-color: var(--input-focused-border);
	}
`;
export const DateInputStyled = styled.div.withConfig({ displayName: "DateInputStyled" }) `
	margin-right: 1px;
`;
export const DateInputButtonIcon = styled(ButtonIcon).withConfig({ displayName: "DateInputButtonIcon" }) `
	border: none;
	background-color: transparent;
	box-shadow: none;
	color: var(--icon-primary-default-bg);
	height: 25px;
	margin-left: var(--spacer-3);
	padding: var(--spacer-1) var(--spacer-2);

	&::before {
		border: none;
	}

	&:hover::before {
		background-color: transparent;
	}

	&:active::before {
		background-color: transparent;
	}

	&:hover {
		background-color: transparent;
		color: var(--link-hovered-text);
	}

	&:focus {
		box-shadow: none;
	}

	&:active ${IconStyled} {
		transform: translateY(1px);
	}
`;
