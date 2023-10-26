import styled from 'styled-components';
import { ButtonStyled } from '../../../../chart-kit/Button/Button.styled';
import { ThemeSwitcher } from '../../theme-switcher/theme-switcher.component';
import { ChartSettingsFieldsetContainer } from '../chart-settings-fieldset.styled';
export const ChartFormThemeSwitcher = styled(ThemeSwitcher).withConfig({ displayName: "ChartFormThemeSwitcher" }) `
	margin-left: var(--spacer-2);
	margin-right: var(--spacer-7);
`;
export const ChartSettingsPopupAdditionalActionsStyled = styled.div.withConfig({ displayName: "ChartSettingsPopupAdditionalActionsStyled" }) `
	${ButtonStyled} {
		font-family: var(--font-main-semibold);
		font-size: var(--font-size-m);
		line-height: var(--line-height-m);
		color: var(--link-default-text);
		padding: 0 var(--spacer-2);
		border: 1px solid transparent;

		&:focus {
			border-color: var(--button-focus-border);
		}
	}
`;
export const ChartSettingsFieldsetContainerStyled = styled(ChartSettingsFieldsetContainer).withConfig({ displayName: "ChartSettingsFieldsetContainerStyled" }) `
	${ChartFormThemeSwitcher} {
		margin-top: var(--spacer-1);
		margin-bottom: var(--spacer-2);
	}
`;
export const ChartSettingsChartTypeColorsDefaultStyled = styled(ChartSettingsPopupAdditionalActionsStyled).withConfig({ displayName: "ChartSettingsChartTypeColorsDefaultStyled" }) `
	${ButtonStyled} {
		padding: var(--spacer-2);
	}
`;
