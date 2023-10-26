import styled from 'styled-components';
import { ButtonsRadioGroup } from '../../../../chart-kit/ButtonsRadioGroup/ButtonsRadioGroup.component';
import { ButtonsRadioGroupButtonStyled } from '../../../../chart-kit/ButtonsRadioGroup/ButtonsRadioGroup.styled';
export const ChartSettingsLegendButtonsStyled = styled(ButtonsRadioGroup).withConfig({ displayName: "ChartSettingsLegendButtonsStyled" }) `
	${ButtonsRadioGroupButtonStyled} {
		padding: 0 var(--spacer-1);
		max-height: 16px;
	}
`;
