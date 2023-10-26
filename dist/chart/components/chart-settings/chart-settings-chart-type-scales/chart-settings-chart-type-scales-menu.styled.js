import styled, { css } from 'styled-components';
import { ButtonsRadioGroup } from '../../../../chart-kit/ButtonsRadioGroup/ButtonsRadioGroup.component';
import { ButtonsRadioGroupButtonStyled } from '../../../../chart-kit/ButtonsRadioGroup/ButtonsRadioGroup.styled';
import { CheckboxContainerStyled, CheckboxIconStyled, CheckboxViewStyled, } from '../../../../chart-kit/Checkbox/Checkbox.styled';
import { MenuItem } from '../../../../chart-kit/Menu/MenuItem.component';
import { Popover } from '../../../../chart-kit/Popover/Popover.lazy-component';
import { ChartSettingsField } from '../chart-settings-field.component';
import { ChartSettingsFieldsetGroupItem } from '../chart-settings-fieldset.styled';
export const ChartSettingsTabScalesStyled = styled(Popover).withConfig({ displayName: "ChartSettingsTabScalesStyled" }) ``;
export const ChartSettingsTabScalesMainSectionStyled = styled.div.withConfig({ displayName: "ChartSettingsTabScalesMainSectionStyled" }) `
	width: 100%;
	display: flex;
	flex-direction: column;
`;
export const ChartSettingsTabScalesDivider = styled.div.withConfig({ displayName: "ChartSettingsTabScalesDivider" }) `
	width: 100%;
	height: 1px;
	margin-top: var(--spacer-1);
	margin-bottom: var(--spacer-1);
	background-color: var(--dropdown-list_item-divider-bg);
`;
export const ChartSettingsScalesYAxisSideTitleStyled = styled.div.withConfig({ displayName: "ChartSettingsScalesYAxisSideTitleStyled" }) `
	margin-left: var(--spacer-6);
	padding: var(--spacer-1);
`;
export const ChartSettingsScalesTabItemStyled = styled(ButtonsRadioGroup).withConfig({ displayName: "ChartSettingsScalesTabItemStyled" }) `
	margin-left: var(--spacer-6);
	${ButtonsRadioGroupButtonStyled} {
		margin: 0;
	}
`;
export const ChartSettingsTabScalesArrowStyled = styled.div.withConfig({ displayName: "ChartSettingsTabScalesArrowStyled" }) `
	width: 20px;
	height: 20px;
	color: var(--icon-secondary-default-bg);
`;
export const ChartFormFieldsetGroupItemGeneral = styled(ChartSettingsFieldsetGroupItem).withConfig({ displayName: "ChartFormFieldsetGroupItemGeneral" }) `
	${CheckboxContainerStyled} {
		width: 100%;
		outline: 1px solid transparent;
		background-color: transparent;

		&:focus {
			box-shadow: none;
		}
	}

	${CheckboxViewStyled} {
		border: none;
		width: 100%;
		height: 100%;
	}

	${CheckboxIconStyled} {
		width: 100%;
		height: 100%;
	}

	${props => props.keyboardModeEnabled &&
    `&:focus-within {
		border-radius: 4px;
    	box-shadow: 0 0 0 1px var(--button-primary-default);
	}`}
`;
export const ChartSettingsTabScalesFieldsetGroupItem = styled(ChartFormFieldsetGroupItemGeneral).withConfig({ displayName: "ChartSettingsTabScalesFieldsetGroupItem" }) `
	&:hover {
		background-color: var(--dropdown-hovered-bg);
		border-radius: var(--spacer-1);
	}
`;
export const ChartSettingsTabScalesLinesAndlabelsItemStyled = styled(ChartFormFieldsetGroupItemGeneral).withConfig({ displayName: "ChartSettingsTabScalesLinesAndlabelsItemStyled" }) `
	margin-bottom: 0;
	display: flex;
	justify-content: space-between;
	position: relative;

	&:hover {
		cursor: pointer;
		background: var(--dropdown-hovered-bg);
		border-radius: var(--spacer-1);
	}
	&:focus-within {
		box-shadow: none;
	}

	// this transparent rectangle is needed to avoid closing popover
	// after hovering anchor icon and moving it to popover's content
	&::before {
		position: absolute;
		content: '';
		display: block;
		top: -4px;
		left: -4px;
		bottom: -4px;
		right: -4px;
		background: transparent;
	}
`;
export const ChartSettingsTabScalesMenuItemStyled = styled(MenuItem).withConfig({ displayName: "ChartSettingsTabScalesMenuItemStyled" }) `
	margin: 0;
	${props => props.disabled &&
    css `
			:hover {
				background: var(--dropdown-default-bg);
			}
			color: var(--button-secondary-disabled-text);
		`}
`;
export const ChartSettingsFitField = styled(ChartSettingsField).withConfig({ displayName: "ChartSettingsFitField" }) `
	${props => props.disabledStyles &&
    css `
			color: var(--dropdown-list_item-disabled-text);
			${CheckboxIconStyled} {
				opacity: 0;
			}
		`}
`;
