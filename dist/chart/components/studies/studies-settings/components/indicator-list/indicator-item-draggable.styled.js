import styled, { css } from 'styled-components';
export const IndicatorItemDraggableContentStyled = styled.li.withConfig({ displayName: "IndicatorItemDraggableContentStyled" }) `
	display: flex;
	align-items: center;
	flex-grow: 1;
	height: 32px;
	font-size: var(--font-size-l);
	white-space: nowrap;
	min-width: 0;
	border-radius: 6px;
	justify-content: space-between;
	color: var(--dropdown-list_item-default-text);
	line-height: 2.17;
	position: relative;
	outline: 1px solid transparent;

	// kill inline colors, but it's not worked with variables
	${props => props.isDragging
    ? css `
					color: #ffaa00;
					border-radius: 6px;
					outline: 1px solid #ffaa00;
					background: rgba(255, 255, 255, 0.06);
					svg * {
						fill: #ffaa00;
					}
			  `
    : css `
					${props.allowTransform === false && 'transform: none !important;'}
			  `}

	&:hover {
		background-color: var(--dropdown-list_item-hovered-bg);
	}

	:focus-visible {
		outline: 1px solid var(--button-focus-border);
		outline-offset: -1px;
	}
	:focus {
		outline: 1px solid var(--button-focus-border);
	}
`;
