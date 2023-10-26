import styled from 'styled-components';
export const OrderContainerStyled = styled.div.withConfig({ displayName: "OrderContainerStyled" }) `
	width: fit-content;
	height: 19px;
	z-index: ${props => (props.disabled ? 1 : 2)};
`;
export const OrderContainerInnerStyled = styled.div.withConfig({ displayName: "OrderContainerInnerStyled" }) `
	width: fit-content;
	box-sizing: border-box;
	height: 19px;
	display: flex;
	align-items: center;
	border: ${props => props.selected ? `1px solid var(--order-border-selected-bg)` : `1px solid var(--order-border-default-bg)`};
	border-radius: 3px;
	background-color: ${props => (props.selected ? `var(--order-selected-bg)` : `var(--order-default-bg)`)};
	color: var(--dropdown-list_item-default-text);
	font-family: var(--font-main-semibold);
	font-size: var(--font-size-m);
	user-select: none;
	cursor: ${props => (props.selected ? 'grab' : 'pointer')};
	opacity: ${props => (props.disabled && !props.selected ? 0.4 : 1)};
	transition: opacity 200ms ease-out, background-color 200ms ease-out;
	:hover {
		opacity: 1;
	}
`;
export const OrderDelimiterStyled = styled.div.withConfig({ displayName: "OrderDelimiterStyled" }) `
	width: 1px;
	height: 19px;
	margin: ${props => (props.margin === 'left' ? '0 0 0 4px' : props.margin === 'right' ? '0 4px 0 0' : '0 4px')};
	background-color: var(--order-border-default-bg);
`;
export const OrderSectionStyled = styled.div.withConfig({ displayName: "OrderSectionStyled" }) `
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	white-space: nowrap;
`;
