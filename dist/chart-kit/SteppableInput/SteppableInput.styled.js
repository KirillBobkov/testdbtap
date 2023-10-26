import styled from 'styled-components';
import { Input } from '../Input/Input.component';
import { ButtonIcon } from '../Button/ButtonIcon.component';
export const SIInnerStyled = styled.div.withConfig({ displayName: "SIInnerStyled" }) ``;
export const SIButtonStyled = styled(ButtonIcon).withConfig({ displayName: "SIButtonStyled" }) `
	flex-shrink: 0;
`;
export const SIClearButtonStyled = styled(SIButtonStyled).withConfig({ displayName: "SIClearButtonStyled" }) ``;
export const SIInputStyled = styled.div.withConfig({ displayName: "SIInputStyled" }) `
	${SIInnerStyled} {
		height: 100%;
		display: flex;
		align-items: center;
	}

	${SIButtonStyled} {
		background-color: var(--dropdown_secondary-bg);
		margin-right: 1px;
		padding: 3px;
		min-width: 0;
		width: 20px;
		height: 20px;

		&:hover {
			background-color: var(--dropdown_secondary-list_item_hovered-bg);
		}

		&:disabled,
		&[disabled] {
			color: var(--button-tertiary-disabled-text);
			background-color: var(--button-tertiary-pressed);
			box-shadow: none;
			border: none;
		}

		&:disabled svg,
		&[disabled] svg {
			top: 0;
			fill: var(--icon-disabled-default-bg);
		}
	}
	${SIClearButtonStyled} {
		width: 7px;
		padding: 0;
		margin-right: 4px;
		opacity: 1;
		background: transparent;

		&[disabled] {
			background: transparent;
		}

		&::before {
			display: none;
		}
	}
`;
export const InputStyled = styled(Input).withConfig({ displayName: "InputStyled" }) ``;
