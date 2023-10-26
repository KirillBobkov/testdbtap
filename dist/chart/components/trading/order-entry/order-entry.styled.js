import styled from 'styled-components';
export const OrderEntryContainerStyled = styled.div.withConfig({ displayName: "OrderEntryContainerStyled" }) `
	position: absolute;
	${props => props.align}: ${props => props.padding}px;
	top: 0;
	width: auto;
	height: 24px;
	display: flex;
	flex-direction: row-reverse;
	align-items: center;
	font-size: var(--font-size-m);
	line-height: var(--line-height-m-px);
	z-index: 20;
`;
export const OrderEntryBtnContainerStyled = styled.div.withConfig({ displayName: "OrderEntryBtnContainerStyled" }) `
	margin-right: 3px;
	display: ${props => (props.opened ? 'flex' : 'none')};
	align-items: center;
	justify-content: center;
`;
export const OrderEntryAnimatedContainer = styled.div.withConfig({ displayName: "OrderEntryAnimatedContainer" }) `
	${props => props.align}: ${props => props.padding}px;
`;
