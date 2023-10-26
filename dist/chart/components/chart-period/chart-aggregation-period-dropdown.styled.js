import styled, { css } from 'styled-components';
import { MenuItem } from '../../../chart-kit/Menu/MenuItem.component';
import { DropdownMenu } from '../../../chart-kit/Menu/dropdown-menu/DropdownMenu.styled';
import { MenuItemActionButton } from '../../../chart-kit/Menu/action-button/MenuItemActionButton.component';
import { Popover } from '../../../chart-kit/Popover/Popover.lazy-component';
import { IconStyled } from '../../../chart-kit/Button/ButtonIcon.styled';
export const adaptivePopoverStyles = {
    top: 3,
};
export const AggregationPeriodItemContent = styled.div.withConfig({ displayName: "AggregationPeriodItemContent" }) `
	user-select: none;
	font-size: var(--font-size-m);
	font-family: var(--font-main-semibold);
	color: ${props => props.active && 'var(--dropdown-list_item-selected-text)'};
`;
export const AggregationPeriodDeleteButton = styled(MenuItemActionButton).withConfig({ displayName: "AggregationPeriodDeleteButton" }) `
	position: absolute;
	right: 0;

	&:hover svg path,
	&:focus svg path {
		fill: var(--main_chart-candle-bear-body-bg);
	}
`;
export const AggregationMenuItem = styled(MenuItem).withConfig({ displayName: "AggregationMenuItem" }) `
	display: flex;
	align-items: center;
	border-radius: var(--spacer-1);

	${props => props.isMobile &&
    css `
			${IconStyled} {
				svg path {
					fill: var(--icon-secondary-default-bg);
				}
			}
		`}

	&:focus {
		${props => props.keyboardModeEnabled &&
    css `
				${AggregationPeriodDeleteButton} {
					display: flex;
				}
			`}
	}
`;
export const AggregationPeriodActions = styled.div.withConfig({ displayName: "AggregationPeriodActions" }) `
	display: flex;
	justify-content: center;
	align-items: center;
	height: 16px;
	width: 14px;
`;
export const AdaptivePopoverStyled = styled(Popover).withConfig({ displayName: "AdaptivePopoverStyled" }) `
	padding: 0;
	border: none;
	border-radius: 8px;
	box-shadow: 0 25px 30px rgba(0, 0, 0, 0.35);

	${DropdownMenu} {
		padding: var(--spacer-1);
		width: 120px;
	}
`;
