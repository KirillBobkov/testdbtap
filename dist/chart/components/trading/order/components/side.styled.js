import styled from 'styled-components';
export const BuyOrderLabelStyled = styled.span.withConfig({ displayName: "BuyOrderLabelStyled" }) `
	color: var(--main_chart-candle-bull-body-bg);
`;
export const SellOrderLabelStyled = styled.span.withConfig({ displayName: "SellOrderLabelStyled" }) `
	margin-left: 0.5px;
	color: var(--main_chart-candle-bear-body-bg);
`;
export const SideStyled = styled.div.withConfig({ displayName: "SideStyled" }) `
	width: 16px;
	box-sizing: border-box;
	padding-left: 4.5px;
	padding-right: 4.5px;
`;
export const PositionLineStyled = styled.hr.attrs(({ x, y, pl, width, disabled }) => ({
    style: {
        top: `${y}px`,
        left: x,
        width: `${width}px`,
        backgroundColor: (pl ?? 0) > 0 ? 'var(--position_positive-wick-bg)' : 'var(--position_negative-wick-bg)',
        opacity: disabled ? 0.4 : 1,
    },
})).withConfig({ displayName: "PositionLineStyled" }) `
	position: absolute;
	height: 1px;
	margin: 0;
	border: none;
`;
export const OrderLineStyled = styled.hr.attrs(({ x, y, width, disabled, selected }) => ({
    style: {
        top: `${y}px`,
        left: x,
        width: `${width}px`,
        backgroundColor: selected ? 'var(--order-wick-hover-bg)' : 'var(--order-wick-default-bg)',
        opacity: disabled ? 0.4 : 1,
    },
})).withConfig({ displayName: "OrderLineStyled" }) `
	position: absolute;
	height: 1px;
	margin: 0;
	border: none;
`;
