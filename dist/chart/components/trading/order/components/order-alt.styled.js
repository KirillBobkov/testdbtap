import styled from 'styled-components';
export const OrderAltContainerStyled = styled.div.withConfig({ displayName: "OrderAltContainerStyled" }) `
	position: relative;
	z-index: 20;
	width: 100%;
	box-sizing: border-box;
	height: 19px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: ${props => (props.selected ? `var(--dropdown-list_item-hovered-bg)` : `var(--order-default-bg)`)};
	color: var(--dropdown-list_item-default-text);
	font-family: var(--font-main-semibold);
	font-size: var(--font-size-m);
	line-height: 19px;
	user-select: none;
	cursor: ${props => (props.selected ? 'grab' : 'pointer')};
	transition: background-color 200ms ease-out;

	:hover {
		background-color: var(--dropdown-list_item-hovered-bg);
	}
`;
export const OrderAltChildrenContainerStyled = styled.div.withConfig({ displayName: "OrderAltChildrenContainerStyled" }) `
	flex-grow: 1;
	display: flex;
	align-items: center;
`;
export const OrderSectionAltStyled = styled.div.withConfig({ displayName: "OrderSectionAltStyled" }) `
	padding-right: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;
