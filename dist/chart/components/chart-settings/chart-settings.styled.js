import styled, { css } from 'styled-components';
import { PopoverContentStyled } from '../../../chart-kit/Popover/Popover.styled';
import { Popover } from '../../../chart-kit/Popover/Popover.lazy-component';
export const ChartSettingsPopoverStyled = styled(Popover).withConfig({ displayName: "ChartSettingsPopoverStyled" }) `
	${PopoverContentStyled} {
		overflow: hidden;
		// don't do initial resize animation when popover is being opened
		height: ${props => (props.popoverMeasurements.height > 0 ? `${props.popoverMeasurements.height}px` : 'auto')};
		max-height: ${props => props.popoverMeasurements.height > 0 ? `${props.popoverMeasurements.height}px` : 'auto'};
		min-width: ${props => props.popoverMeasurements.width}px;
		transition: height 250ms, max-height 250ms, width 250ms;
		&:after {
			content: '';
			min-width: 1px;
			background-color: var(--dropdown-list_item-divider-bg);
			position: absolute;
			top: 0;
			height: inherit;
			left: ${props => `${props.dividerOffset}px`};
		}
	}
`;
export const ChartSettingsContainer = styled.div.withConfig({ displayName: "ChartSettingsContainer" }) `
	display: flex;
	user-select: none;
	width: 325px;
	overflow-x: hidden;
`;
export const ChartSettingsTabsStyled = styled.div.withConfig({ displayName: "ChartSettingsTabsStyled" }) `
	padding: var(--spacer-1);
`;
export const ChartSettingsTabContentStyled = styled.div.withConfig({ displayName: "ChartSettingsTabContentStyled" }) `
	padding: var(--spacer-1);
	width: 100%;
`;
export const ChartSettingsTabButtonStyled = styled.button.withConfig({ displayName: "ChartSettingsTabButtonStyled" }) `
	padding: var(--spacer-1);
	margin-bottom: var(--spacer-1);
	height: 24px;
	position: relative;
	cursor: pointer;
	background: none;
	border: none;
	font-family: var(--font-main-semibold);
	font-size: var(--font-size-m);
	line-height: var(--line-height-m);
	color: var(--dropdown-list_item-default-text);
	min-width: 93px;
	width: 100%;
	border-radius: 4px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	box-sizing: border-box;
	transform-origin: top center;
	transition: color 220ms ease-in;
	display: flex;
	justify-content: space-between;
	flex: 0 0 100%;

	&:hover {
		background: none;
	}

	&:focus-visible {
		outline: 1px solid var(--button-focus-border);
	}

	${props => props.isActive &&
    css `
			${ChartSettingsTabItemIconStyled},
			${ChartSettingsTabItemLabelStyled} {
				color: var(--dropdown-list_item-selected-text);
			}
		`}
`;
export const ChartSettingsTabItemIconStyled = styled.div.withConfig({ displayName: "ChartSettingsTabItemIconStyled" }) `
	width: 16px;
	height: 16px;
	margin: -2px var(--spacer-1) -2px 0;
	color: var(--icon-secondary-default-bg);

	svg {
		width: 16px;
		height: 16px;
	}
`;
export const ChartSettingsTabItemLabelStyled = styled.div.withConfig({ displayName: "ChartSettingsTabItemLabelStyled" }) `
	color: var(--dropdown-list_item-default-text);
	font-size: var(--font-size-m);
	line-height: var(--line-height-s-px);
	user-select: none;
	-moz-user-select: none;
	flex-grow: 2;
	font-family: var(--font-main-semibold);
	text-align: left;
`;
export const ChartSettingsTabItemContainerStyled = styled.div.withConfig({ displayName: "ChartSettingsTabItemContainerStyled" }) `
	display: flex;
	align-items: center;
	width: 100%;
`;
export const ChartSettingsTabContainer = styled.div.withConfig({ displayName: "ChartSettingsTabContainer" }) `
	height: 100%;
	display: flex;
	flex-direction: column;
`;
