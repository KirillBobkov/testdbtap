import styled from 'styled-components';
import { ButtonIcon } from '../../../chart-kit/Button/ButtonIcon.component';
export const DraggableAxis = styled.div.withConfig({ displayName: "DraggableAxis" }) `
	position: absolute;
	width: 0;
	height: ${props => props.canvasHeight}px;
	top: 0;
	left: 0;
`;
export const ResizerChildrenContainerStyled = styled.div.attrs(props => ({
    style: {
        height: `${props.canvasHeight}px`,
        backgroundColor: props.showHighlight ? 'var(--dragging_area-bg)' : 'transparent',
        // 'none' is needed to pass hover/click events on chart
        pointerEvents: props.showHighlight ? 'all' : 'none',
    },
})).withConfig({ displayName: "ResizerChildrenContainerStyled" }) `
	position: absolute;
	top: 0;
	right: 0;
`;
export const ResizerContainerStyled = styled.div.attrs(props => ({
    style: {
        right: `${props.right}px`,
    },
})).withConfig({ displayName: "ResizerContainerStyled" }) `
	position: absolute;
	top: 8px;
	z-index: 5;
`;
export const ResizerStyled = styled(ButtonIcon).withConfig({ displayName: "ResizerStyled" }) `
	min-width: 29px;
	width: 29px;
	height: 11px;
	border-radius: 3px;
	border: 1px solid var(--dragging_slider-border-default-bg);
	stroke: var(--icon-secondary-default-bg);
	background: var(--dragging_slider-default-bg);
	pointer-events: all;
	&:hover,
	&:active,
	&:disabled {
		background: var(--dragging_slider-hovered-bg);
	}
	&:active {
		stroke: var(--dragging_slider-border-hovered-bg);
		border: 1px solid var(--dragging_slider-border-hovered-bg);
	}
	&:hover {
		border: 1px solid var(--dragging_slider-border-hovered-bg);
		stroke: var(--dragging_slider-border-hovered-bg);
	}
`;
