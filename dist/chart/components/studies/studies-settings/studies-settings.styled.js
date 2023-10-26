import styled from 'styled-components';
import { ButtonIcon } from '../../../../chart-kit/Button/ButtonIcon.component';
import { ButtonIconStyled } from '../../../../chart-kit/Button/ButtonIcon.styled';
import { Button } from '../../../../chart-kit/Button/Button.component';
export const StudiesSettingsButtonStyled = styled(Button).withConfig({ displayName: "StudiesSettingsButtonStyled" }) ``;
export const StudiesSettingsButtonIconStyled = styled(ButtonIcon).withConfig({ displayName: "StudiesSettingsButtonIconStyled" }) `
	height: 28px;
	display: flex;
	align-items: center;
	font-size: var(--font-size-l);

	${ButtonIconStyled} {
		width: 16px;
		height: 18px;
	}
`;
export const StudiesSettingsButtonContainerStyled = styled.div.withConfig({ displayName: "StudiesSettingsButtonContainerStyled" }) ``;
