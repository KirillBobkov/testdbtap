import styled from 'styled-components';
import { OrderContainerInnerStyled, OrderContainerStyled } from './components/order.styled';
import { OrderAltContainerStyled } from './components/order-alt.styled';
const FakeOrderStyled = styled(OrderContainerInnerStyled).withConfig({ displayName: "FakeOrderStyled" }) `
	height: 2px;
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	border-top: none;
	border-top-right-radius: 0;
	border-top-left-radius: 0;
`;
export const GroupOrderFakeOrder = styled(FakeOrderStyled).withConfig({ displayName: "GroupOrderFakeOrder" }) `
	width: 95%;
	top: 19px;
`;
export const GroupOrderFakeOrder2nd = styled(FakeOrderStyled).withConfig({ displayName: "GroupOrderFakeOrder2nd" }) `
	width: 91%;
	top: 21px;
`;
export const GroupOrderContainer = styled.div.attrs(props => ({
    style: {
        transform: `translateY(${props.y}px)`,
        zIndex: props.disabled ? 1 : props.opened ? 3 : 2,
    },
})).withConfig({ displayName: "GroupOrderContainer" }) `
	position: absolute;
	top: 0;
	right: 0;
	height: 19px;
	display: flex;
	justify-content: flex-end;
	pointer-events: all;

	${OrderContainerStyled} {
		position: relative;
		right: unset;
	}

	:hover {
		${OrderContainerInnerStyled} {
			opacity: 1;
		}
	}
`;
export const GroupOrderGroupContainer = styled.div.withConfig({ displayName: "GroupOrderGroupContainer" }) `
	position: relative;
	border-radius: 3px;
	box-sizing: border-box;
	border: 1px solid var(--order-border-default-bg);
	background-color: var(--order-default-bg);

	${OrderAltContainerStyled}:first-of-type {
		border-top-left-radius: 3px;
		border-top-right-radius: 3px;
	}

	${OrderAltContainerStyled}:last-of-type {
		border-bottom-left-radius: 3px;
		border-bottom-right-radius: 3px;
	}
`;
export const DraggableInner = styled.div.withConfig({ displayName: "DraggableInner" }) `
	position: absolute;
	top: 0;
	right: 0;
	display: flex;
	justify-content: flex-end;
	pointer-events: all;
	z-index: ${props => (props.disabled ? 1 : 2)};
`;
