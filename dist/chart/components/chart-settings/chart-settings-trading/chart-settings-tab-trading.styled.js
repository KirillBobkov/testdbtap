import styled from 'styled-components';
import { ButtonsRadioGroup } from '../../../../chart-kit/ButtonsRadioGroup/ButtonsRadioGroup.component';
import { ButtonsRadioGroupButtonStyled } from '../../../../chart-kit/ButtonsRadioGroup/ButtonsRadioGroup.styled';
export const ChartSettingsTradingTypeGroupStyled = styled(ButtonsRadioGroup).withConfig({ displayName: "ChartSettingsTradingTypeGroupStyled" }) `
	margin-left: var(--spacer-6);
	${ButtonsRadioGroupButtonStyled} {
		margin: 0;
	}
`;
