import styled from 'styled-components';
import { OrderSectionStyled } from './components/order.styled';
import { Button } from '../../../../chart-kit/Button/Button.component';
import { OrderSectionAltStyled } from './components/order-alt.styled';
export const OrderSLTPShortcutSectionStyled = styled(OrderSectionStyled).withConfig({ displayName: "OrderSLTPShortcutSectionStyled" }) `
	color: var(--dropdown-description-text);
	font-size: 9px;
	transition: color 200ms ease-out;

	:hover {
		color: var(--dropdown-list_item-default-text);
	}
`;
export const OrderSLTPShortcutSectionAltStyled = styled(OrderSectionAltStyled).withConfig({ displayName: "OrderSLTPShortcutSectionAltStyled" }) `
	padding-left: 2px;
	color: var(--dropdown-description-text);
	font-size: 9px;
	transition: color 200ms ease-out;

	:hover {
		color: var(--dropdown-list_item-default-text);
	}
`;
export const AddSLTPOrderButtonStyled = styled(Button).withConfig({ displayName: "AddSLTPOrderButtonStyled" }) `
	display: flex;
	align-items: center;
	justify-content: center;
	width: 95px;
	height: 19px;
	border-radius: 19px;
	background-color: var(--order-button-default-bg);
	color: var(--dropdown-list_item-default-text);
	font-size: 10px;
	line-height: 19px;

	:hover {
		background-color: var(--order-button-hover-bg);
	}
`;
export const AddSLOrderBtnStyled = styled(AddSLTPOrderButtonStyled).withConfig({ displayName: "AddSLOrderBtnStyled" }) ``;
export const AddTPOrderBtnStyled = styled(AddSLTPOrderButtonStyled).withConfig({ displayName: "AddTPOrderBtnStyled" }) ``;
