import styled, { css } from 'styled-components';
import { Button as DefaultButton } from './default/Button.component';
export const ButtonInnerStyled = styled.div.withConfig({ displayName: "ButtonInnerStyled" }) `
	display: inline-block;
	position: relative;
	fill: currentColor;
`;
const extraStyles = css `
	color: var(--button-tertiary-default-text-color);
	background-color: var(--button-tertiary-default-bg-color);
	box-shadow: 0 0 0 1px var(--button-tertiary-border-outside-color);
`;
const flatStyles = css `
	color: var(--link-default-text);

	&,
	:disabled,
	[disabled] {
		border: 0;
		background-color: transparent;
		box-shadow: none;
	}
	&:hover {
		color: inherit;
		background-color: transparent;
	}

	&:active {
		color: inherit;
		background-color: transparent;
	}
`;
const primaryStyles = css `
	color: var(--button-primary-default-text);
	background-color: var(--button-primary-default);
	box-shadow: 0 0 0 1px var(--button-primary-border-outside);

	&:hover {
		background-color: var(--button-primary-hover);
	}

	&:active {
		background-color: var(--button-primary-pressed);
	}

	&:focus-visible {
		outline-offset: 1px;
	}

	&:disabled,
	&[disabled] {
		color: var(--button-primary-disabled-text);
	}
`;
const flatPrimaryStyles = css `
	color: var(--link-default-text);
	background-color: transparent;

	&:hover {
		color: var(--link-hovered-text);
		background-color: transparent;
	}

	&:disabled,
	&[disabled] {
		color: var(--button-primary-disabled-text);
	}
`;
export const ButtonStyled = styled(DefaultButton).withConfig({ displayName: "ButtonStyled" }) `
	color: var(--button-tertiaty-default-text);
	background-color: var(--dropdown_secondary-bg);
	height: 32px;
	font-size: var(--font-size-m);
	font-family: var(--font-main-semibold);
	min-width: 84px;
	border-radius: var(--spacer-1);
	position: relative;
	border: none;
	cursor: pointer;

	&:hover {
		background-color: var(--dropdown_secondary-list_item_hovered-bg);
	}

	&:active {
		background-color: var(--button-tertiaty-pressed);
	}

	&:focus-visible {
		outline: 1px solid var(--button-focus-border);
		outline-offset: -1px;
	}

	${props => props.isActive &&
    css `
			background-color: var(--button-primary-pressed);
			color: var(--button-primary-default-text);

			&:hover {
				background-color: var(--button-primary-hover);
			}
		`}
	${props => props.hasMenu &&
    css `
			&:after {
				content: '';
				position: absolute;
				bottom: 1px;
				left: 1px;
				border: 2px solid transparent;
				border-bottom: 2px solid #6e6c6b;
				border-left: 2px solid #6e6c6b;
				border-radius: 1px;
			}
		`}
  &:disabled,
  &[disabled] {
		color: var(--button-tertiaty-disabled-text);
		background-color: var(--button-tertiaty-pressed);
		box-shadow: 0 0 0 1px var(--button-disabled-border-outside-color);
		cursor: default;
		pointer-events: none;
	}

	${props => props.isPrimary && primaryStyles}

	${props => props.isFlat && flatStyles}

  ${props => props.isExtra && extraStyles}

  ${props => props.isFlatPrimary && flatPrimaryStyles}
`;
