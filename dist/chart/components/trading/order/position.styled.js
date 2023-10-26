import styled from 'styled-components';
import { Order } from './components/order.component';
import { BuyOrderLabelStyled, SellOrderLabelStyled } from './components/side.styled';
import { CloseOrderButtonStyled } from './components/close-order-button.styled';
import { OrderDelimiterStyled, OrderContainerInnerStyled } from './components/order.styled';
import { OrderSectionAltStyled } from './components/order-alt.styled';
import { OrderSLTPShortcutSectionStyled } from './regular-order.styled';
export const PositionContainerStyled = styled.div.attrs(props => ({
    style: {
        transform: `translate(0px, ${props.yCoord}px)`,
        zIndex: props.disabled ? 1 : 2,
    },
})).withConfig({ displayName: "PositionContainerStyled" }) `
	position: absolute;
	top: 0;
	right: 0;
	display: flex;
	justify-content: flex-end;
	pointer-events: all;
`;
export const PositionStyled = styled(Order).withConfig({ displayName: "PositionStyled" }) `
	${OrderContainerInnerStyled} {
		background-color: ${props => props.positive ? `var(--position_positive-default-bg)` : `var(--position_negative-default-bg)`};
		border: ${props => props.positive
    ? `1px solid var(--position_positive-default-bg)`
    : `1px solid var(--position_negative-default-bg)`};
	}
	cursor: pointer;

	${SellOrderLabelStyled},
	${BuyOrderLabelStyled} {
		color: var(--icon-primary-default-bg);
	}

	${CloseOrderButtonStyled} {
		color: var(--position-icon-default-bg);
		opacity: 0.5;
		transition: opacity 200ms ease-out, color 200ms ease-out;

		:hover {
			color: var(--position-icon-hover-bg);
			opacity: 0.8;
		}
	}

	${OrderSLTPShortcutSectionStyled} {
		color: var(--dropdown-list_item-default-text);
	}
`;
export const PositionSectionDelimiter = styled(OrderDelimiterStyled).attrs(props => ({
    backgroundColor: props.positive ? `var(--position_positive-divider-bg)` : `var(--position_negative-divider-bg)`,
})).withConfig({ displayName: "PositionSectionDelimiter" }) ``;
export const PositionSectionAltStyled = styled(OrderSectionAltStyled).attrs(props => ({
    color: props.positive ? `var(--position_positive-default-bg)` : `var(--main_chart-candle-bear-body-bg)`,
})).withConfig({ displayName: "PositionSectionAltStyled" }) `
	overflow: hidden;
	white-space: nowrap;
`;
