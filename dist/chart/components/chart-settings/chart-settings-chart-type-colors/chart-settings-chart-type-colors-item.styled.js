import styled from 'styled-components';
import { ColorPickerButtonContentStyled } from '../../../../chart-kit/ColorPicker/anchors/ColorPickerAnchor.styled';
import { IconWrapperStyled } from '../../../../chart-kit/IconWrapper/IconWrapper.styled';
import { ChartSettingsField } from '../chart-settings-field.component';
import { ButtonStyled } from '../../../../chart-kit/Button/Button.styled';
import { ChartSettingsFieldsetGroupItem } from '../chart-settings-fieldset.styled';
export const ChartFormFieldsetGroupItemColors = styled(ChartSettingsFieldsetGroupItem).withConfig({ displayName: "ChartFormFieldsetGroupItemColors" }) `
	width: 119px;
	padding-left: var(--spacer-2);
	margin-bottom: var(--spacer-2);

	${props => props.keyboardModeEnabled &&
    `&:focus-within {
		border-radius: 4px;
    	box-shadow: 0 0 0 1px var(--button-primary-default);
	}`}

	${ButtonStyled} {
		outline: 1px solid transparent;
		background-color: transparent;

		&:focus {
			box-shadow: none;
		}
	}
`;
export const ChartSettingssColorsFormFieldsetGroupItem = styled(ChartFormFieldsetGroupItemColors).withConfig({ displayName: "ChartSettingssColorsFormFieldsetGroupItem" }) `
	width: calc(100% - var(--spacer-2));
	&:focus-within {
		border-radius: var(--spacer-1);
	}
	&:hover {
		background-color: var(--dropdown-hovered-bg);
		border-radius: var(--spacer-1);
		${IconWrapperStyled} {
			background-color: var(--dropdown-hovered-bg);
		}
	}
`;
export const ChartSettingsFieldStyled = styled(ChartSettingsField).withConfig({ displayName: "ChartSettingsFieldStyled" }) `
	${IconWrapperStyled} {
		background-color: var(--dropdown-default-bg);
		svg path {
			display: none;
		}
	}
	${ColorPickerButtonContentStyled} {
		border-radius: 100%;
	}
	${ButtonStyled} {
		display: flex;
	}
`;
