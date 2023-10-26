import styled from 'styled-components';
import { ButtonIcon } from '../../Button/ButtonIcon.component';
import { ButtonInnerStyled } from '../../Button/Button.styled';
export const MenuItemActionButtonStyled = styled(ButtonIcon).withConfig({ displayName: "MenuItemActionButtonStyled" }) `
	display: ${props => (props.visible ? 'flex' : 'none')};
	width: 20px;
	min-width: 20px;
	height: 20px;
	background: transparent;

	${ButtonInnerStyled} {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	&:disabled {
		& svg path {
			fill: var(--icon-disabled-default-bg);
		}
	}

	&:hover,
	&:active,
	&:focus {
		background: transparent;
	}

	& svg {
		width: 20px;
		height: 20px;
		margin: auto;
	}

	& svg path {
		fill: var(--icon-primary-default-bg);
	}

	&:hover svg path,
	&:focus svg path {
		fill: var(--icon-active-bg);
	}
`;
