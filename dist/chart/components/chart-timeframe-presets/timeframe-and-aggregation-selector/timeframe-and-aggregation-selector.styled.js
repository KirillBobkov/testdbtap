import styled from 'styled-components';
import { PopoverContentStyled } from '../../../../chart-kit/Popover/Popover.styled';
import { Popover } from '../../../../chart-kit/Popover/Popover.lazy-component';
import { ToolbarButtonStyled } from '../../chart-toolbar/chart-toolbar-button-with-tooltip.styled';
import { Button } from '../../../../chart-kit/Button/Button.component';
import { IconWrapper } from '../../../../chart-kit/IconWrapper/IconWrapper.component';
import { StyledScrollableContainer } from '../../../../chart-kit/Scrollable/Scrollable.styled';
export const TimeframeAggregationSelectorPopover = styled(Popover).withConfig({ displayName: "TimeframeAggregationSelectorPopover" }) `
	${PopoverContentStyled} {
		padding: var(--spacer-2);
		display: flex;
		flex-direction: column;
	}

	${StyledScrollableContainer} {
		overflow: visible;
	}
`;
export const TimeframeAggregationSelectorContainer = styled.div.withConfig({ displayName: "TimeframeAggregationSelectorContainer" }) `
	display: flex;
	flex-direction: column;
`;
export const RangeSliderWrapper = styled.div.withConfig({ displayName: "RangeSliderWrapper" }) `
	&:last-of-type {
		margin-top: var(--spacer-4);
	}
	margin-bottom: var(--spacer-4);
	display: flex;
	flex-direction: column;
`;
export const RangeSliderInfo = styled.div.withConfig({ displayName: "RangeSliderInfo" }) `
	display: flex;
	justify-content: space-between;
	margin-bottom: var(--spacer-3);
`;
export const RangeSliderTitle = styled.span.withConfig({ displayName: "RangeSliderTitle" }) `
	line-height: var(--line-height-m-px);
`;
export const RangeSliderValue = styled.span.withConfig({ displayName: "RangeSliderValue" }) `
	line-height: var(--line-height-m-px);
`;
export const TimeframeAggregationSelectorAnchorStyled = styled(ToolbarButtonStyled).withConfig({ displayName: "TimeframeAggregationSelectorAnchorStyled" }) `
	color: var(--main_chart-value-text);
	margin-right: 0 !important;
`;
export const TimeframeAggregationSelectorSaveButton = styled(Button).withConfig({ displayName: "TimeframeAggregationSelectorSaveButton" }) `
	max-width: 27px;
	height: auto;
	text-align: right;
	color: var(--dropdown-list_item-selected-text);
	align-self: end;
	text-align: right;
	min-width: 0;
	padding: 0;
	margin-top: calc(var(--spacer-05) * 5);

	&:focus-visible {
		outline-offset: 2px;
		border-radius: 4px;
	}

	&:hover {
		color: var(--dropdown-list_item-selected-text);
	}
`;
export const AddingButtonActiveIconWrapper = styled(IconWrapper).withConfig({ displayName: "AddingButtonActiveIconWrapper" }) `
	color: var(--icon-primary-default-bg);
`;
