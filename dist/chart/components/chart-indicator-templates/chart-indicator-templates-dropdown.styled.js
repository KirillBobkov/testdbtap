import styled, { css } from 'styled-components';
import { PopoverContentStyled } from '../../../chart-kit/Popover/Popover.styled';
import { Popover } from '../../../chart-kit/Popover/Popover.lazy-component';
import { CustomInputMenuItem } from '../../../chart-kit/CustomInputMenuItem/CustomInputMenuItem.component';
import { MenuItem } from '../../../chart-kit/Menu/MenuItem.component';
import { MenuItemActionButton } from '../../../chart-kit/Menu/action-button/MenuItemActionButton.component';
import { MenuItemActionButtonStyled } from '../../../chart-kit/Menu/action-button/MenuItemActionButton.styled';
export const ChartIndicatorTemplateMenuItemStyled = styled(MenuItem).withConfig({ displayName: "ChartIndicatorTemplateMenuItemStyled" }) `
	align-items: center;

	&:focus {
		${props => props.keyboardModeEnabled &&
    css `
				border-radius: 4px;
				${MenuItemActionButtonStyled} {
					display: flex;
				}
			`}
	}
`;
export const ChartIndicatorTemplateMenuItemText = styled.span.withConfig({ displayName: "ChartIndicatorTemplateMenuItemText" }) `
	max-width: 110px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;
export const ChartIndicatorCustomInputMenuItemStyled = styled(CustomInputMenuItem).withConfig({ displayName: "ChartIndicatorCustomInputMenuItemStyled" }) `
	min-width: 154px;
`;
export const ChartIndicatorTemplatesPopoverStyled = styled(Popover).withConfig({ displayName: "ChartIndicatorTemplatesPopoverStyled" }) `
	width: 176px;
	${PopoverContentStyled}:not(:empty) {
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}
`;
export const ChartIndicatorTemplateDeleteButton = styled(MenuItemActionButton).withConfig({ displayName: "ChartIndicatorTemplateDeleteButton" }) `
	position: absolute;
	right: 12px;
	margin-left: 7px;
	transform: translateX(12px);

	&:hover svg path,
	&:focus svg path {
		fill: var(--main_chart-candle-bear-body-bg);
	}
`;
export const ChartIndicatorTemplateEditButton = styled(MenuItemActionButton).withConfig({ displayName: "ChartIndicatorTemplateEditButton" }) `
	position: absolute;
	right: 32px;
	margin-left: auto;
	transform: translateX(12px);
`;
