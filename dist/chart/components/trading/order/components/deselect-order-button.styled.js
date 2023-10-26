import styled from 'styled-components';
import { ButtonIcon } from '../../../../../chart-kit/Button/ButtonIcon.component';
import { ButtonInnerStyled } from '../../../../../chart-kit/Button/Button.styled';
export const DeselectButtonStyled = styled(ButtonIcon).withConfig({ displayName: "DeselectButtonStyled" }) `
	width: 19px;
	min-width: 19px;
	height: 19px;
	background-color: var(--order-button-default-bg);
	color: var(--icon-secondary-default-bg);
	border-radius: 3px;
	margin: 0;
	padding: 0;

	:hover {
		background-color: var(--order-button-hover-bg);
		color: var(--icon-primary-default-bg);
	}

	${ButtonInnerStyled} {
		width: 19px;
		height: 19px;
	}
`;
