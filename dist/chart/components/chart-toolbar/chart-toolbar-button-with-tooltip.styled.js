import styled, { css } from 'styled-components';
import { ButtonIcon } from '../../../chart-kit/Button/ButtonIcon.component';
import { Popover } from '../../../chart-kit/Popover/Popover.lazy-component';
import { PopoverContentStyled } from '../../../chart-kit/Popover/Popover.styled';
export const ToolbarButtonStyled = styled(ButtonIcon).withConfig({ displayName: "ToolbarButtonStyled" }) `
	border-radius: var(--spacer-1);
	min-width: 24px;
	width: auto;
	height: 24px;
	color: var(--icon-primary-default-bg);
	background-color: var(--main_chart-bg);
	margin-right: var(--spacer-1);
	padding: 0;

	&:hover {
		background-color: var(--dropdown-list_item-hovered-bg);
	}

	&:disabled,
	&[disabled] {
		color: var(--icon-disabled-default-bg);
		background-color: var(--main_chart-bg);
	}

	//define gaps between button groups here
	&:nth-child(2),
	:nth-child(5),
	:nth-child(9),
	:nth-child(10) {
		margin-right: var(--spacer-4);
	}

	${props => props.isActive &&
    css `
			background-color: var(--dropdown-list_item-hovered-bg);
		`}
`;
export const ToolbarButtonTooltipStyled = styled(Popover).withConfig({ displayName: "ToolbarButtonTooltipStyled" }) `
	border-radius: var(--spacer-1);
	border: none;
	top: 5px;
	font-family: var(--font-main-semibold);

	${PopoverContentStyled} {
		padding: var(--spacer-1) var(--spacer-2);
		line-height: var(--line-height-m);
	}
`;
