import styled from 'styled-components';
import { CounterSymbol, OrderEntryLeftBuy, OrderEntryQuantityInputStyled, OrderEntryRightSell, OrderQuantityComponentStyled, } from './order-entry-input.styled';
import { OrderEntryInput } from './order-entry-input.component';
export const OrderEntryLegendInput = styled(OrderEntryInput).withConfig({ displayName: "OrderEntryLegendInput" }) `
	gap: var(--spacer-1);

	${OrderEntryLeftBuy} {
		height: 20px;
		border-radius: 10px;
	}

	${OrderEntryRightSell} {
		height: 20px;
		border-radius: 10px;
	}

	${OrderQuantityComponentStyled} {
		gap: var(--spacer-1);
		background-color: transparent;
	}

	${OrderEntryQuantityInputStyled} {
		font-size: var(--font-size-m);
		line-height: var(--line-height-m-px);
		background-color: transparent;
	}

	${CounterSymbol} {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		padding: 0 var(--spacer-1);
		line-height: var(--line-height-l-px);
		vertical-align: middle;
		text-align: center;
		background-color: var(--dropdown-default-bg);
	}
`;
