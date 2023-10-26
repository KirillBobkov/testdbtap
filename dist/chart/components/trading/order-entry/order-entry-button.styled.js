import styled from 'styled-components';
const OrderEntryBtnStyled = styled.button.withConfig({ displayName: "OrderEntryBtnStyled" }) `
	display: flex;
	align-items: center;
	justify-content: center;
	outline: 1px solid transparent;
	user-select: none;
	border-radius: 50%;
	height: 18px;
	width: 18px;
	padding: 0;
	margin: 0;
	background-color: var(--order-close_button-default-bg);
	color: var(--icon-primary-default-bg);
	border: none;
	cursor: pointer;
	transition: background-color 200ms ease-out;

	:hover {
		background-color: var(--order-close_button-hover-bg);
	}
`;
export const OrderEntryAddBtnStyled = styled(OrderEntryBtnStyled).withConfig({ displayName: "OrderEntryAddBtnStyled" }) `
	svg,
	i {
		width: 10px;
		height: 10px;
	}
`;
export const OrderEntryCloseBtnStyled = styled(OrderEntryBtnStyled).withConfig({ displayName: "OrderEntryCloseBtnStyled" }) `
	svg,
	i {
		width: 8px;
		height: 8px;
	}
`;
