import styled from 'styled-components';
import { Popover } from '../../../../chart-kit/Popover/Popover.lazy-component';
import { ChartSettingsFieldsetGroupItem } from '../../chart-settings/chart-settings-fieldset.styled';
import { RightClickPopoverMenuItemLabelStyled } from '../../right-click-menu/right-click-menu.styled';
export const BackgroundMenuPopoverAnchor = styled.div.withConfig({ displayName: "BackgroundMenuPopoverAnchor" }) `
	position: absolute;
	right: 0;
`;
export const BackgroundMenuPopoverContainerStyled = styled.div.withConfig({ displayName: "BackgroundMenuPopoverContainerStyled" }) `
	padding: var(--spacer-1);
`;
export const BackgroundMenuPopoverStyled = styled(Popover).withConfig({ displayName: "BackgroundMenuPopoverStyled" }) `
	margin-top: var(--spacer-1);
	margin-left: -8px;
	${ChartSettingsFieldsetGroupItem} {
		margin-bottom: 0;
		padding: var(--spacer-05) var(--spacer-05);
		user-select: none;
	}
`;
export const BGMenuNoRecentDrawingsLabel = styled(RightClickPopoverMenuItemLabelStyled).withConfig({ displayName: "BGMenuNoRecentDrawingsLabel" }) `
	min-height: 20px;
	line-height: 20px;
`;
