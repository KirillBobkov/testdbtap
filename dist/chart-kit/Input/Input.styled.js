import styled, { css } from 'styled-components';
export const InputStyled = styled.input.withConfig({ displayName: "InputStyled" }) ``;
const disableStyle = css `
	color: var(--input-disabled-text);
	border-color: var(--input-default-border);
`;
const notDisableStyle = css `
	:focus {
		border-color: var(--input-focused-border);
		background-color: var(--input-default-bg);
	}

	:active {
		border-color: var(--input-focused-border);
	}
`;
const errorStyle = css `
	border-color: var(--input-wrong-border-outside-color);

	&:hover {
		border-color: var(--input-wrong-border-outside-color);
	}
`;
export const InputContainerStyled = styled.div.withConfig({ displayName: "InputContainerStyled" }) `
	position: relative;
	box-sizing: border-box;
	padding: 6px 8px;
	color: var(--input-default-text);
	border-width: 0;
	border-style: solid;
	background-color: var(--input-default-bg);
	border-color: var(--input-default-border);
	border-radius: 2px;

	${InputStyled} {
		display: inline-block;
		outline: 1px solid transparent;
		box-sizing: border-box;
		box-shadow: none;
		font-size: inherit;
		font-family: inherit;
		line-height: normal;
		color: inherit;
		height: 100%;
		vertical-align: top;
		background-color: transparent;
		border: 0;
		padding: 0;
		white-space: nowrap;
		overflow: hidden;
		width: 80px;
		text-overflow: ellipsis;

		::selection,
		::-moz-selection,
		::-webkit-selection {
			background: default;
		}
	}

	&:focus-within {
		outline: 1px solid ${props => (props.keyboardModeEnabled ? 'var(--input-focused-border)' : 'transparent')};
	}

	&:hover {
		border-color: var(--input-hovered-border);
		background-color: var(--dropdown-list_item-hovered-bg);
	}

	${props => !props.isDisabled && notDisableStyle}
	${props => props.isHasError && errorStyle}
	${props => props.isDisabled && disableStyle}
	&:disabled,
	&[disabled] {
		color: var(--input-disabled-text);
		border-color: var(--input-default-border);
		pointer-events: none;
		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
	}
`;
export const InputErrorStyled = styled.div.withConfig({ displayName: "InputErrorStyled" }) ``;
InputContainerStyled.displayName = 'CKInputContainerStyled';
InputStyled.displayName = 'CKInputStyled';
