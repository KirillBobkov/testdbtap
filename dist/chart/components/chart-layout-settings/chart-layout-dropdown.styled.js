import styled, { css } from 'styled-components';
import { CustomInputMenuItem } from '../../../chart-kit/CustomInputMenuItem/CustomInputMenuItem.component';
import { MenuItem } from '../../../chart-kit/Menu/MenuItem.component';
import { MenuItemActionButton } from '../../../chart-kit/Menu/action-button/MenuItemActionButton.component';
import { MenuItemActionButtonStyled } from '../../../chart-kit/Menu/action-button/MenuItemActionButton.styled';
export const ChartLayoutMenuItemContainer = styled.div.withConfig({ displayName: "ChartLayoutMenuItemContainer" }) `
	display: flex;
	align-items: center;
	justify-content: space-between;
`;
export const ChartLayoutItemText = styled.div.withConfig({ displayName: "ChartLayoutItemText" }) `
	position: relative;
	font-size: var(--font-size-m);
	font-family: var(--font-main-semibold);
	user-select: none;
	align-items: center;
	max-width: 110px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;
export const ChartLayoutItemContent = styled.div.withConfig({ displayName: "ChartLayoutItemContent" }) `
	display: flex;
	max-width: unset;
	width: 100%;
`;
export const ChartLayoutItemLastUpdate = styled.span.withConfig({ displayName: "ChartLayoutItemLastUpdate" }) `
	color: var(--dropdown-list_item-disabled-text);
	position: absolute;
	right: 5px;
	transform: translateX(12px);
	padding-right: var(--spacer-2);
	font-size: var(--font-size-m);
	font-family: var(--font-main-semibold);
`;
export const ChartLayoutDeleteButton = styled(MenuItemActionButton).withConfig({ displayName: "ChartLayoutDeleteButton" }) `
	position: absolute;
	right: 12px;
	margin-left: 7px;
	transform: translateX(12px);

	&:hover svg path,
	&:focus svg path {
		fill: var(--main_chart-candle-bear-body-bg);
	}
`;
export const ChartLayoutEditButton = styled(MenuItemActionButton).withConfig({ displayName: "ChartLayoutEditButton" }) `
	position: absolute;
	right: 32px;
	margin-left: auto;
	transform: translateX(12px);
`;
export const ChartLayoutMenuItem = styled(MenuItem).withConfig({ displayName: "ChartLayoutMenuItem" }) `
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-family: var(--font-main);
	border-radius: var(--spacer-1);
	padding: var(--spacer-1) var(--spacer-2) var(--spacer-1) var(--spacer-1);

	&:focus {
		${props => props.keyboardModeEnabled &&
    css `
				${ChartLayoutItemLastUpdate} {
					display: none;
				}
				${MenuItemActionButtonStyled} {
					display: flex;
				}
			`}
	}

	& > div {
		max-width: 90px;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	${ChartLayoutItemText} {
		color: ${props => props.isActive && 'var(--dropdown-list_item-selected-text)'};
	}
`;
export const ChartLayoutCustomInputMenuItem = styled(CustomInputMenuItem).withConfig({ displayName: "ChartLayoutCustomInputMenuItem" }) `
	min-width: 180px;
	max-width: 180px;
`;
