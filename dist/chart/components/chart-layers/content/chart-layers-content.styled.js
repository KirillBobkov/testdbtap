import styled, { css } from 'styled-components';
import { Accordion } from '../../../../chart-kit/Accordion/Accordion.component';
import { AccordionWrapperContainerStyled, } from '../../../../chart-kit/Accordion/Accordion.styled';
export const ChartLayerContentWrapper = styled.div.withConfig({ displayName: "ChartLayerContentWrapper" }) ``;
export const ChartLayersBodyStyled = styled.div.withConfig({ displayName: "ChartLayersBodyStyled" }) `
	--chart-layers-header-height: 39px;
	--chart-layers-footer-height: 37px;
	--chart-layers-popover-height: 400px;

	display: flex;
	flex-direction: column;

	&:focus-visible {
		outline: none;
	}

	${props => props.isFooterVisible &&
    css `
			${ChartLayersItemListStyled} {
				min-height: 325px;
				max-height: calc(
					var(--chart-layers-popover-height) - var(--chart-layers-header-height) -
						var(--chart-layers-footer-height)
				);
			}
		`}
`;
export const ChartLayersAccordionStyled = styled(Accordion).withConfig({ displayName: "ChartLayersAccordionStyled" }) `
	${AccordionWrapperContainerStyled} {
		max-height: 24px;
		transition: background-color 150ms ease-out;
		&:hover {
			background-color: var(--dropdown-list_item-divider-bg);
			border-radius: 4px;
		}
	}

	${props => props.isSelected &&
    css `
			${AccordionWrapperContainerStyled} {
				background-color: var(--dropdown-list_item-hovered-bg);
				border-radius: 4px;
			}
		`}

	${props => props.isHidden &&
    css `
			${AccordionWrapperContainerStyled} {
				color: var(--dropdown-description-text);
			}
		`}
`;
export const ChartLayersItemListStyled = styled.div.withConfig({ displayName: "ChartLayersItemListStyled" }) `
	min-height: 361px;
	max-height: calc(var(--chart-layers-popover-height) - var(--chart-layers-header-height));
	padding: var(--spacer-1);
`;
export const ChartLayersContentDraggableItemWrapper = styled.div.withConfig({ displayName: "ChartLayersContentDraggableItemWrapper" }) `
	width: 100%;
	overflow: hidden;
`;
export const DroppableContainer = styled.div.withConfig({ displayName: "DroppableContainer" }) `
	div[data-rbd-draggable-context-id] {
		transition: 0.001s !important;
		transform: translate(0px, 0px) !important;
	}
`;
export const DraggableItemStyled = styled.div.withConfig({ displayName: "DraggableItemStyled" }) `
	color: #ffaa00; // overriding dragging item styles doesn't work with variables
	transition: all 0.001s !important;
`;
