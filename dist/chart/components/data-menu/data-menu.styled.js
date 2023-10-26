import styled from 'styled-components';
import { RightClickPopoverMenuItemStyled } from '../right-click-menu/right-click-menu.styled';
import { ChartSettingsFieldStyled } from '../chart-settings/chart-settings-chart-type-colors/chart-settings-chart-type-colors-item.styled';
import { ButtonStyled } from '../../../chart-kit/Button/Button.styled';
import { IconWrapperStyled } from '../../../chart-kit/IconWrapper/IconWrapper.styled';
export const DataMenuColorPickerMenuItemStyled = styled(RightClickPopoverMenuItemStyled).withConfig({ displayName: "DataMenuColorPickerMenuItemStyled" }) `
	padding: var(--spacer-1);
`;
export const DataMenuColorPickerSettingsField = styled(ChartSettingsFieldStyled).withConfig({ displayName: "DataMenuColorPickerSettingsField" }) `
	margin-right: var(--spacer-05);

	${IconWrapperStyled} {
		background-color: var(--dropdown-default-bg);
		border-radius: 100%;
	}

	${ButtonStyled} {
		outline: 1px solid transparent;
		background-color: transparent;

		&:focus {
			box-shadow: none;
		}
	}
`;
