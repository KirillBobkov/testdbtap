import styled from 'styled-components';
import { css } from 'styled-components';
import { Input } from '../../../../chart-kit/Input/Input.component';
import { InputStyled } from '../../../../chart-kit/Input/Input.styled';
import { Button } from '../../../../chart-kit/Button/Button.component';
export const OrderEntryInputContainerStyled = styled.div.withConfig({ displayName: "OrderEntryInputContainerStyled" }) `
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-radius: 10px;
	padding: 2px;
`;
export const OrderQuantityComponentStyled = styled.div.withConfig({ displayName: "OrderQuantityComponentStyled" }) `
	color: var(--dropdown-list_item-default-text);
	display: flex;
	align-items: center;
	background-color: var(--dropdown-default-bg);
`;
export const OrderEntryQuantityInputStyled = styled(Input).withConfig({ displayName: "OrderEntryQuantityInputStyled" }) `
	height: 24px;
	width: 100%;
	border: none;
	background-color: var(--dropdown-default-bg);
	padding: 0;
	border-radius: 3px;

	&:hover {
		background-color: var(--dropdown-default-bg);
	}

	${InputStyled} {
		&:placeholder-shown {
			text-align: right;
		}
		width: 100%;
		text-align: center;
		-moz-appearance: textfield;
		text-overflow: unset;
		::-webkit-outer-spin-button,
		::-webkit-inner-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}
	}
`;
const OrderEntrySideBtn = styled(Button).withConfig({ displayName: "OrderEntrySideBtn" }) `
	height: 24px;
	padding: 0 13px;
	overflow: hidden;
	min-width: fit-content;
	white-space: nowrap;
`;
const BuyColorsMixin = css `
	background-color: var(--button-buy-default-bg);
	color: var(--button-buy-default-color);
	:hover,
	:active {
		background-color: var(--button-buy-hovered-bg);
	}
`;
const SellColorsMixin = css `
	background-color: var(--button-sell-default-bg);
	color: var(--button-sell-default-color);
	:hover,
	:active {
		background-color: var(--button-sell-hovered-bg);
	}
`;
const OERightBtn = styled(OrderEntrySideBtn).withConfig({ displayName: "OERightBtn" }) `
	border-radius: 0 15px 15px 0;
`;
const OELeftBtn = styled(OrderEntrySideBtn).withConfig({ displayName: "OELeftBtn" }) `
	border-radius: 15px 0 0 15px;
`;
export const OrderEntryRightBuy = styled(OERightBtn).withConfig({ displayName: "OrderEntryRightBuy" }) `
	${BuyColorsMixin}
`;
export const OrderEntryLeftBuy = styled(OELeftBtn).withConfig({ displayName: "OrderEntryLeftBuy" }) `
	${BuyColorsMixin}
`;
export const OrderEntryRightSell = styled(OERightBtn).withConfig({ displayName: "OrderEntryRightSell" }) `
	${SellColorsMixin}
`;
export const OrderEntryLeftSell = styled(OELeftBtn).withConfig({ displayName: "OrderEntryLeftSell" }) `
	${SellColorsMixin}
`;
export const CounterSymbol = styled.span.withConfig({ displayName: "CounterSymbol" }) `
	padding: 0 9px;
	cursor: pointer;
	user-select: none;
	color: var(--icon-secondary-default-bg);
	:hover {
		color: var(--icon-primary-default-bg);
	}
`;
