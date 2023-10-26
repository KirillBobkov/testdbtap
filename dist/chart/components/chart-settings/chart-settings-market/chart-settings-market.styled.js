import styled from "styled-components";
import { ButtonsRadioGroup } from "../../../../chart-kit/ButtonsRadioGroup/ButtonsRadioGroup.component";
import { ButtonsRadioGroupButtonStyled } from "../../../../chart-kit/ButtonsRadioGroup/ButtonsRadioGroup.styled";
export const ChartSettingsVolumeButtonsStyled = styled(ButtonsRadioGroup).withConfig({ displayName: "ChartSettingsVolumeButtonsStyled" }) `
	margin-left: -2px;
	max-height: 16px;
	${ButtonsRadioGroupButtonStyled} {
		margin-right: var(--spacer-2);
		min-width: unset;
		padding: 0 var(--spacer-1);
		max-height: 16px;
	}
`;
