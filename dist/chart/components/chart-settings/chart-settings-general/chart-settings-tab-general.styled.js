import { CheckboxContainerStyled, CheckboxIconStyled, CheckboxViewStyled, } from '../../../../chart-kit/Checkbox/Checkbox.styled';
import styled, { css } from 'styled-components';
import { ChartSettingsFieldsetGroupItem } from '../chart-settings-fieldset.styled';
import { SelectboxAnchor } from '../../../../chart-kit/Selectbox/SelectboxAnchor.component';
import { SelectboxAnchorCaretStyled, SelectboxAnchorContentStyled, } from '../../../../chart-kit/Selectbox/SelectboxAnchor.styled';
import { DropdownMenuItem } from '../../../../chart-kit/Menu/dropdown-menu/DropdownMenuItem.component';
import { DropdownMenuItemLabelStyled } from '../../../../chart-kit/Menu/dropdown-menu/DropdownMenuItem.styled';
import { DropdownMenuSecondaryStyled } from '../../../../chart-kit/Menu/dropdown-menu/DropdownMenuSecondary.styled';
import { Selectbox } from '../../../../chart-kit/Selectbox/Selectbox.component';
import { Button } from '../../../../chart-kit/Button/Button.component';
import { Popover } from '../../../../chart-kit/Popover/Popover.lazy-component';
export const ChartSettingsTabGeneralItemStyled = styled(ChartSettingsFieldsetGroupItem).withConfig({ displayName: "ChartSettingsTabGeneralItemStyled" }) `
	&:hover {
		background-color: var(--dropdown-hovered-bg);
		border-radius: var(--spacer-1);
	}

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
export const ChartSettingsTabGeneralItemLineStyled = styled(ChartSettingsTabGeneralItemStyled).withConfig({ displayName: "ChartSettingsTabGeneralItemLineStyled" }) `
	display: flex;
	margin-left: var(--spacer-6);
	&:hover {
		background-color: var(--dropdown-default-bg);
	}
`;
export const ChartSettingsTabAdaptivePopoverStyled = styled(Popover).withConfig({ displayName: "ChartSettingsTabAdaptivePopoverStyled" }) `
	margin-top: 0;
`;
export const ChartSettingsTabCrosshairAnchorStyled = styled(SelectboxAnchor).withConfig({ displayName: "ChartSettingsTabCrosshairAnchorStyled" }) `
	padding: 0;
	padding-right: var(--spacer-3);
	height: 16px;
	box-sizing: border-box;
	border-radius: 4px;
	background: transparent;
	&:after {
		border: none;
	}
	&:hover {
		background: none;
	}

	${SelectboxAnchorContentStyled} {
		text-align: left;
		font-size: var(--font-size-m);
		line-height: var(--line-height-m);
		color: var(--dropdown-list_item-selected-text);
		font-family: var(--font-main-semibold);
	}

	${SelectboxAnchorCaretStyled} {
		width: 20px;
		height: 20px;
	}

	${SelectboxAnchorCaretStyled} {
		box-sizing: border-box;
		position: absolute;
		left: calc(100% - 4px);
		top: 0;
		transform-origin: 10px 9px 0px;
		transition: transform ease 0.4s;
		display: flex;
		align-items: center;
		justify-content: center;
		${props => props.isOpened &&
    css `
				transform: rotate(180deg);
			`}
	}
`;
export const ChartSettingsTabCrosshairDropdownMenuItemStyled = styled(DropdownMenuItem).withConfig({ displayName: "ChartSettingsTabCrosshairDropdownMenuItemStyled" }) `
	padding: var(--spacer-1);
	width: 100%;
	box-sizing: border-box;
	min-width: 0;
	color: var(--dropdown-list_item-default-text);

	${DropdownMenuItemLabelStyled} {
		font-family: var(--font-main-semibold);
		font-size: var(--font-size-m);
		line-height: var(--line-height-m);
	}
`;
export const ChartSettingsTabCrosshairDropdownMenuStyled = styled(DropdownMenuSecondaryStyled).withConfig({ displayName: "ChartSettingsTabCrosshairDropdownMenuStyled" }) `
	width: 80px;
	box-sizing: border-box;
	padding: var(--spacer-1);
`;
export const ChartSettingsTabMenuSelectboxStyled = styled(Selectbox).withConfig({ displayName: "ChartSettingsTabMenuSelectboxStyled" }) `
	margin-left: var(--spacer-1);
	&:hover {
		background-color: var(--dropdown-hovered-bg);
	}
`;
export const ChartSettingsTabCrosshairContainerStyled = styled.div.withConfig({ displayName: "ChartSettingsTabCrosshairContainerStyled" }) `
	display: flex;
	align-items: center;
`;
export const ChartSettingsTabPriceTypeContainerStyled = styled(ChartSettingsTabGeneralItemStyled).withConfig({ displayName: "ChartSettingsTabPriceTypeContainerStyled" }) `
	display: flex;
	align-items: center;
	margin-left: var(--spacer-6);

	&:hover {
		background-color: var(--dropdown-default-bg);
	}
`;
export const ChartSettingsTabDivider = styled.hr.withConfig({ displayName: "ChartSettingsTabDivider" }) `
	margin: var(--spacer-0);
	height: 1px;
	border: none;
	background-color: var(--dropdown-list_item-divider-bg);
	visibility: ${props => props.visible ? `visible` : `hidden`};
`;
export const ChartSettingsResetButton = styled(Button).withConfig({ displayName: "ChartSettingsResetButton" }) `
	height: 24px;
	padding: var(--spacer-1);
	font-family: var(--font-main-semibold);
	font-size: var(--font-size-m);
	line-height: var(--line-height-m);
	color: var(--link-default-text);
	margin-top: var(--spacer-3);

	border: 1px solid transparent;

	&:focus {
		border-color: var(--button-focus-border);
	}
`;
export const ChartSettingsTabForm = styled.form.withConfig({ displayName: "ChartSettingsTabForm" }) ``;
