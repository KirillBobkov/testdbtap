import styled from "styled-components";
import { OrderContainerInnerStyled } from "./components/order.styled";
export const ProtectionOrderStyled = styled.div.withConfig({ displayName: "ProtectionOrderStyled" }) `
	${OrderContainerInnerStyled} {
		background-color: var(--order-default-bg);
	}
`;
